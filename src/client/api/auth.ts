import { apiClient } from './index';

export const postRegistration = async (
  name: string,
  password: string,
  avatar: string,
) => {
  const { data } = await apiClient.post('/create', {
    name,
    password,
    avatar,
  });
  return data;
};

export const getToken = async (name: string, password: string) => {
  const { data } = await apiClient.post('/auth/login', {
    name,
    password,
  });
  return data;
};

export const postRefreshToken = async (refresh: string) => {
  const { data } = await apiClient.post('/auth/refresh', {
    refresh,
  });
  return data;
};
