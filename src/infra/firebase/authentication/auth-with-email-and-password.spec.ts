import { mockAuthentication } from '@/domain/test';
import { Auth, getAuth, signInWithEmailAndPassword, User } from 'firebase/auth';
import { AuthWithEmailAndPassword } from './auth-with-email-and-password';

jest.mock('firebase/auth');

type SutTypes ={
  sut: AuthWithEmailAndPassword;
  mockedSignIn: jest.Mocked<typeof signInWithEmailAndPassword>;
}

const makeSut = (auth = getAuth()) : SutTypes => {
  const mockedSignIn = signInWithEmailAndPassword as jest.Mocked<typeof signInWithEmailAndPassword>;
  const sut = new AuthWithEmailAndPassword(auth);

  return {
    sut,
    mockedSignIn
  };
};

describe('AuthWithEmailAndPassword', () => {
  test('should calls signInWithEmailAndPassword with correct values', async () => {
    const auth = getAuth();
    const authParams = mockAuthentication();
    const { sut, mockedSignIn } = makeSut(auth);
    await sut.authFirebase(authParams);
    expect(mockedSignIn).toHaveBeenCalledWith(auth, authParams.email, authParams.password);
  });
});
