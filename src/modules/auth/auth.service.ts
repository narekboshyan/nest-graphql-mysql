import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { TokenExpiredError } from 'jsonwebtoken';

import { RequestService } from 'shared/requeset/request.service';
import {
  JWT_ACCESS_TOKEN_EXPIRATION_TIME,
  JWT_ACCESS_TOKEN_SECRET,
  JWT_BASE_OPTIONS,
  JWT_REFRESH_TOKEN_EXPIRATION_TIME,
  JWT_REFRESH_TOKEN_SECRET,
} from 'constants/configs';
import { User } from 'models/trymyui/user';
import { LoginInput } from 'modules/auth/input/login.input';
import { ForToken } from 'models/trymyui/scopes/user.scopes';
import { UserWithTokenObject } from 'modules/user/object/user-with-token.objects';
import { TokenObject } from 'modules/auth/object/refresh-token.object';
import { UserStatusEnum } from 'enums/user.enums';

export interface RefreshTokenPayload {
  key: string;
  userId: number;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly requestService: RequestService,
  ) {}

  async login(loginAuth: LoginInput): Promise<UserWithTokenObject> {
    const { email, password } = loginAuth;

    const user = await User.findOne({
      where: { email },
    });

    if (!user || !(await compare(password, user.password))) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const { refreshToken, accessToken } = await this.generateTokens(user.id);
    return {
      user,
      refreshToken,
      accessToken,
    };
  }

  async refreshToken(refreshToken): Promise<TokenObject> {
    const { userId, accessToken } =
      await this.createAccessTokenFromRefreshToken(refreshToken);
    const user = await User.scope(ForToken).findByPk(userId);
    if (!user) {
      throw new NotFoundException('User not found!');
    }
    const newRefreshToken = await this.generateRefreshToken(user);

    return { accessToken, refreshToken: newRefreshToken };
  }

  async generateAccessToken(user: User): Promise<string> {
    if (!user) {
      throw new InternalServerErrorException(
        'User not found while generating token',
      );
    }

    const opts: any = {
      ...JWT_BASE_OPTIONS,
      secret: JWT_ACCESS_TOKEN_SECRET,
      expiresIn: JWT_ACCESS_TOKEN_EXPIRATION_TIME,
    };
    const payload = { userId: user.id, key: user.password };

    return this.jwtService.signAsync(payload, opts);
  }

  async generateRefreshToken(user: User, rememberMe = false): Promise<string> {
    if (!user) {
      throw new InternalServerErrorException(
        'User not found while generating token',
      );
    }

    const opts = {
      ...JWT_BASE_OPTIONS,
      secret: JWT_REFRESH_TOKEN_SECRET,
      expiresIn: rememberMe ? '365d' : JWT_REFRESH_TOKEN_EXPIRATION_TIME,
    };
    const payload = { userId: user.id, key: user.password };

    return this.jwtService.signAsync(payload, opts);
  }

  async generateResetPasswordToken(user: User): Promise<string> {
    const opts = {
      ...JWT_BASE_OPTIONS,
      secret: JWT_ACCESS_TOKEN_SECRET,
      expiresIn: '10m',
    };
    const payload = { userId: user.id, key: user.password };

    return this.jwtService.signAsync(payload, opts);
  }

  async decodeResetPasswordToken(
    token,
  ): Promise<{ userId: number; key: string } | Record<string, never>> {
    const payload = await this.jwtService.verifyAsync(token, {
      secret: JWT_ACCESS_TOKEN_SECRET,
    });

    return payload || {};
  }

  async decodeRefreshToken(token: string): Promise<RefreshTokenPayload> {
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: JWT_REFRESH_TOKEN_SECRET,
      });

      return payload || {};
    } catch (e) {
      if (e instanceof TokenExpiredError) {
        throw new UnprocessableEntityException('Refresh token expired');
      } else {
        throw new UnprocessableEntityException('Refresh token malformed');
      }
    }
  }

  async resolveRefreshToken(encoded: string): Promise<number> {
    const payload = await this.decodeRefreshToken(encoded);
    const { userId, key } = payload;
    const user = await User.findByPk(userId, { attributes: ['password'] });

    if (!userId) {
      throw new UnprocessableEntityException('Refresh token malformed');
    }
    if (user.password !== key) {
      throw new UnauthorizedException('Unauthorized');
    }

    return userId;
  }

  async createAccessTokenFromRefreshToken(
    refresh: string,
  ): Promise<{ accessToken: string; userId: number }> {
    if (!refresh) {
      throw new UnauthorizedException();
    }
    const userId = await this.resolveRefreshToken(refresh);
    const user = await User.scope(ForToken).findByPk(userId);
    const accessToken = await this.generateAccessToken(user);

    return { userId, accessToken };
  }

  async generateTokens(
    userId: number,
    rememberMe = false,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const transaction = this.requestService.getTransaction();
    const user = await User.scope(ForToken).findByPk(userId, { transaction });
    const [accessToken, refreshToken] = await Promise.all([
      this.generateAccessToken(user),
      this.generateRefreshToken(user, rememberMe),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }
}
