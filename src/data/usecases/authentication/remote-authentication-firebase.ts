import { AuthFirebase } from '@/data/protocols/firebase/auth-firebase';
import { StatusCode } from '@/data/protocols/firebase/response';
import { InvalidCredentialsError, UnexpectedError } from '@/domain/errors';
import { AccountModel } from '@/domain/model';
import { Authentication, AuthenticationParams } from '@/domain/usecases';

export class RemoteAuthenticationFirebase implements Authentication {
  constructor (readonly authFirebase: AuthFirebase<AccountModel>) {}

  async auth (params: AuthenticationParams): Promise<AccountModel> {
    const response = await this.authFirebase.authFirebase(params);
    switch (response.statusCode) {
      case StatusCode.unauthorized: throw new InvalidCredentialsError();
      case StatusCode.serverError: throw new UnexpectedError();
      default: return response.body;
    }
  }
}
