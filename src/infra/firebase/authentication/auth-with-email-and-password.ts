import { AuthFirebase, Response } from '@/data/protocols/firebase';
import { AuthenticationParams } from '@/domain/usecases';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { app } from '../firebaseConfig';

export class AuthWithEmailAndPassword implements AuthFirebase<any> {
  async authFirebase (param: AuthenticationParams): Promise<Response<any>> {
    try {
      const response = await signInWithEmailAndPassword(getAuth(app), param.email, param.password);
      return {
        statusCode: 200,
        body: {
          accessTokes: response.user.uid
        }
      };
    } catch (erro) {
      return {
        statusCode: erro.code
      };
    }
  }
}
