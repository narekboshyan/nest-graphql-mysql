import * as dotenv from 'dotenv';
dotenv.config();

export const local = {
  dialect: 'mysql',
  username: process.env.TMU_DB_USER,
  password: process.env.TMU_DB_PASSWORD,
  database: process.env.TMU_DB_DATABASE,
  host: process.env.TMU_DB_HOST,
  port: process.env.TMU_DB_PORT,
  logging: true,
  dialectOptions: {
    multipleStatements: true,
  },
};
