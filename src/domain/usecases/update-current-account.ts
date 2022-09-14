import { AccountModel } from '../model';

export interface UpdateCurrentAccount{
  save: (account: AccountModel) => Promise<void>;
}
