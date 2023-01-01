import { Field, InputType } from '@nestjs/graphql';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field({ nullable: false })
  @IsNotEmpty()
  @IsOptional()
  firstName?: string;

  @Field({ nullable: false })
  @IsNotEmpty()
  @IsOptional()
  lastName?: string;

  @Field({ nullable: false })
  @IsEmail()
  @IsOptional()
  email?: string;

  @Field({ nullable: false })
  @IsString()
  @MinLength(5)
  @IsOptional()
  password?: string;
}
