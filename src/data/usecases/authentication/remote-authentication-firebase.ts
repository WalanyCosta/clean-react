import { StatusCode, AuthFirebase } from '@/data/protocols/firebase';
import { InvalidCredentialsError, UnexpectedError } from '@/domain/errors';
import { Authentication, AuthenticationParams } from '@/domain/usecases';
import { AccountModel } from '@/domain/model';

export class RemoteAuthenticationFirebase implements Authentication {
  constructor (readonly authFirebase: AuthFirebase<AccountModel>) {}

  async auth (params: AuthenticationParams): Promise<AccountModel> {
    const response = await this.authFirebase.authFirebase(params);
    switch (response.statusCode) {
      case StatusCode.ok: return response.body;
      case StatusCode.unauthorized: throw new InvalidCredentialsError();
      case StatusCode.unauthorizedUser: throw new InvalidCredentialsError();
      default: throw new UnexpectedError();
    }
  }
}
