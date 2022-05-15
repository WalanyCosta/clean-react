import { AuthFirebase, Response } from '@/data/protocols/firebase';
import { AuthenticationParams } from '@/domain/usecases';
import { Auth, signInWithEmailAndPassword } from 'firebase/auth';

export class AuthWithEmailAndPassword implements AuthFirebase<any> {
  constructor (readonly auth: Auth) {}

  async authFirebase (param: AuthenticationParams): Promise<Response<any>> {
    const response = await signInWithEmailAndPassword(this.auth, param.email, param.password);
    return {
      statusCode: 200
    };
  }
}
