import { AccountModel } from '@/domain/model';
import { mockAccount, mockAddAccount } from '@/domain/test';
import { CreateUserSpy } from '@/data/test';
import { RemoteAddAccount } from './remote-add-account';
import { StatusCode } from '@/data/protocols/firebase';
import { EmailInUseError } from '@/domain/errors/email-in-use-error';
import { UnexpectedError } from '@/domain/errors';

type SutType ={
  sut: RemoteAddAccount,
  createUserSpy: CreateUserSpy<AccountModel>,
};

const makeSut = ():SutType => {
  const createUserSpy = new CreateUserSpy<AccountModel>();
  createUserSpy.response = {
    statusCode: StatusCode.ok
  };
  const sut = new RemoteAddAccount(createUserSpy);
  return {
    sut,
    createUserSpy
  };
};

describe('RemoteAddAccount', () => {
  test('should call CreateUser with correct params', async () => {
    const { sut, createUserSpy } = makeSut();
    const addAccountParam = mockAddAccount();
    await sut.add(addAccountParam);
    expect(createUserSpy.param).toEqual({
      email: addAccountParam.email,
      password: addAccountParam.password,
      passwordConfirmation: addAccountParam.passwordConfirmation
    });
  });

  test('should throw EmailInUseError CreateUser returns createUser/user-exists', async () => {
    const { sut, createUserSpy } = makeSut();
    createUserSpy.response = {
      statusCode: StatusCode.forbidden
    };
    const promise = sut.add(mockAddAccount());
    await expect(promise).rejects.toThrow(new EmailInUseError());
  });

  test('should throw ServerError CreateUser returns 500 ', async () => {
    const { sut, createUserSpy } = makeSut();
    createUserSpy.response = {
      statusCode: StatusCode.serverError
    };
    const promise = sut.add(mockAddAccount());
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test('should returns an AccountModel if CreateUser returns 200', async () => {
    const { sut, createUserSpy } = makeSut();
    const response = mockAccount();
    createUserSpy.response = {
      statusCode: StatusCode.ok,
      body: response
    };
    const account = await sut.add(mockAddAccount());
    expect(account).toBe(response);
  });
});
