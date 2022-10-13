import { mockSurveyList } from '@/domain/test';
import { mockParamUrl } from '@/infra/test/mock-database-firebase';
import faker from '@faker-js/faker';
import { getDatabase, ref, get, child } from 'firebase/database';
import { GetDatabaseFirebase } from './get-database-firebase';

type SutTypes = {
  sut: GetDatabaseFirebase;
  mockedGetDatabase: jest.Mock<any, any>;
  valueReturn: any;
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
  const valueReturn = jest.fn(() => (mockSurveyList()));

  mockedGetDatabase.mockResolvedValue({
    val: valueReturn
  });
  return {
    sut,
    mockedGetDatabase,
    valueReturn
  };
};

const mockedResult = (value) => ({
  statusCode: 200,
  body: value
});

describe('GetDatabaseFirebase', () => {
  test('should calls get with value correct', async () => {
    const { sut, mockedGetDatabase } = makeSut();
    const url = faker.internet.url();
    await sut.get({ url });
    expect(mockedGetDatabase).toHaveBeenCalledWith(
      child(ref(getDatabase()), url)
    );
  });

  test('should return the correct statusCode and body', async () => {
    const { sut, valueReturn } = makeSut();
    const promise = sut.get(mockParamUrl());
    expect(promise).toEqual(Promise.resolve(mockedResult(valueReturn)));
  });

  test('should return statuscode 500 if get returns error', async () => {
    const { sut, mockedGetDatabase } = makeSut();
    const mockedResultReject = { statusCode: 500 };
    mockedGetDatabase.mockRejectedValue(new Error('Ocorreu um error'));
    const promise = await sut.get(mockParamUrl());
    expect(promise).toEqual(mockedResultReject);
  });
});
