import React from 'react';
import { createMemoryHistory } from 'history';
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import { render, RenderResult, fireEvent, cleanup, waitFor } from '@testing-library/react';
import Login from './index';
import { ValidationStub, AuthenticationSpy, SaveAccessTokenMock, helper } from '@/presentation/test';
import faker from '@faker-js/faker';
import { InvalidCredentialsError } from '@/domain/errors';

type SutTypes = {
  sut: RenderResult;
  authenticationSpy: AuthenticationSpy;
  saveAccessTokenMock: SaveAccessTokenMock;
}

type SutParams = {
  validationError?: string;
}

const history = createMemoryHistory({ initialEntries: ['/login'] });

const makeSut = (params?: SutParams) : SutTypes => {
  const validationStub = new ValidationStub();
  const authenticationSpy = new AuthenticationSpy();
  const saveAccessTokenMock = new SaveAccessTokenMock();
  validationStub.errorMessage = params?.validationError;
  const sut = render(
    <HistoryRouter history={history}>
      <Login
          validation={validationStub}
          authentication={authenticationSpy}
          saveAccessToken={saveAccessTokenMock}
        />
    </HistoryRouter>
  );
  return {
    sut,
    authenticationSpy,
    saveAccessTokenMock
  };
};

describe('Login Component', () => {
  afterEach(cleanup);

  test('Should start with initial state', () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });
    helper.testChildCount(sut, 'errorWrap', 0);
    helper.testButtonDisable(sut, 'submit');
    helper.testStatusForField(sut, 'email', validationError);
    helper.testStatusForField(sut, 'password', validationError);
  });

  test('should show email error if validation fails', () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });
    helper.populateField(sut, 'email');
    helper.testStatusForField(sut, 'email', validationError);
  });

  test('should show password error if validation fails', () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });
    helper.populateField(sut, 'password');
    helper.testStatusForField(sut, 'password', validationError);
  });

  test('should show valid email state if validation succeeds', () => {
    const { sut } = makeSut();
    helper.populateField(sut, 'email');
    helper.testStatusForField(sut, 'email');
  });

  test('should show valid password state if validation succeeds', () => {
    const { sut } = makeSut();
    helper.populateField(sut, 'password');
    helper.testStatusForField(sut, 'password');
  });

  test('should enable submit button if form is valid', () => {
    const { sut } = makeSut();
    helper.populateField(sut, 'email');
    helper.populateField(sut, 'password');
    helper.testButtonNotDisable(sut, 'submit');
  });

  test('should show spinner on submit', async () => {
    const { sut } = makeSut();
    await helper.simulateValidSubmit(sut);
    await helper.testElementExist(sut, 'spinner-status');
  });

  test('should call Authentication with correct values', async () => {
    const { sut, authenticationSpy } = makeSut();
    const email = faker.internet.email();
    const password = faker.internet.password();
    await helper.simulateValidSubmit(sut, email, password);
    waitFor(() => {
      expect(authenticationSpy.params).toEqual({
        email,
        password
      });
    });
  });

  test('should call Authentication only once', async () => {
    const { sut, authenticationSpy } = makeSut();
    await helper.simulateValidSubmit(sut);
    await helper.simulateValidSubmit(sut);
    waitFor(() => expect(authenticationSpy.callsCount).toBe(1));
  });

  test('should not call Authentication if form is invalid', async () => {
    const validationError = faker.random.words();
    const { sut, authenticationSpy } = makeSut({ validationError });
    await fireEvent.submit(sut.getByTestId('form'));
    waitFor(() => expect(authenticationSpy.callsCount).toBe(0));
  });

  test('should present error if Authentication fails', async () => {
    const error = new InvalidCredentialsError();
    const { sut, authenticationSpy } = makeSut();
    jest.spyOn(authenticationSpy, 'auth').mockRejectedValueOnce(error);
    helper.simulateValidSubmit(sut);
    await waitFor(() => {
      helper.testElementText(sut, 'mainError', error.message);
      helper.testChildCount(sut, 'errorWrap', 1);
    });
  });

  test('should calls SaveAccessToKen on success', async () => {
    const { sut, authenticationSpy, saveAccessTokenMock } = makeSut();
    helper.simulateValidSubmit(sut);
    await waitFor(() => {
      expect(saveAccessTokenMock.value).toBe(authenticationSpy.account.accessTokes);
      expect(history.location.pathname).toBe('/');
    });
  });

  test('should present error if SaveAccessToKen fails', async () => {
    const error = new InvalidCredentialsError();
    const { sut, saveAccessTokenMock } = makeSut();
    jest.spyOn(saveAccessTokenMock, 'save').mockRejectedValueOnce(error);
    helper.simulateValidSubmit(sut);
    await waitFor(() => {
      helper.testElementText(sut, 'mainError', error.message);
      helper.testChildCount(sut, 'errorWrap', 1);
    });
  });

  test('should go to signUp page', async () => {
    const { sut } = makeSut();
    const register = sut.getByTestId('register');
    fireEvent.click(register);
    expect(history.location.pathname).toBe('/signUp');
  });
});
