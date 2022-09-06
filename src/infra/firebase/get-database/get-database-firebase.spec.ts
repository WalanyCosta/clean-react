import faker from '@faker-js/faker';
import { getDatabase, ref, get, child } from 'firebase/database';
import { GetDatabaseFirebase } from './get-database-firebase';

type SutTypes = {
  sut: GetDatabaseFirebase;
  mockedGetDatabase: jest.Mock<any, any>;
}

jest.mock('firebase/database', () => {
  return {
    getDatabase: jest.fn(),
    ref: jest.fn(),
    get: jest.fn(),
    child: jest.fn()
  };
});

const makeSut = (): SutTypes => {
  const mockedGetDatabase = get as jest.Mock<any, any>;
  const sut = new GetDatabaseFirebase();

  return {
    sut,
    mockedGetDatabase
  };
};

describe('GetDatabaseFirebase', () => {
  test('should calls get with value correct', async () => {
    const { sut, mockedGetDatabase } = makeSut();
    const url = faker.internet.url();
    await sut.get({ url });
    expect(mockedGetDatabase).toHaveBeenCalledWith(
      child(ref(getDatabase()), url)
    );
  });
});
