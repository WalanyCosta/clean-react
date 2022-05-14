import { AuthenticationParams } from '@/domain/usecases';
import { AuthFirebase } from '../protocols/firebase/auth-firebase';

export class AuthWithEmailAndPasswordSpy implements AuthFirebase {
  params : AuthenticationParams;

  async authFirebase (params: AuthenticationParams): Promise<void> {
    this.params = params;
    return Promise.resolve();
  }
}
