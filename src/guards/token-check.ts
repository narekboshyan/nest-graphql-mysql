import { JwtService } from '@nestjs/jwt';
import {
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';

import { User } from 'models/trymyui/user';
import { handleServerError } from 'utils/helpers';
import { TokenExpiredError } from 'jsonwebtoken';
import { JWT_ACCESS_TOKEN_SECRET } from 'constants/configs';
import { UserRoleEnum } from 'enums/user.enums';

export const tokenCheck = async (
  req,
  jwtService: JwtService,
  token: string,
): Promise<boolean> => {
  if (token) {
    try {
      const payload = await jwtService.verifyAsync(token, {
        secret: JWT_ACCESS_TOKEN_SECRET,
      });

      const { userId, key, role } = payload || {};
      if (!userId) {
        throw new UnauthorizedException('Unauthorized');
      }
      // const user = await User.findByPk(userId);
      // if (!user || user.role !== role) {
      //   //|| user.password !== key
      //   throw new UnauthorizedException('Unauthorized');
      // }

      // user.lastActiveOn = new Date();
      // user.save().catch(handleServerError);
      // req.user = user;

      return true;
    } catch (e) {
      if (e instanceof TokenExpiredError) {
        throw new UnprocessableEntityException('Access token expired');
      } else {
        throw new UnprocessableEntityException('Access token malformed');
      }
    }
  } else {
    throw new UnauthorizedException('Unauthorized');
  }
};
