import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from 'models/trymyui/user';

export const AuthUser = createParamDecorator((data: unknown, ctx: ExecutionContext): User => {
  const request = ctx.switchToHttp().getRequest();
  return request.user;
});
