import axios from 'axios';
import { AppError } from '@utils/AppError';

const api = axios.create({
  baseURL: 'http://192.168.3.36:3333',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});

const interceptorRequest = api.interceptors.request.use((config) => {
  console.log(config);
  return config;
}, error => {
  console.log(error);
  return Promise.reject(error);
});

const interceptorResponse = api.interceptors.response.use(response => response, (error) => {
  if(error.response && error.response.data){
    return Promise.reject(new AppError(error.response.data.message));
  } else {
    return Promise.reject(error);
  }
});

export { api, interceptorRequest, interceptorResponse };