import { AddAccountParam } from '@/domain/usecases';
import { CreateUser } from '@/data/protocols/firebase/create-user';
import { Response } from '@/data/protocols/firebase';

export class CreateUserSpy<T> implements CreateUser<T> {
    param: AddAccountParam;
    async signUp (param: AddAccountParam): Promise<Response<T>> {
      this.param = param;
      return null;
    }
}
