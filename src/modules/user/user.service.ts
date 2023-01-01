import { Injectable } from '@nestjs/common';
import { User } from 'models/trymyui/user';
import { CreateUserInput } from './input/create-user.input';
import { UpdateUserInput } from './input/update-user.input';

@Injectable()
export class UserService {
  async updateUser(input: UpdateUserInput) {
    try {
      console.log(input);
      // const updatedUser = await User.update(input);
      // console.log(updatedUser);
      // return updatedUser;
    } catch (error) {
      console.log(error, 'Error');
    } finally {
    }
  }
  async createUser(input: CreateUserInput): Promise<User> {
    try {
      const user = User.build({
        ...input,
      });
      await user.save();
      return user;
    } catch (error) {
      console.log(error);
    } finally {
      console.log(`User is created successfully`);
    }
  }
  async getUsers(): Promise<User[]> {
    try {
      const users = await User.findAll();
      return users;
    } catch (error) {
      console.log(error);
    } finally {
      console.log(`Users are fetched successfully`);
    }
  }
  async getUser(id: string): Promise<User> {
    try {
      const user = await User.findByPk(id);
      return user;
    } catch (error) {
    } finally {
      console.log(`User with id ${id} is fetched successfully`);
    }
  }

  async deleteUser(id: string) {
    try {
    } catch (error) {
    } finally {
    }
  }
}
