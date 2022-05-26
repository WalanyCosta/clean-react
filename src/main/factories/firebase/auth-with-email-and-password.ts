import { AuthWithEmailAndPassword } from '@/infra/firebase/authentication/auth-with-email-and-password';

export const makeAuthWithEmailAndPassword = (): AuthWithEmailAndPassword => {
  return new AuthWithEmailAndPassword();
};
