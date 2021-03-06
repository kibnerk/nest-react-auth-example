import axios from 'axios';
import { postRefreshToken } from './auth';

const MIN_DIFF_TOKEN_TIME = 60;

const apiConfig = {
  baseURL: process.env.API_HOST,
  timeout: 30000,
};

export const apiClient = axios.create(apiConfig);
export const apiClientAuth = axios.create(apiConfig);

export const removeAuthStorage = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expiresIn');
  localStorage.removeItem('refreshToken');
};

const checkRequest = (() => {
  let refreshRequest = null;

  return async request => {
    const expiresIn = +(localStorage.getItem('expiresIn') || '');
    const refresh = localStorage.getItem('refreshToken');
    const timeNow = Math.round(new Date().getTime() / 1000);

    if (expiresIn < timeNow - MIN_DIFF_TOKEN_TIME) {
      if (!refreshRequest) {
        refreshRequest = postRefreshToken(refresh);
      }

      const { token, refreshToken, expiresIn } = await refreshRequest;

      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('expiresIn', expiresIn);

      refreshRequest = null;
    }

    return {
      ...request,
      headers: {
        ...request?.headers,
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    };
  };
})();

apiClientAuth.interceptors.request.use(request => checkRequest(request));

apiClientAuth.interceptors.response.use(
  res => res,
  error => {
    if (error.response.status === 401) {
      removeAuthStorage();
      window.location.replace('/auth');
    } else {
      return Promise.reject(error);
    }
  },
);
