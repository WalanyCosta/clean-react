import faker from '@faker-js/faker';

export const mockRequest = (): object => ({
  url: faker.internet.url(),
  body: { passWord: faker.internet.password(), email: faker.internet.email() }
});
