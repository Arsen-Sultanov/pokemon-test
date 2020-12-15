import axios from 'axios';
import store from 'store';


const axiosInstance = axios.create({
  baseURL: '/api/v1',
  headers: {
    'Content-Type': 'application/json'
  }
});

axiosInstance.interceptors.response.use(function(response) {
  // Do something with response data
  return response;
}, (error) => {
  console.dir(error);

  if (error.response.status === 401) {
    store.setAuth(false);
    store.setUser();
  }
  if (error.response.status === 500) {
    window.location = '/500';
  }
  return Promise.reject(error);
});

export default axiosInstance;
