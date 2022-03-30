import { verifyAccessToken } from '../utils/token';

export const authRequired = async (req, res, next) => {
  const { authorization } = req.headers;
  const accessToken = authorization && authorization.split(' ')[1];

  try {
    const { userId } = verifyAccessToken(accessToken);
    req.userId = userId;
  } catch (err) {
    console.error(err);
    res.sendStatus(403);
    return;
  }

  next();
};
