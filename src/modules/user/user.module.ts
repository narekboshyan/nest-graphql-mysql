import { Module } from '@nestjs/common';

import { UserService } from 'modules/user/user.service';
import { AuthModule } from 'modules/auth/auth.module';
import { AuthService } from 'modules/auth/auth.service';
import { UserResolver } from 'modules/user/user.resolver';
import { RequestModule } from 'shared/requeset/request.module';
import { RequestService } from 'shared/requeset/request.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [AuthModule, RequestModule, HttpModule],
  providers: [UserService, AuthService, UserResolver, RequestService],
  exports: [UserService, AuthService, RequestService],
})
export class UserModule {}
