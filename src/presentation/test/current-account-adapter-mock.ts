import { AccountModel } from '@/domain/model';

export class CurrentAccountAdapterMock {
  getCurrentAccountAdapter (): AccountModel {
    const account = {
      accessToken: 'laldadajdaldald',
      email: 'delcio@gmail.com'
    };
    return account;
  }
}
