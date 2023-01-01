import { Field, ObjectType } from '@nestjs/graphql';

import { TokenObject } from 'modules/auth/object/refresh-token.object';
import { User } from 'models/trymyui/user';

@ObjectType()
export class UserWithTokenObject extends TokenObject {
  @Field(() => User)
  user: User;
}
