import { StatusCode } from '@/data/protocols/firebase/response';
import { AuthWithEmailAndPasswordSpy } from '@/data/test/mock-auth-with-email-and-password';
import { InvalidCredentialsError } from '@/domain/errors';
import { AccountModel } from '@/domain/model';
import { mockAuthentication } from '@/domain/test';
import { RemoteAuthenticationFirebase } from './remote-authentication-firebase';

describe('RemoteAuthenticationFirebase', () => {
  test('should call authWithEmailAndPasswordSpy with correct params', async () => {
    const authWithEmailAndPasswordSpy = new AuthWithEmailAndPasswordSpy<AccountModel>();
    const remoteAuthenticationFirebase = new RemoteAuthenticationFirebase(authWithEmailAndPasswordSpy);
    const authentication = mockAuthentication();
    authWithEmailAndPasswordSpy.response = {
      statusCode: StatusCode.ok
    };
    await remoteAuthenticationFirebase.auth(authentication);
    expect(authWithEmailAndPasswordSpy.params).toBe(authentication);
  });

  test('should throw InvalidCredentialsError AuthFirebase returns 401 ', async () => {
    const authWithEmailAndPasswordSpy = new AuthWithEmailAndPasswordSpy<AccountModel>();
    const remoteAuthenticationFirebase = new RemoteAuthenticationFirebase(authWithEmailAndPasswordSpy);
    authWithEmailAndPasswordSpy.response = {
      statusCode: StatusCode.unauthorized
    };
    const promise = remoteAuthenticationFirebase.auth(mockAuthentication());
    await expect(promise).rejects.toThrow(new InvalidCredentialsError());
  });
});
