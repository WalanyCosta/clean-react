import { AuthenticationParams } from '@/domain/usecases';
import { AuthFirebase, Response } from '@/data/protocols/firebase';

export class AuthWithEmailAndPasswordSpy<T> implements AuthFirebase<T> {
    params : AuthenticationParams;
    response: Response<T>;

    async authFirebase (params: AuthenticationParams): Promise<Response<T>> {
      this.params = params;
      return this.response;
    }
}
