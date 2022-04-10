import { Router } from 'express';
import { schemaValidation } from '../middleware/schemaValidation';
import { RELATIONSHIP_TYPE } from '../models/user-relationship';
import { authRequired } from '../middleware/authRequired';

const router = Router();

router.get(
  '/',
  authRequired,
  async ({ db, userId }, res) => {
    const userRelationships = await db.UserRelationship.findAll({
      where: {
        relatedFromUserId: userId,
      },
      include: {
        model: db.User,
        as: 'relatedTo',
        order: [['name']],
      },
    });

    res.status(200).send(userRelationships.map(({ type, relatedTo }) => ({
      type,
      id: relatedTo.id,
      name: relatedTo.name,
    })));
  },
);

router.get(
  '/pending-requests',
  authRequired,
  async ({ db, userId }, res) => {
    const pendingRequests = await db.UserRelationship.findAll({
      where: {
        relatedToUserId: userId,
        type: RELATIONSHIP_TYPE.PENDING,
      },
      include: {
        model: db.User,
        as: 'relatedFrom',
        order: [['name']],
      },
    });

    res.status(200).send(pendingRequests.map(({ id, type, relatedFrom }) => ({
      id,
      type,
      name: relatedFrom.name,
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
    const userRelationship = await db.UserRelationship.create({
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
    const userRelationship = await db.UserRelationship.update(
      matchedData,
      { where: { id: userRelationshipId } },
    );

    res.status(200).send(userRelationship.id);
  },
);

router.post(
  '/:userRelationshipId/accept-request',
  authRequired,
  async ({ db, params }, res) => {
    const { userRelationshipId } = params;
    const userRelationship = await db.UserRelationship.findOne(
      { where: { id: userRelationshipId } },
    );

    await db.sequelize.transaction(async (transaction) => {
      await db.UserRelationship.update(
        { type: RELATIONSHIP_TYPE.ACTIVE },
        { where: { id: userRelationshipId }, transaction },
      );

      await db.UserRelationship.bulkCreate(
        [{
          relatedFromUserId: userRelationship.relatedToUserId,
          relatedToUserId: userRelationship.relatedFromUserId,
          type: RELATIONSHIP_TYPE.ACTIVE,
        }],
        {
          transaction,
          updateOnDuplicate: ['type'],
        },
      );
    });

    res.status(200).send(userRelationship.id);
  },
);

router.delete(
  '/:userRelationshipId',
  authRequired,
  async ({ db, params }, res) => {
    const { userRelationshipId } = params;
    await db.UserRelationship.destroy({ where: { id: userRelationshipId } });
    res.sendStatus(204);
  },
);

export default router;
