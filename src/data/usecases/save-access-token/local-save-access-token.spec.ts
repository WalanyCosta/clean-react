import { SetStorageMock } from '@/data/test';
import { UnexpectedError } from '@/domain/errors';
import { faker } from '@faker-js/faker';
import { LocalSaveAccessToken } from './local-save-access-token';

type SutTypes = {
  sut:LocalSaveAccessToken
  setStorageMock : SetStorageMock;
}

const makeSut = (): SutTypes => {
  const setStorageMock = new SetStorageMock();
  const sut = new LocalSaveAccessToken(setStorageMock);
  return {
    sut,
    setStorageMock
  };
};

describe('LocalSaveAccessToken', () => {
  test('should call setStorage with correct value', async () => {
    const { sut, setStorageMock } = makeSut();
    const accessToken = faker.random.alphaNumeric(10);
    await sut.save(accessToken);
    expect(setStorageMock.key).toBe('accessToken');
    expect(setStorageMock.value).toBe(accessToken);
  });

  test('should throw if setStorage throws', async () => {
    const { sut, setStorageMock } = makeSut();
    jest.spyOn(setStorageMock, 'set').mockRejectedValueOnce(new Error());
    const promise = sut.save(faker.random.alphaNumeric(10));
    await expect(promise).rejects.toThrow(new Error());
  });

  test('should throw if accessToken is falsy', async () => {
    const { sut } = makeSut();
    const promise = sut.save(undefined);
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });
});
