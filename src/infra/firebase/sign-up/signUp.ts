import { CreateUser, Response } from '@/data/protocols/firebase';
import { AddAccountParam } from '@/domain/usecases';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { app } from '../firebaseConfig';

export class SignUp implements CreateUser<any> {
  async signUp (param: AddAccountParam): Promise<Response<any>> {
    try {
      const response = await createUserWithEmailAndPassword(getAuth(app), param.email, param.password);
      return {
        statusCode: 200,
        body: response.user
      };
    } catch (error) {
      return {
        statusCode: error?.code
      };
    }
  }
};
