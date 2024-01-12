import axios from 'axios';

const productionUrl = ' https://patient-tracker-api.onrender.com/api';

export const customFetch = axios.create({
  baseURL: productionUrl,
});

export const customFetchNoToken = axios.create({
  baseURL: productionUrl,
});

// Request interceptor to add the auth token to every request
customFetch.interceptors.request.use(
  (config) => {
    const token = JSON.parse(localStorage.getItem('user')).token;
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);