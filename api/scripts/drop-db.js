import 'dotenv/config';
import mysql from 'mysql2/promise';

const {
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
} = process.env;

// eslint-disable-next-line func-names
(async function () {
  const dbName = process.env.NODE_ENV === 'test' ? 'testing' : DB_NAME;

  const connection = await mysql.createConnection({
    host: DB_HOST, port: 3306, user: DB_USER, password: DB_PASSWORD,
  });

  await connection.query(`DROP DATABASE IF EXISTS \`${dbName}\`;`);
  console.log('database', dbName, 'dropped');
  process.exit(0);
}());
