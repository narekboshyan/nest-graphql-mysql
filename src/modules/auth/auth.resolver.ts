import { Args, Resolver, Query } from '@nestjs/graphql';

import { AuthService } from 'modules/auth/auth.service';
import { LoginInput } from 'modules/auth/input/login.input';
import { UserWithTokenObject } from 'modules/user/object/user-with-token.objects';
import { TokenObject } from 'modules/auth/object/refresh-token.object';
// import { LoginObject } from 'modules/auth/object/login.object';
// import { RefreshTokenObject } from 'modules/auth/object/refresh-token.object';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query(() => UserWithTokenObject)
  login(@Args('input') input: LoginInput) {
    return this.authService.login(input);
  }

  @Query(() => TokenObject)
  refreshToken(@Args('refreshToken') refreshToken: string) {
    return this.authService.refreshToken(refreshToken);
  }
}
