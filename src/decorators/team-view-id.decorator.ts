import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { GqlExecutionContext } from '@nestjs/graphql';

export const TeamViewId = createParamDecorator(
  (data: unknown, context: ExecutionContext): number | null => {
    const ctx = GqlExecutionContext.create(context);
    const request: Request = ctx.getContext().req;

    return request.cookies?.team_view_id || null;
  },
);
