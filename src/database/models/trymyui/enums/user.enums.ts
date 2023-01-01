import { registerEnumType } from '@nestjs/graphql';

export enum UserRoleEnum {
  customer = 0,
  worker = 1,
}
registerEnumType(UserRoleEnum, { name: 'UserRoleEnum' });

export enum InvitationStatusEnum {
  invited = 0,
  accepted = 1,
  declined = 2,
}
registerEnumType(InvitationStatusEnum, { name: 'InvitationStatusEnum' });

export enum UserSetDowngradePlanEnum {
  downgradeToPersonalPlan = 1,
  downgradeToLockedPlan = 0,
}
registerEnumType(UserSetDowngradePlanEnum, {
  name: 'UserSetDowngradePlanEnum',
});

export enum UserKindEnum {
  normal = 0,
  anonymous = 1,
  test = 2,
  zombie = 3,
  internal = 4,
  grader = 5,
  admin = 6,
  student = 7,
  faculty = 8,
  staff = 9,
  support = 10,
}
registerEnumType(UserKindEnum, { name: 'UserKindEnum' });

export enum UserStatusEnum {
  registrationPending = 1,
  active = 2,
  terminated = 3,
  suspended = 4,
  accountLocked = 5,
  orgLocked = 6,
}
registerEnumType(UserStatusEnum, { name: 'UserStatusEnum' });

export enum EmailAddressStatusEnum {
  incorrect = 'incorrect',
  unverified = 'unverified',
  verified = 'verified',
}
registerEnumType(EmailAddressStatusEnum, { name: 'EmailAddressStatusEnum' });

export enum UserWorkProfileEnum {
  smallOrMediumBusiness = 1,
  largeFirm = 2,
  agencyOrConsultancy = 3,
}
registerEnumType(UserWorkProfileEnum, { name: 'UserWorkProfileEnum' });
