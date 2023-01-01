import { ModelHooks } from 'sequelize/types/hooks';
import { Attributes } from 'sequelize/types/model';
import { v4 as uuid } from 'uuid';
import * as bcrypt from 'bcrypt';

import { UserKindEnum } from 'enums/user.enums';
import { User } from 'models/trymyui/user';

export const beforeCreateUser = async (user) => {
  user.password = await bcrypt.hash(user.password, 10);
  user.uuid = uuid();
  user.registrationDate = new Date();
  user.kind = UserKindEnum.normal;
};

const UserHooks: Partial<ModelHooks<User, Attributes<User>>> = {
  beforeCreate: async (user) => {
    await beforeCreateUser(user);
  },
};

export default UserHooks;
