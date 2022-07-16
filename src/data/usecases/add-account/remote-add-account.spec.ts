import { AccountModel } from '@/domain/model';
import { mockAddAccount } from '@/domain/test';
import { CreateUserSpy } from '@/data/test';
import { RemoteAddAccount } from './remote-add-account';
import { StatusCode } from '@/data/protocols/firebase';
import { EmailInUseError } from '@/domain/errors/email-in-use-error';
import { AddAccountParam } from '@/domain/usecases';

type SutType ={
  sut: RemoteAddAccount,
  createUserSpy: CreateUserSpy<AccountModel>,
  addAccountParam: AddAccountParam
};

const makeSut = ():SutType => {
  const createUserSpy = new CreateUserSpy<AccountModel>();
  const addAccountParam = mockAddAccount();
  createUserSpy.response = {
    statusCode: StatusCode.ok
  };
  const sut = new RemoteAddAccount(createUserSpy);

  return {
    sut,
    createUserSpy,
    addAccountParam
  };
};

describe('RemoteAddAccount', () => {
  test('should call CreateUser with correct params', async () => {
    const { sut, createUserSpy, addAccountParam } = makeSut();
    await sut.add(addAccountParam);
    expect(createUserSpy.param).toEqual({
      email: addAccountParam.email,
      password: addAccountParam.password,
      passwordConfirmation: addAccountParam.passwordConfirmation
    });
  });

  test('should throw EmailInUseError AddAccounts returns createUser/user-exists', async () => {
    const { sut, createUserSpy, addAccountParam } = makeSut();
    createUserSpy.response = {
      statusCode: StatusCode.forbidden
    };
    const promise = sut.add(addAccountParam);
    await expect(promise).rejects.toThrow(new EmailInUseError());
  });
});
