import { RemoteAddAccount } from '@/data/usecases';
import { AddAccount } from '@/domain/usecases';
import { makeSignUp } from '../../firebase/SignUp';

export const makeRemoteAddAccount = (): AddAccount => {
  return new RemoteAddAccount(makeSignUp());
};
