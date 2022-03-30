import { Sequelize } from 'sequelize';

const {
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
} = process.env;

const dbName = process.env.NODE_ENV === 'test' ? 'testing' : DB_NAME;

export default new Sequelize(
  dbName,
  DB_USER,
  DB_PASSWORD,
  {
    host: DB_HOST,
    dialect: 'mysql',
  },
);
