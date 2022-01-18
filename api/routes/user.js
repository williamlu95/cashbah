import { Router } from 'express';
import { hash } from 'bcrypt';
import { schemaValidation } from '../middleware/schemaValidation';
import { createAccessToken } from '../utils/token';

const router = Router();

router.post(
  '/',
  schemaValidation({
    name: {
      in: ['body'],
      isString: true,
      errorMessage: 'Invalid Name',
    },
    phoneNumber: {
      in: ['body'],
      isString: true,
      errorMessage: 'Invalid Phone Number',
    },
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
  async ({ db: { user }, matchedData }, res) => {
    const userExists = await user.findOne({ where: { email: matchedData.email } });

    if (userExists) {
      res.sendStatus(409);
      return;
    }

    const createdUser = await user.create({
      ...matchedData,
      password: await hash(matchedData.password, 10),
    });

    const accessToken = createAccessToken(createdUser.id);
    res.status(201).send(accessToken);
  },
);

export default router;
