import { Schema, model } from 'mongoose';

const Pokemon = new Schema({
  name: {
    type: String
  },
  image: {
    type: String
  },
  description: {
    type: String
  },
  category: {
    type: String
  },
  abilities: [{
    type: String
  }],
  height: {
    type: Number
  },
  weight: {
    type: Number
  },
  hp: {
    type: Number
  },
  speed: {
    type: Number
  },
  attack: {
    type: Number
  },
  defense: {
    type: Number
  }
});

export default model('pokemon', Pokemon);
