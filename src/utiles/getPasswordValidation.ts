import { AuthData, RegistrationValuesType } from '~src/api/AuthApi';

export const getPasswordValidation = (values: AuthData | RegistrationValuesType | {}): boolean => {
  if (('password' in values) && ('repeated_password' in values)) {
    return (values.password === values.repeated_password);
  }

  return false;
};
