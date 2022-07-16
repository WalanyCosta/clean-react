import { AccountModel } from '@/domain/model';
import { mockAddAccount } from '@/domain/test';
import { CreateUserSpy } from '@/data/test';
import { RemoteAddAccount } from './remote-add-account';

describe('RemoteAddAccount', () => {
  test('should call CreateUser with correct params', async () => {
    const createUserSpy = new CreateUserSpy<AccountModel>();
    const addAccountParam = mockAddAccount();
    const sut = new RemoteAddAccount(createUserSpy);
    await sut.add(addAccountParam);
    expect(createUserSpy.param).toEqual({
      email: addAccountParam.email,
      password: addAccountParam.password,
      passwordConfirmation: addAccountParam.passwordConfirmation
    });
  });
});
