import { SignUp } from '@/infra/firebase/sign-up/signUp';
import { app } from './firebaseConfig';

export const makeSignUp = (): SignUp => {
  return new SignUp(app);
};
