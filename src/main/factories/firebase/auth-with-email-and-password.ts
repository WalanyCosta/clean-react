import { AuthWithEmailAndPassword } from '@/infra/firebase/authentication/auth-with-email-and-password';
import { app } from './firebaseConfig';

export const makeAuthWithEmailAndPassword = (): AuthWithEmailAndPassword => {
  return new AuthWithEmailAndPassword(app);
};
