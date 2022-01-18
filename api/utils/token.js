import jwt from 'jsonwebtoken';

export const createAccessToken = (userId) => jwt.sign(
  { userId },
  process.env.SECRET,
  { algorithm: 'HS256', expiresIn: '12h' },
);

export const verifyAccessToken = (token) => jwt.verify(token, process.env.SECRET);
