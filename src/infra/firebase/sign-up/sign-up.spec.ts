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

type SutType ={
  sut: SignUp;
  mockedCreateUser: jest.Mock<any, any>;
  object: any;
}

const makeSut = (): SutType => {
  const mockedCreateUser = createUserWithEmailAndPassword as jest.Mock<any, any>;
  const object = jest.fn(() => faker.random.alphaNumeric());
  const sut = new SignUp();
  mockedCreateUser.mockResolvedValue({
    user: object
  });

  return {
    sut,
    mockedCreateUser,
    object
  };
};

const mockedResult = (object): Response<any> => ({
  statusCode: 200,
  body: object
});

describe('SignUp', () => {
  test('should calls createUserWithEmailAndPassword with correct values', async () => {
    const { sut, mockedCreateUser } = makeSut();
    const addAccountParam = mockAddAccount();
    await sut.signUp(addAccountParam);
    expect(mockedCreateUser).toHaveBeenCalledWith(
      getAuth(),
      addAccountParam.email,
      addAccountParam.passwordConfirmation);
  });

  test('should return the correct statusCode and body', async () => {
    const { sut, object } = makeSut();
    const promise = sut.signUp(mockAddAccount());
    expect(promise).toEqual(Promise.resolve(mockedResult(object)));
  });

  test('should return code', async () => {
    const { sut, mockedCreateUser } = makeSut();
    const mockedResultReject = { statusCode: 500 };
    mockedCreateUser.mockRejectedValue({
      code: 500
    });
    const promise = await sut.signUp(mockAddAccount());
    expect(promise).toEqual(mockedResultReject);
  });
});
