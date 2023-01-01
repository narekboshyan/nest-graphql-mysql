import { Sequelize } from 'sequelize-typescript';
import { QueryOptions } from 'sequelize/types/dialects/abstract/query-interface';

import { TMUSequelizeDBConfig } from 'src/database/database.config';
import { User } from 'models/trymyui/user';
export const sequelizeTMU = new Sequelize(TMUSequelizeDBConfig);

sequelizeTMU.addModels([User]);

export const TMUQuery = async (
  sql: string,
  options: QueryOptions = {},
  shouldReturnArray = true,
): Promise<any> => {
  const [data] = await sequelizeTMU.query(sql, {
    type: shouldReturnArray ? 'RAW' : 'SELECT',
    ...options,
  });

  return data;
};
