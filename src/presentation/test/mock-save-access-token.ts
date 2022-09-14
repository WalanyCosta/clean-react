import { AccountModel } from '@/domain/model';
import { UpdateCurrentAccount } from '@/domain/usecases';

export class UpdateCurrentAccountMock implements UpdateCurrentAccount {
  value: AccountModel;

  async save (access: AccountModel) : Promise<void> {
    this.value = access;
  };
}
