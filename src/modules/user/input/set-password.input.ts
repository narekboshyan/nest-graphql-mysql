import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class SetPasswordInput {
  @Field()
  @IsNotEmpty()
  password: string;

  @Field()
  @IsNotEmpty()
  code: string;
}
