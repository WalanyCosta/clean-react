import { AccountModel } from '@/domain/model';
import { mockAccount } from '@/domain/test';
import { AddAccount, AddAccountParam } from '@/domain/usecases';

export class AddAccountSpy implements AddAccount {
  param: AddAccountParam;
  callsCount = 0;
  account = mockAccount();

  add (params: AddAccountParam): Promise<AccountModel> {
    this.param = params;
    this.callsCount++;
    return Promise.resolve(this.account);
  }
}
