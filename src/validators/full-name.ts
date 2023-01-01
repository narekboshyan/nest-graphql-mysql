import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'FullNameRule' })
class FullNameRule implements ValidatorConstraintInterface {
  validate(value: string) {
    try {
      const newValue = value?.trim();
      if (
        newValue &&
        !/[0-9]/.test(newValue) &&
        newValue.split(' ').length > 1 &&
        newValue[0] !== ' ' &&
        newValue[newValue.length - 1] !== ' '
      ) {
        return true;
      }
    } catch (e) {}

    return false;
  }

  defaultMessage() {
    return `Invalid full name`;
  }
}

export function IsFullName(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'IsFullName',
      target: object.constructor,
      propertyName: propertyName,
      constraints: null,
      options: validationOptions,
      validator: FullNameRule,
    });
  };
}
