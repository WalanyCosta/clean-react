import React from 'react';
import faker from '@faker-js/faker';
import { createMemoryHistory } from 'history';
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import SignUp from './signup';
import { AddAccountSpy, helper, ValidationStub } from '@/presentation/test';
import { EmailInUseError } from '@/domain/errors';
import { AccountModel } from '@/domain/model';
import { ApiContext } from '@/presentation/context';

type SutTypes = {
    addAccountSpy: AddAccountSpy;
    setCurrentAccountMock: (account: AccountModel) => void;
}

type SutParams = {
  validationError?: string;
}

const history = createMemoryHistory({ initialEntries: ['/signup'] });

const makeSut = (params?: SutParams) : SutTypes => {
  const validationStub = new ValidationStub();
  validationStub.errorMessage = params?.validationError;
  const setCurrentAccountMock = jest.fn();
  const addAccountSpy = new AddAccountSpy();
  render(
    <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountMock }}>
      <HistoryRouter history={history}>
          <SignUp
            validation = {validationStub}
            addAccount = {addAccountSpy}
          />
      </HistoryRouter>
    </ApiContext.Provider>
  );

  return {
    addAccountSpy,
    setCurrentAccountMock
  };
};

describe('SignUp Component', () => {
  test('Should start with initial state', () => {
    const validationError = 'campo obrigatório';
    makeSut({ validationError });
    expect(screen.getByTestId('errorWrap').children).toHaveLength(0);
    helper.testStatusForField('email', validationError);
    helper.testStatusForField('password', validationError);
    helper.testStatusForField('passwordConfirmation', validationError);
    expect(screen.getByTestId('submit')).toBeDisabled();
  });

  test('should show email error if validation fails', () => {
    const validationError = faker.random.words();
    makeSut({ validationError });
    helper.populateField('email');
    helper.testStatusForField('email', validationError);
  });

  test('should show password error if validation fails', () => {
    const validationError = faker.random.words();
    makeSut({ validationError });
    helper.populateField('password');
    helper.testStatusForField('password', validationError);
  });

  test('should show passwordConfirmation error if validation fails', () => {
    const validationError = faker.random.words();
    makeSut({ validationError });
    helper.populateField('passwordConfirmation');
    helper.testStatusForField('passwordConfirmation', validationError);
  });

  test('should show valid email state if validation succeeds', () => {
    makeSut();
    helper.populateField('email');
    helper.testStatusForField('email');
  });

  test('should show valid password state if validation succeeds', () => {
    makeSut();
    helper.populateField('password');
    helper.testStatusForField('password');
  });

  test('should show valid passwordConfirmation state if validation succeeds', () => {
    makeSut();
    helper.populateField('passwordConfirmation');
    helper.testStatusForField('passwordConfirmation');
  });

  test('should enable submit button if form is valid', () => {
    makeSut();
    helper.populateField('email');
    helper.populateField('password');
    expect(screen.getByTestId('submit')).toBeEnabled();
  });

  test('should show spinner on submit', async () => {
    makeSut();
    helper.simulateValidSubmitSignUp();
    waitFor(() => expect(screen.queryByTestId('spinner-status')).toBeInTheDocument());
  });

  test('should call addAccountSpy with correct values', async () => {
    const { addAccountSpy } = makeSut();
    const email = faker.internet.email();
    const password = faker.internet.password();
    helper.simulateValidSubmit(email, password);
    waitFor(() => {
      expect(addAccountSpy.param).toEqual({
        email,
        password
      });
    });
  });

  test('should call addAccount only once', async () => {
    const { addAccountSpy } = makeSut();
    await helper.simulateValidSubmit();
    await helper.simulateValidSubmit();
    waitFor(() => expect(addAccountSpy.callsCount).toBe(1));
  });

  test('should not call addAccount if form is invalid', async () => {
    const validationError = faker.random.words();
    const { addAccountSpy } = makeSut({ validationError });
    await fireEvent.submit(screen.getByTestId('form'));
    waitFor(() => expect(addAccountSpy.callsCount).toBe(0));
  });

  test('should present error if addAccount fails', async () => {
    const error = new EmailInUseError();
    const { addAccountSpy } = makeSut();
    jest.spyOn(addAccountSpy, 'add').mockRejectedValueOnce(error);
    await helper.simulateValidSubmitSignUp();
    waitFor(() => {
      expect(screen.getByTestId('mainError')).toHaveTextContent(error.message);
      expect(screen.getByTestId('errorWrap').children).toHaveLength(1);
    });
  });

  test('should calls SaveAccessToKen on success', async () => {
    const { addAccountSpy, setCurrentAccountMock } = makeSut();
    await helper.simulateValidSubmit();
    waitFor(() => {
      expect(setCurrentAccountMock).toHaveBeenCalledWith(addAccountSpy.account);
      expect(history.location.pathname).toBe('/');
    });
  });

  test('should go to login page', async () => {
    makeSut();
    const loginLink = screen.getByTestId('login-link');
    fireEvent.click(loginLink);
    expect(history.location.pathname).toBe('/login');
  });
});
