import { SequelizeOptions } from 'sequelize-typescript/dist/sequelize/sequelize/sequelize-options';
import {
  TMU_DB_DATABASE,
  TMU_DB_HOST,
  TMU_DB_PASSWORD,
  TMU_DB_PORT,
  TMU_DB_USER,
} from 'constants/configs';

export const TMUSequelizeDBConfig: SequelizeOptions = {
  dialect: 'mysql',
  dialectOptions: { supportBigNumbers: true, decimalNumbers: true },
  username: TMU_DB_USER,
  password: TMU_DB_PASSWORD,
  database: TMU_DB_DATABASE,
  host: TMU_DB_HOST,
  port: TMU_DB_PORT,
  define: { timestamps: false },
};
