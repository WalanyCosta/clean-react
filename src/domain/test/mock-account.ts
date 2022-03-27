import { AuthenticationParams } from '../usecases/Authentication';
import { AccountModel } from '../model/Account-model';
import faker from '@faker-js/faker';

export const mockAuthentication = (): AuthenticationParams => ({
  email: faker.internet.email(),
  password: faker.internet.password()
});

export const mockAccount = (): AccountModel => ({
  accessTokes: faker.random.alphaNumeric(8)
});
