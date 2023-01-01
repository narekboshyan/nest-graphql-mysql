import { SetMetadata } from '@nestjs/common';

import { UserRoleEnum } from 'enums/user.enums';

export const ROLES_KEY = 'roles';
export const Role = (...roles: UserRoleEnum[]) => SetMetadata(ROLES_KEY, roles);
