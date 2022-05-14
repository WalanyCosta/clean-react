import { AuthFirebase } from '@/data/protocols/firebase/auth-firebase';
import { AccountModel } from '@/domain/model';
import { Authentication, AuthenticationParams } from '@/domain/usecases';

export class RemoteAuthenticationFirebase implements Authentication {
  constructor (readonly authFirebase: AuthFirebase) {}

  async auth (params: AuthenticationParams): Promise<AccountModel> {
    this.authFirebase.authFirebase(params);
    return { accessTokes: 'allsalls' } as AccountModel;
  }
}
