import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { formatError } from 'utils/graphql-format-error';
import { DatabaseModule } from './database/database.module';
import { UserModule } from 'modules/user/user.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      include: [],
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: true,
      path: '/graphql',
      formatError: formatError,
      buildSchemaOptions: {
        numberScalarMode: 'integer',
      },
      introspection: true,
    }),
    DatabaseModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
