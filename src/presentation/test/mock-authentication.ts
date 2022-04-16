import { Authentication, AuthenticationParams } from '@/domain/usecases';
import { mockAccount } from '@/domain/test';
import { AccountModel } from '@/domain/model';

export class AuthenticationSpy implements Authentication {
  account = mockAccount();
  params: AuthenticationParams;

  auth (params: AuthenticationParams): Promise<AccountModel> {
    this.params = params;
    return Promise.resolve(this.account);
  }
}
