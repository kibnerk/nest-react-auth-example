import { apiClientAuth } from './index';

export const getMe = async () => {
  const { data } = await apiClientAuth.get('/me');
  return data;
};
