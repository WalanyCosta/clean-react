import { AuthFirebase, Response } from '@/data/protocols/firebase';
import { AuthenticationParams } from '@/domain/usecases';
import { FirebaseApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

export class AuthWithEmailAndPassword implements AuthFirebase<any> {
  constructor (private readonly app: FirebaseApp) {}

  async authFirebase (param: AuthenticationParams): Promise<Response<any>> {
    try {
      const response = await signInWithEmailAndPassword(getAuth(this.app), param.email, param.password);
      return {
        statusCode: 200,
        body: {
          accessToken: response.user.uid,
          email: response.user.email
        }
      };
    } catch (erro) {
      return {
        statusCode: erro.code
      };
    }
  }
}
