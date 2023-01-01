import { Global, Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JWT_ACCESS_TOKEN_EXPIRATION_TIME, JWT_ACCESS_TOKEN_SECRET } from 'constants/configs';

@Global()
@Module({
  imports: [
    JwtModule.register({
      secret: JWT_ACCESS_TOKEN_SECRET,
      signOptions: {
        expiresIn: JWT_ACCESS_TOKEN_EXPIRATION_TIME,
      },
    }),
  ],
  providers: [JwtService],
  exports: [JwtService],
})
export class JWTModule {}
