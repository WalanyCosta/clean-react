import { mockAccount } from '@/domain/test';
import faker from '@faker-js/faker';
import 'jest-localstorage-mock';
import { LocalStorageAdapter } from './local-storage-adapter';

const makeSut = (): LocalStorageAdapter => new LocalStorageAdapter();

describe('LocalStorageAdapter', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('should call localStorage.setItem with correct values', async () => {
    const sut = makeSut();
    const key = faker.random.word();
    const value = mockAccount();
    sut.set(key, value);
    expect(localStorage.setItem).toHaveBeenCalledWith(key, JSON.stringify(value));
  });

  test('should call localStorage.removeItem if values is null', async () => {
    const sut = makeSut();
    const key = faker.random.word();
    sut.set(key, undefined);
    expect(localStorage.removeItem).toHaveBeenCalledWith(key);
  });

  test('should call localStorage.getItem with correct values', async () => {
    const sut = makeSut();
    const key = faker.database.column();
    const value = mockAccount();
    const getItemSpy = jest.spyOn(localStorage, 'getItem').mockReturnValueOnce(JSON.stringify(value));
    const obj = sut.get(key);
    expect(getItemSpy).toHaveBeenCalledWith(key);
    expect(obj).toEqual(value);
  });
});
