import { AccountModel } from '@/domain/model';
import { AddAccount, AddAccountParam } from '@/domain/usecases';

export class AddAccountSpy implements AddAccount {
  param: AddAccountParam;

  add (params: AddAccountParam): Promise<AccountModel> {
    this.param = params;
    return null;
  }
}
