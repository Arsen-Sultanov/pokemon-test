// import { Favorite } from 'models';
import { Types } from 'mongoose';
import { Favorite } from '../models';

export const add = async (req, res, next) => {
  try {
    const userId = req.session.passport.user;
    const pokemonId = req.params.id;
    const favorite = new Favorite({ userId, pokemonId });
    await favorite.save();
    res.status(200).send(favorite);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const get = async (req, res, next) => {
  try {
    const userId = req.session.passport.user;
    const favorites = await Favorite.aggregate([
      {
        $match: {
          userId: new Types.ObjectId(userId)
        }
      }, {
        $lookup: {
          from: 'pokemons',
          localField: 'pokemonId',
          foreignField: '_id',
          as: 'pokemon'
        }
      }
    ]);
    res.status(200).send(favorites);
  } catch (error) {
    next(error);
  }
};

export const deleteFavorite = async (req, res, next) => {
  try {
    const _id = req.params.id;
    await Favorite.findByIdAndDelete(_id);
    res.status(200).send({ success: true });
  } catch (error) {
    next(error);
  }
};
