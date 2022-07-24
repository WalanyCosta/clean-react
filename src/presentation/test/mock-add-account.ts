import { AccountModel } from '@/domain/model';
import { AddAccount, AddAccountParam } from '@/domain/usecases';

export class AddAccountSpy implements AddAccount {
  param: AddAccountParam;
  callsCount= 0;

  add (params: AddAccountParam): Promise<AccountModel> {
    this.param = params;
    this.callsCount++;
    return null;
  }
}
