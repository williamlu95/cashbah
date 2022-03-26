import { Router } from 'express';
import { hash } from 'bcrypt';
import { Op } from 'sequelize';
import { schemaValidation } from '../middleware/schemaValidation';
import { authRequired } from '../middleware/authRequired';
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
      isInt: true,
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
      isLength: {
        errorMessage: 'Password should be at least 8 characters long',
        options: { min: 8 },
      },
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

router.get(
  '/',
  authRequired,
  schemaValidation({
    search: {
      in: ['query'],
      isString: true,
      errorMessage: 'Invalid Search',
      optional: { options: { nullable: true } },
    },
  }),
  async ({ db: { user }, matchedData }, res) => {
    const where = matchedData.search ? {
      [Op.or]: [
        {
          email: {
            [Op.like]: `%${matchedData.search}%`,
          },
        },
        {
          name: {
            [Op.like]: `%${matchedData.search}%`,
          },
        },
      ],
    } : {};

    const users = await user.findAll({
      attributes: ['id', 'name'],
      where,
      order: [['name']],
    });

    res.status(200).send(users.map(({ id, name }) => ({
      id,
      name,
      isRequested: false,
    })));
  },
);

export default router;
