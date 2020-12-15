import axios from './axios';

export default {

  async get() {
    return axios.get('./favorite');
  },
  async add(data) {
    return axios.put(`./favorite/${data.pokemonId}`);
  },
  async delete(data) {
    return axios.delete(`./favorite/${data.pokemonId}`);
  }
};
