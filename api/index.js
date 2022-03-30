import 'dotenv/config';
import express from 'express';
import userRoutes from './routes/user';
import userRelationshipRoutes from './routes/user-relationship';

import authRoutes from './routes/auth';
import healthCheckRoutes from './routes/healthcheck';
import db from './models';

const app = express();

const middleware = (req, _, next) => {
  req.db = db;
  next();
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(middleware);
app.use('/', authRoutes);
app.use('/users', userRoutes);
app.use('/user-relationships', userRelationshipRoutes);
app.use('/healthcheck', healthCheckRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}.`);
});

export default app;
