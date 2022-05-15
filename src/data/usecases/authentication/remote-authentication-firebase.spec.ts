import { StatusCode } from '@/data/protocols/firebase/response';
import { AuthWithEmailAndPasswordSpy } from '@/data/test/mock-auth-with-email-and-password';
import { InvalidCredentialsError, UnexpectedError } from '@/domain/errors';
import { AccountModel } from '@/domain/model';
import { mockAuthentication } from '@/domain/test';
import { RemoteAuthenticationFirebase } from './remote-authentication-firebase';

type SutTypes ={
  sut: RemoteAuthenticationFirebase
  authWithEmailAndPasswordSpy: AuthWithEmailAndPasswordSpy<AccountModel>;
}

const makeSut = (): SutTypes => {
  const authWithEmailAndPasswordSpy = new AuthWithEmailAndPasswordSpy<AccountModel>();
  const sut = new RemoteAuthenticationFirebase(authWithEmailAndPasswordSpy);
  authWithEmailAndPasswordSpy.response = {
    statusCode: StatusCode.ok
  };

  return {
    sut,
    authWithEmailAndPasswordSpy
  };
};

describe('RemoteAuthenticationFirebase', () => {
  test('should call authWithEmailAndPasswordSpy with correct params', async () => {
    const { sut, authWithEmailAndPasswordSpy } = makeSut();
    const authentication = mockAuthentication();
    await sut.auth(authentication);
    expect(authWithEmailAndPasswordSpy.params).toBe(authentication);
  });

  test('should throw InvalidCredentialsError AuthFirebase returns 401 ', async () => {
    const { sut, authWithEmailAndPasswordSpy } = makeSut();
    authWithEmailAndPasswordSpy.response = {
      statusCode: StatusCode.unauthorized
    };
    const promise = sut.auth(mockAuthentication());
    await expect(promise).rejects.toThrow(new InvalidCredentialsError());
  });

  test('should throw ServerError AuthFirebase returns 500 ', async () => {
    const { sut, authWithEmailAndPasswordSpy } = makeSut();
    authWithEmailAndPasswordSpy.response = {
      statusCode: StatusCode.serverError
    };
    const promise = sut.auth(mockAuthentication());
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });
});
