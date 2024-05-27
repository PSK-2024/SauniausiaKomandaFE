import axios from 'axios';
import authService from './authService';
import { BASE_URL } from './paths';

const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('apiToken');
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token;
    }
    config.headers['Content-Type'] = 'application/json';
    return config;
  },
  error => {
    authService.logout();
    window.location.href = '/login';
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  response => {
    return response;
  },
  function (error) {
    if (error.response.status === 401) {
      authService.logout();
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

export default api;
