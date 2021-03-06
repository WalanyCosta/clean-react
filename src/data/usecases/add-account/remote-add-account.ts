import { CreateUser, StatusCode } from '@/data/protocols/firebase';
import { EmailInUseError, UnexpectedError } from '@/domain/errors';
import { AccountModel } from '@/domain/model';
import { AddAccount, AddAccountParam } from '@/domain/usecases';

export class RemoteAddAccount implements AddAccount {
  constructor (private readonly createUser: CreateUser<AccountModel>) {}

  async add (param: AddAccountParam): Promise<AccountModel> {
    const response = await this.createUser.signUp(param);
    switch (response.statusCode) {
      case StatusCode.forbidden: throw new EmailInUseError();
      case StatusCode.ok: return response.body;
      default: throw new UnexpectedError();
    };
  }
}
