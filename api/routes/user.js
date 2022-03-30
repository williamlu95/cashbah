import { Router } from 'express';
import { hash } from 'bcrypt';
import { Op } from 'sequelize';
import { schemaValidation } from '../middleware/schemaValidation';
import { authRequired } from '../middleware/authRequired';
import { createAccessToken } from '../utils/token';
import { RELATIONSHIP_TYPE } from '../models/user-relationship';

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
  async ({ db, matchedData, userId }, res) => {
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

    const [users, userRelationships] = await Promise.all([
      db.user.findAll({
        attributes: ['id', 'name'],
        where: {
          ...where,
          [Op.not]: {
            id: userId,
          },
        },
        order: [['name']],
      }),
      db.userRelationship.findAll({
        where: {
          relatedFromUserId: userId,
        },
      }),
    ]);

    const excludedRelationsSet = new Set();
    const pendingRelationsSet = new Set();

    userRelationships.forEach((relationship) => {
      if (relationship.type === RELATIONSHIP_TYPE.PENDING) {
        pendingRelationsSet.add(relationship.relatedToUserId);
        return;
      }

      excludedRelationsSet.add(relationship.relatedToUserId);
    });

    const filteredUsers = users.filter(({ id }) => !excludedRelationsSet.has(id));

    res.status(200).send(filteredUsers.map(({ id, name }) => ({
      id,
      name,
      isRequested: pendingRelationsSet.has(id),
    })));
  },
);

export default router;
