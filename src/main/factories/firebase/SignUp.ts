import { SignUp } from '@/infra/firebase/sign-up/signUp';

export const makeSignUp = (): SignUp => {
  return new SignUp();
};
