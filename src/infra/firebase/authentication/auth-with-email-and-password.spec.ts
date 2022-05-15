import { mockAuthentication } from '@/domain/test';
import { Auth, getAuth, signInWithEmailAndPassword, User } from 'firebase/auth';
import { AuthWithEmailAndPassword } from './auth-with-email-and-password';

jest.mock('firebase/auth');

describe('AuthWithEmailAndPassword', () => {
  test('should calls signInWithEmailAndPassword with correct values', async () => {
    const auth = getAuth();
    const authParams = mockAuthentication();
    const mockedSignIn = signInWithEmailAndPassword as jest.Mocked<typeof signInWithEmailAndPassword>;
    const authWithEmailAndPassword = new AuthWithEmailAndPassword(auth);
    await authWithEmailAndPassword.authFirebase(authParams);
    expect(mockedSignIn).toHaveBeenCalledWith(auth, authParams.email, authParams.password);
  });
});
