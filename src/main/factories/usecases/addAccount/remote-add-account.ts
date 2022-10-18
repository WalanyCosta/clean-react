import { RemoteAddAccount } from '@/data/usecases/add-account/remote-add-account';
import { AddAccount } from '@/domain/usecases';
import { makeSignUp } from '../../firebase/SignUp';

export const makeRemoteAddAccount = (): AddAccount => {
  return new RemoteAddAccount(makeSignUp());
};
