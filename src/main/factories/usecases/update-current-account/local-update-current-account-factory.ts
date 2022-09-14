import { LocalUpdateCurrentAccount } from '@/data/usecases/update-current-account/local-update-current-account';
import { UpdateCurrentAccount } from '@/domain/usecases';
import { makeLocalStorageAdapter } from '@/main/factories/cache/local-storage-adapter-factory';

export const makeUpdateCurrentAccount = (): UpdateCurrentAccount => {
  return new LocalUpdateCurrentAccount(makeLocalStorageAdapter());
};
