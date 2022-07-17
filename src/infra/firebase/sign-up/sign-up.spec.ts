import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';

import { mockAddAccount } from '@/domain/test';
import { SignUp } from './signUp';

jest.mock('firebase/auth', () => {
  return {
    getAuth: jest.fn(),
    createUserWithEmailAndPassword: jest.fn()
  };
});

describe('SignUp', () => {
  test('should calls createUserWithEmailAndPassword with correct values', async () => {
    const mockedCreateUser = createUserWithEmailAndPassword as jest.Mock<any, any>;
    const sut = new SignUp();
    const addAccountParam = mockAddAccount();
    await sut.signUp(addAccountParam);
    expect(mockedCreateUser).toHaveBeenCalledWith(
      getAuth(),
      addAccountParam.email,
      addAccountParam.passwordConfirmation);
  });
});
