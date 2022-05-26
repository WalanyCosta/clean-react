import { RemoteAuthenticationFirebase } from '@/data/usecases/authentication';
import { Authentication } from '@/domain/usecases';
import { makeAuthWithEmailAndPassword } from '@/main/factories/firebase/auth-with-email-and-password';

export const makeRemoteAuthenticationFirebase = (): Authentication => {
  return new RemoteAuthenticationFirebase(makeAuthWithEmailAndPassword());
};
