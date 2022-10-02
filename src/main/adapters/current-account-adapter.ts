import { AccountModel } from '@/domain/model';
import { makeLocalStorageAdapter } from '@/main/factories/cache/local-storage-adapter-factory';

export const setCurrentAccountAdapter = (account: AccountModel) : void => {
  makeLocalStorageAdapter().set('account', account);
};

export const getCurrentAccountAdapter = () : AccountModel => {
  return makeLocalStorageAdapter().get('account');
};
