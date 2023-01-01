import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from 'models/trymyui/user';
import { GqlAuthUser } from 'decorators/gql-auth-user.decorator';
import { UpdateUserInput } from './input/update-user.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'guards/gql-auth.guard';
import { UserService } from './user.service';
import { CreateUserInput } from './input/create-user.input';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  createUser(@Args('input') input: CreateUserInput): Promise<User> {
    return this.userService.createUser(input);
  }

  @Query(() => [User])
  getUsers(): Promise<User[]> {
    return this.userService.getUsers();
  }

  @Query(() => User)
  getUser(@Args('id') id: string) {
    return this.userService.getUser(id);
  }

  @Query(() => User)
  deleteUser(@Args('id') id: string) {
    return this.userService.deleteUser(id);
  }

  @Mutation(() => User)
  updateUser(@Args('input') input: UpdateUserInput) {
    return this.userService.updateUser(input);
  }

  @Query(() => User)
  @UseGuards(GqlAuthGuard)
  getMe(@GqlAuthUser() user) {
    return user;
  }
}
