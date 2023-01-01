import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Model, Scopes, Table } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

import { UserScopes } from 'models/trymyui/scopes/user.scopes';
import UserHooks from 'models/trymyui/hooks/user.hooks';

@ObjectType()
@Table({
  tableName: 'users',
  timestamps: true,
  hooks: UserHooks,
})
@Scopes(UserScopes)
export class User extends Model<User> {
  @Field()
  @Column({
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({ type: DataTypes.STRING, allowNull: false })
  password: string;

  @Field()
  @Column({ type: DataTypes.STRING, allowNull: false })
  email: string;

  @Field()
  @Column({ type: DataTypes.STRING, allowNull: false })
  firstName: string;

  @Field()
  @Column({ type: DataTypes.STRING, allowNull: false })
  lastName: string;

  @Field()
  @Column({ type: DataTypes.DATE, allowNull: false })
  createdAt: Date;

  @Field()
  @Column({ type: DataTypes.DATE, allowNull: false })
  updatedAt: Date;
}
