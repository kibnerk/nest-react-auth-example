import { apiClientAuth } from './index';

export const getMe = async () => {
  const { data } = await apiClientAuth.get('/auth/me');
  return data;
};
