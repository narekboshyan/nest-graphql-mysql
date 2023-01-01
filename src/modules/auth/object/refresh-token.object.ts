import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TokenObject {
  @Field()
  refreshToken: string;

  @Field()
  accessToken: string;
}
