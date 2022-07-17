import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';

import { mockAddAccount } from '@/domain/test';
import { SignUp } from './signUp';
import faker from '@faker-js/faker';
import { Response } from '@/data/protocols/firebase';

jest.mock('firebase/auth', () => {
  return {
    getAuth: jest.fn(),
    createUserWithEmailAndPassword: jest.fn()
  };
});

const mockedResult = (object): Response<any> => ({
  statusCode: 200,
  body: object
});

describe('SignUp', () => {
  test('should calls createUserWithEmailAndPassword with correct values', async () => {
    const mockedCreateUser = createUserWithEmailAndPassword as jest.Mock<any, any>;
    const object = jest.fn(() => faker.random.alphaNumeric());
    mockedCreateUser.mockResolvedValue({
      user: object
    });
    const sut = new SignUp();
    const addAccountParam = mockAddAccount();
    await sut.signUp(addAccountParam);
    expect(mockedCreateUser).toHaveBeenCalledWith(
      getAuth(),
      addAccountParam.email,
      addAccountParam.passwordConfirmation);
  });

  test('should return the correct statusCode and body', async () => {
    const mockedCreateUser = createUserWithEmailAndPassword as jest.Mock<any, any>;
    const object = jest.fn(() => faker.random.alphaNumeric());
    mockedCreateUser.mockResolvedValue({
      user: object
    });
    const sut = new SignUp();
    const promise = sut.signUp(mockAddAccount());
    expect(promise).toEqual(Promise.resolve(mockedResult(object)));
  });
});
