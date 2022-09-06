import faker from '@faker-js/faker';
import { getDatabase, ref, get, child } from 'firebase/database';
import { GetDatabaseFirebase } from './get-database-firebase';

jest.mock('firebase/database', () => {
  return {
    getDatabase: jest.fn(),
    ref: jest.fn(),
    get: jest.fn(),
    child: jest.fn()
  };
});

describe('GetDatabaseFirebase', () => {
  test('should calls get with value correct', async () => {
    const mockedGetDatabase = get as jest.Mock<any, any>;
    const url = faker.internet.url();
    const sut = new GetDatabaseFirebase();
    await sut.get({ url });
    expect(mockedGetDatabase).toHaveBeenCalledWith(
      child(ref(getDatabase()), url)
    );
  });
});
