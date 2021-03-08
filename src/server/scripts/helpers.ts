import { verify } from 'jsonwebtoken';

export const verifyToken = (token: string) => {
  const checkToken = token && token.split(' ')[1];

  return verify(checkToken, process.env.AUTH_SECRET, (err, decoded) => {
    return decoded || { error: err };
  });
};
