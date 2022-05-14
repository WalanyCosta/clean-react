import { AuthWithEmailAndPasswordSpy } from '@/data/test/mock-auth-with-email-and-password';
import { mockAuthentication } from '@/domain/test';
import { RemoteAuthenticationFirebase } from './remote-authentication-firebase';

describe('RemoteAuthenticationFirebase', () => {
  test('should call authWithEmailAndPasswordSpy with correct params', () => {
    const authWithEmailAndPasswordSpy = new AuthWithEmailAndPasswordSpy();
    const remoteAuthenticationFirebase = new RemoteAuthenticationFirebase(authWithEmailAndPasswordSpy);
    const authentication = mockAuthentication();
    remoteAuthenticationFirebase.auth(authentication);
    expect(authWithEmailAndPasswordSpy.params).toBe(authentication);
  });
});
