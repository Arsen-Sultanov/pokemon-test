
import path from 'path';
import multer, { diskStorage } from 'multer';
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
  fileFilter(req, file, cb) {
    const validResult = pokemonValidation.validate(JSON.parse(req.body.data));
    if (validResult.error !== undefined) {
      const error = new Error('One or more fields are wrong.');
      error.isMulter = true;
      return cb(error);
    }
    cb(null, true);
  }
})
  . fields([
    { name: 'data', maxCount: 1 },
    { name: 'fileType', maxCount: 1 },
    { name: 'image', maxCount: 1 }
  ]);

export const uploadFormData = (req, res) => {
  return new Promise((resolve, reject) => {
    multerInstance(req, res, err => {
      if (err) {
        return reject(err);
      }
      return resolve(req);
    });
  });
};
