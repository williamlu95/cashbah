import { Router } from 'express';

const router = Router();

router.get(
  '/',
  async (_res, res) => {
    res.sendStatus(200);
  },
);

export default router;
