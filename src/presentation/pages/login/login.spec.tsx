import React from 'react';
import { createMemoryHistory } from 'history';
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import Login from './index';
import { ValidationStub, AuthenticationSpy, helper } from '@/presentation/test';
import faker from '@faker-js/faker';
import { InvalidCredentialsError } from '@/domain/errors';
import { ApiContext } from '@/presentation/context';
import { AccountModel } from '@/domain/model';

type SutTypes = {
  authenticationSpy: AuthenticationSpy;
  setCurrentAccountMock: (account: AccountModel) => void;
}

type SutParams = {
  validationError?: string;
}

const history = createMemoryHistory({ initialEntries: ['/login'] });

const makeSut = (params?: SutParams) : SutTypes => {
  const validationStub = new ValidationStub();
  const authenticationSpy = new AuthenticationSpy();
  const setCurrentAccountMock = jest.fn();
  validationStub.errorMessage = params?.validationError;
  render(
    <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountMock }}>
    <HistoryRouter history={history}>
      <Login
          validation={validationStub}
          authentication={authenticationSpy}
        />
    </HistoryRouter>
    </ApiContext.Provider>
  );
  return {
    authenticationSpy,
    setCurrentAccountMock
  };
};

describe('Login Component', () => {
  test('Should start with initial state', () => {
    const validationError = faker.random.words();
    makeSut({ validationError });
    expect(screen.getByTestId('errorWrap').children).toHaveLength(0);
    helper.testStatusForField('email', validationError);
    helper.testStatusForField('password', validationError);
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

  test('should enable submit button if form is valid', () => {
    makeSut();
    helper.populateField('email');
    helper.populateField('password');
    expect(screen.getByTestId('submit')).toBeEnabled();
  });

  test('should show spinner on submit', async () => {
    makeSut();
    await helper.simulateValidSubmit();
    waitFor(() => expect(screen.queryByTestId('spinner-status')).toBeInTheDocument());
  });

  test('should call Authentication with correct values', async () => {
    const { authenticationSpy } = makeSut();
    const email = faker.internet.email();
    const password = faker.internet.password();
    await helper.simulateValidSubmit(email, password);
    waitFor(() => {
      expect(authenticationSpy.params).toEqual({
        email,
        password
      });
    });
  });

  test('should call Authentication only once', async () => {
    const { authenticationSpy } = makeSut();
    helper.simulateValidSubmit();
    helper.simulateValidSubmit();
    waitFor(() => expect(authenticationSpy.callsCount).toBe(1));
  });

  test('should not call Authentication if form is invalid', async () => {
    const validationError = faker.random.words();
    const { authenticationSpy } = makeSut({ validationError });
    await fireEvent.submit(screen.getByTestId('form'));
    waitFor(() => expect(authenticationSpy.callsCount).toBe(0));
  });

  test('should present error if Authentication fails', async () => {
    const error = new InvalidCredentialsError();
    const { authenticationSpy } = makeSut();
    jest.spyOn(authenticationSpy, 'auth').mockRejectedValueOnce(error);
    helper.simulateValidSubmit();
    waitFor(() => {
      expect(screen.getByTestId('mainError')).toHaveTextContent(error.message);
      expect(screen.getByTestId('errorWrap').children).toHaveLength(1);
    });
  });

  test('should calls UpdateCurrentAccount on success', async () => {
    const { authenticationSpy, setCurrentAccountMock } = makeSut();
    helper.simulateValidSubmit();
    waitFor(() => {
      expect(setCurrentAccountMock).toHaveBeenCalledWith(authenticationSpy.account);
      expect(history.location.pathname).toBe('/');
    });
  });

  test('should go to signUp page', async () => {
    makeSut();
    const signupLink = screen.getByTestId('signup-link');
    fireEvent.click(signupLink);
    expect(history.location.pathname).toBe('/signup');
  });
});
