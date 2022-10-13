import { CreateUser, Response } from '@/data/protocols/firebase';
import { AddAccountParam } from '@/domain/usecases';
import { FirebaseApp } from 'firebase/app';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';

export class SignUp implements CreateUser<any> {
  constructor (private readonly app: FirebaseApp) {}

  async signUp (param: AddAccountParam): Promise<Response<any>> {
    try {
      const response = await createUserWithEmailAndPassword(getAuth(this.app), param.email, param.password);
      return {
        statusCode: 200,
        body: {
          accessToken: response.user.uid,
          email: response.user.email
        }
      };
    } catch (error) {
      return {
        statusCode: error?.code
      };
    }
  }
};
