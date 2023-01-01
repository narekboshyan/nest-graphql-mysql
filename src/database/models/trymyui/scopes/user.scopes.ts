import { ScopesOptionsGetter } from 'sequelize-typescript/dist/scopes/scope-options';

export const UserScopes: ScopesOptionsGetter = () => ({
  forToken: {
    attributes: ['role', 'id', 'password'],
  },
});

export const ForToken = ['forToken'];
