import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { AuthService } from 'modules/auth/auth.service';
import { JWTModule } from 'shared/jwt/jwt.module';
import { AuthResolver } from 'modules/auth/auth.resolver';

@Module({
  imports: [JWTModule],
  providers: [AuthService, JwtService, AuthResolver],
  exports: [JwtService, AuthService, AuthResolver],
})
export class AuthModule {}
