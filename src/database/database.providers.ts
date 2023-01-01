import { sequelizeTMU } from 'models/trymyui/connection';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE_TMU',
    name: 'TMUConnection',
    useFactory: async () => {
      await sequelizeTMU.authenticate();
      return sequelizeTMU;
    },
  },
];
