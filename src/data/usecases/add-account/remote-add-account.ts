import { CreateUser } from '@/data/protocols/firebase';
import { AccountModel } from '@/domain/model';
import { AddAccount, AddAccountParam } from '@/domain/usecases';

export class RemoteAddAccount implements AddAccount {
  constructor (private readonly createUser: CreateUser<AccountModel>) {}
  async add (param: AddAccountParam): Promise<AccountModel> {
    await this.createUser.signUp(param);
    return null;
  }
}
