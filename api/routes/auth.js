import { Router } from 'express';
import { compare } from 'bcrypt';
import { schemaValidation } from '../middleware/schemaValidation';
import { createAccessToken } from '../utils/token';

const router = Router();

router.post(
  '/login',
  schemaValidation({
    email: {
      in: ['body'],
      isString: true,
      isEmail: true,
      errorMessage: 'Invalid Email',
    },
    password: {
      in: ['body'],
      isString: true,
      errorMessage: 'Invalid Password',
    },
  }),
  async ({ db, matchedData: { email, password } }, res) => {
    const user = await db.user.findOne({ where: { email } });

    if (!user) {
      res.sendStatus(404);
      return;
    }

    const isValidPassword = await compare(password, user.password);

    if (!isValidPassword) {
      res.sendStatus(400);
      return;
    }

    const accessToken = createAccessToken(user.id);
    res.status(201).send(accessToken);
  },
);

export default router;
