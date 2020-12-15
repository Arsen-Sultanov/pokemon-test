import joi from 'joi';

export default joi.object({
  name: joi.string().empty(),
  description: joi.string().empty(),
  height: joi.number().min(0).max(400),
  weight: joi.number().min(0).max(400),
  category: joi.string().empty(),
  abilities: joi.array().items(joi.string()).min(1).max(10).unique(),

  hp: joi.number().min(0).max(100),
  speed: joi.number().min(0).max(100),
  attack: joi.number().min(0).max(100),
  defense: joi.number().min(0).max(100)
});
