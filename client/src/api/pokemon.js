import qs from 'query-string';
import axios from './axios';

export default {
  async get(body) {
    const query = qs.stringify(body);
    return axios.get(`./pokemon?${query}`);
  },
  async getById(id) {
    return axios.get(`./pokemon/${id}`);
  }
};
