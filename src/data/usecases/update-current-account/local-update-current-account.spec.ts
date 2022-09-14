import { SetStorageMock } from '@/data/test';
import { UnexpectedError } from '@/domain/errors';
import { AccountModel } from '@/domain/model';
import { mockAccount } from '@/domain/test';
import { faker } from '@faker-js/faker';
import { LocalUpdateCurrentAccount } from './local-update-current-account';

type SutTypes = {
  sut: LocalUpdateCurrentAccount;
  setStorageMock : SetStorageMock;
}

const makeSut = (): SutTypes => {
  const setStorageMock = new SetStorageMock();
  const sut = new LocalUpdateCurrentAccount(setStorageMock);
  return {
    sut,
    setStorageMock
  };
};

describe('LocalSaveAccessToken', () => {
  test('should call setStorage with correct value', async () => {
    const { sut, setStorageMock } = makeSut();
    const account = mockAccount();
    await sut.save(account);
    expect(setStorageMock.key).toBe('account');
    expect(setStorageMock.value).toBe(JSON.stringify(account));
  });

  test('should throw if setStorage throws', async () => {
    const { sut, setStorageMock } = makeSut();
    jest.spyOn(setStorageMock, 'set').mockImplementationOnce(() => { throw new Error(); });
    const promise = sut.save(mockAccount());
    await expect(promise).rejects.toThrow(new Error());
  });

  test('should throw if accessToken is falsy', async () => {
    const { sut } = makeSut();
    const promise = sut.save(undefined);
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });
});
