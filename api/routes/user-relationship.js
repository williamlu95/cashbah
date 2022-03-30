import { Router } from 'express';
import { schemaValidation } from '../middleware/schemaValidation';
import { RELATIONSHIP_TYPE } from '../models/user-relationship';
import { authRequired } from '../middleware/authRequired';

const router = Router();

router.get(
  '/',
  authRequired,
  async ({ db, userId }, res) => {
    const userRelationships = await db.userRelationship.findAll({
      where: {
        relatedFromUserId: userId,
      },
      include: {
        model: db.user,
        as: 'relatedTo',
      },
    });

    res.status(200).send(userRelationships.map(({ type, relatedTo }) => ({
      type,
      id: relatedTo.id,
      name: relatedTo.name,
    })));
  },
);

router.post(
  '/',
  authRequired,
  schemaValidation({
    type: {
      in: ['body'],
      isString: true,
      isIn: {
        options: [Object.values(RELATIONSHIP_TYPE)],
      },
      errorMessage: 'Invalid Type',
    },
    relatedToUserId: {
      in: ['body'],
      isString: true,
      errorMessage: 'Invalid User To',
    },
  }),
  async ({ db, matchedData, userId }, res) => {
    const userRelationship = await db.userRelationship.create({
      ...matchedData,
      relatedFromUserId: userId,
    });

    res.status(201).send(userRelationship.id);
  },
);

router.put(
  '/:userRelationshipId',
  authRequired,
  schemaValidation({
    type: {
      in: ['body'],
      isString: true,
      isIn: {
        options: [Object.values(RELATIONSHIP_TYPE)],
      },
      errorMessage: 'Invalid Type',
    },
  }),
  async ({ db, params, matchedData }, res) => {
    const { userRelationshipId } = params;
    const userRelationship = await db.userRelationship.update(
      matchedData,
      { where: { id: userRelationshipId } },
    );

    res.status(200).send(userRelationship.id);
  },
);

router.delete(
  '/:userRelationshipId',
  authRequired,
  async ({ db, params }, res) => {
    const { userRelationshipId } = params;
    await db.userRelationship.destroy({ where: { id: userRelationshipId } });
    res.status(200);
  },
);

export default router;
