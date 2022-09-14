import { AddAccountParam, AuthenticationParams } from '../usecases';
import { AccountModel } from '../model';
import faker from '@faker-js/faker';

export const mockAuthentication = (): AuthenticationParams => ({
  email: faker.internet.email(),
  password: faker.internet.password()
});

export const mockAddAccount = (): AddAccountParam => {
  const password = faker.internet.password();
  return {
    email: faker.internet.email(),
    password: password,
    passwordConfirmation: password
  };
};

export const mockAccount = (): AccountModel => ({
  accessToken: faker.random.alphaNumeric(8),
  email: faker.internet.email()
});
