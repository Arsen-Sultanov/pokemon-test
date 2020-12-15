import path from 'path';
import multer, { diskStorage } from 'multer';

import { Pokemon } from 'models';
import { pokemon as pokemonValidation } from 'validation';

const imagesDirPath = path.resolve('build/images');

const storage = diskStorage({
  destination(req, file, cb) {
    cb(null, imagesDirPath);
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}.${req.body.fileType}`);
  }
});

const multerInstance = multer({
  storage,
  fileFilter: async (req, file, cb) => {
    try {
      const validResult = pokemonValidation.validate(JSON.parse(req.body.data));

      if (validResult.error !== undefined) {
        const error = new Error('One or more fields are wrong.');
        error.isMulter = true;
        return cb(error);
      }

      const pokemon = await Pokemon.findOne({ name: validResult.value.name });

      if (pokemon !== null) {
        const error = new Error('An entry with the same name already exists.');
        error.isMulter = true;
        return cb(error);
      }

      cb(null, true);
    } catch (error) {
      return cb(error);
    }
  }
}).fields([
  { name: 'data', maxCount: 1 },
  { name: 'fileType', maxCount: 1 },
  { name: 'image', maxCount: 1 }
]);

const uploadFormData = (req, res) => {
  return new Promise((resolve, reject) => {
    multerInstance(req, res, err => {
      if (err) {
        return reject(err);
      }
      return resolve(req);
    });
  });
};


export const get = async (req, res, next) => {
  try {
    const skip = parseInt(req.query.skip) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const sortField = req.query.sortfield || 'createdOn';
    const sortDir = req.query.sortdir === 'desc' ? -1 : 1;

    const $and = [];

    req.query.name !== undefined && $and.push({ name: req.query.name });
    req.query.category !== undefined && $and.push({ category: req.query.category });
    req.query.abilities !== undefined && $and.push({ abilities: req.query.abilities });

    const heightQuery = {};
    !isNaN(+req.query.heightFrom) && (heightQuery.$gt = +req.query.heightFrom);
    !isNaN(+req.query.heightTo) && (heightQuery.$lt = +req.query.heightTo);
    (req.query.heightFrom || req.query.heightTo) && ($and.push({ height: heightQuery }));

    const weightQuery = {};
    !isNaN(+req.query.weightFrom) && (weightQuery.$gt = +req.query.weightFrom);
    !isNaN(+req.query.weightTo) && (weightQuery.$lt = +req.query.weightTo);
    (req.query.weightFrom || req.query.weightTo) && ($and.push({ weight: weightQuery }));

    const hpQuery = {};
    !isNaN(+req.query.hpFrom) && (hpQuery.$gt = +req.query.hpFrom);
    !isNaN(+req.query.hpTo) && (hpQuery.$lt = +req.query.hpTo);
    (req.query.hpFrom || req.query.hpTo) && ($and.push({ hp: hpQuery }));

    const attackQuery = {};
    !isNaN(+req.query.attackFrom) && (attackQuery.$gt = +req.query.attackFrom);
    !isNaN(+req.query.attackTo) && (attackQuery.$lt = +req.query.attackTo);
    (req.query.attackFrom || req.query.attackTo) && ($and.push({ attack: attackQuery }));

    const defenseQuery = {};
    !isNaN(+req.query.defenseFrom) && (defenseQuery.$gt = +req.query.defenseFrom);
    !isNaN(+req.query.defenseTo) && (defenseQuery.$lt = +req.query.defenseTo);
    (req.query.defenseFrom || req.query.defenseTo) && ($and.push({ attack: defenseQuery }));

    const speedQuery = {};
    !isNaN(+req.query.speedFrom) && (speedQuery.$gt = +req.query.speedFrom);
    !isNaN(+req.query.speedTo) && (speedQuery.$lt = +req.query.speedTo);
    (req.query.speedFrom || req.query.speedTo) && ($and.push({ speed: speedQuery }));

    const $match = {};
    $and.length > 0 && ($match.$and = $and);

    const page = [
      { $match },
      { $skip: skip },
      { $limit: limit },
      {
        $sort: {
          [sortField]: sortDir
        }
      }
    ];

    const count = [
      { $match },
      { $count: 'count' }
    ];

    const query = [
      { $facet: { page, count } }
    ];

    const queryResult = await Pokemon.aggregate(query);

    const response = {};
    queryResult[0].page && (response.page = queryResult[0].page);
    queryResult[0].count[0] && (response.totalItemsCount = queryResult[0].count[0].count);

    res.status(200).send(response);
  } catch (error) {
    next(error);
  }
};

export const add = async (req, res, next) => {
  try {
    const { body, files } = await uploadFormData(req, res);
    const data = {
      ...JSON.parse(body.data),
      image: files.image[0].filename
    };

    const pokemon = new Pokemon(data);
    await pokemon.save();

    return res.status(200).send(pokemon);
  } catch (error) {
    if (error.isMulter) {
      return res.status(400).send({ error: error.message });
    }
    next(error);
  }
};

export const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (id === undefined) {
      return res.status(400).send({ error: 'id is not defined' });
    }
    const pokemon = await Pokemon.findById(id);
    return res.status(200).send(pokemon);
  } catch (error) {
    next(error);
  }
};

export const updateById = async (req, res, next) => {
  try {
    const body = req.body;
    const _id = req.query.id;
    await pokemonValidation.validateAsync(body);

    const pokemon = await Pokemon.findByIdAndUpdate({ _id }, body);

    return res.status(200).send(pokemon);
  } catch (error) {
    if (error.isJoi) {
      return res.status(400).send(error);
    }
    next(error);
  }
};

export const deleteById = async (req, res, next) => {
  try {
    const id = req.query.id;
    if (id === undefined) {
      return res.status(400).send({ error: 'id is not defined' });
    }
    const pokemon = await Pokemon.findByIdAndDelete(id);
    return res.status(200).send(pokemon);
  } catch (error) {
    next(error);
  }
};
