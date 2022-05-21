import { mockAuthentication } from '@/domain/test';
import faker from '@faker-js/faker';
import { getAuth, signInWithEmailAndPassword, User } from 'firebase/auth';
import { AuthWithEmailAndPassword } from './auth-with-email-and-password';
import { Response } from '@/data/protocols/firebase';

jest.mock('firebase/auth', () => {
  return {
    getAuth: jest.fn(),
    signInWithEmailAndPassword: jest.fn()
  };
});

type SutTypes ={
  sut: AuthWithEmailAndPassword;
  mockedSignIn: jest.Mock<any, any>;
  object: string | number;
}

const makeSut = () : SutTypes => {
  const mockedSignIn = signInWithEmailAndPassword as jest.Mock<any, any>;
  const sut = new AuthWithEmailAndPassword();
  const object = faker.random.objectElement({ keyA: 'may', keyB: 42 });
  mockedSignIn.mockResolvedValue({
    user: object
  });

  return {
    sut,
    mockedSignIn,
    object
  };
};

const mockedResult = (object): Response<any> => ({
  statusCode: 200,
  body: object
});

describe('AuthWithEmailAndPassword', () => {
  test('should calls signInWithEmailAndPassword with correct values', async () => {
    const authParams = mockAuthentication();
    const { sut, mockedSignIn } = makeSut();
    await sut.authFirebase(authParams);
    expect(mockedSignIn).toHaveBeenCalledWith(getAuth(), authParams.email, authParams.password);
  });

  test('should return the correct statusCode and body', async () => {
    const authParams = mockAuthentication();
    const { sut, object } = makeSut();
    const promise = sut.authFirebase(authParams);
    expect(promise).toEqual(Promise.resolve(mockedResult(object)));
  });
});
