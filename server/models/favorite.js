import { Schema, model, Types } from 'mongoose';

const Favorite = new Schema({
  userId: {
    type: Types.ObjectId
  },
  pokemonId: {
    type: Types.ObjectId
  }
});

export default model('favorite', Favorite);
