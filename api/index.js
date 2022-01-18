import 'dotenv/config';
import express from 'express';
import userRoutes from './routes/user';
import db from './models';

const app = express();

const middleware = (req, _, next) => {
  req.db = db;
  next();
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(middleware);
app.use('/users', userRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}.`);
});

export default app;
