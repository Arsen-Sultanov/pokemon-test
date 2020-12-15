import axios from './axios';

export default {
  async create(data) {
    return axios.post('./sign', data);
  },
  async delete(data) {
    return axios.delete('./sign', data);
  }
};
