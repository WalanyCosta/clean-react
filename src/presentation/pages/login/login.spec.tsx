import React from 'react';
import { createMemoryHistory } from 'history';
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import { render, RenderResult, fireEvent, cleanup, waitFor } from '@testing-library/react';
import Login from './index';
import { ValidationStub, AuthenticationSpy, SaveAccessTokenMock } from '@/presentation/test';
import faker from '@faker-js/faker';
import { InvalidCredentialsError } from '@/domain/errors';

type SutTypes = {
  sut: RenderResult;
  validationStub?: ValidationStub;
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

const simulateValidSubmit = (sut: RenderResult, email?, password?) : void => {
  populateEmailField(sut, email);
  populatePasswordField(sut, password);
  const submitButton = sut.getByTestId('submit');
  fireEvent.click(submitButton);
};

const populateEmailField = (sut: RenderResult, email = faker.internet.email()): void => {
  const emailInput = sut.getByTestId('email');
  fireEvent.input(emailInput, {
    target: {
      value: email
    }
  });
};

const populatePasswordField = (sut: RenderResult, password = faker.internet.password()): void => {
  const emailInput = sut.getByTestId('password');
  fireEvent.input(emailInput, {
    target: {
      value: password
    }
  });
};

const testStatusForField = (sut: RenderResult, fieldName, validationError = null) : void => {
  const fieldStatus = sut.getByTestId(`${fieldName}-status`);
  expect(fieldStatus.title).toBe(validationError || 'tudo certo');
  expect(fieldStatus.textContent).toBe(validationError ? '🔴' : '🟢');
};

const testElementExist = (sut: RenderResult, fieldName) : void => {
  const field = sut.getByTestId(fieldName);
  expect(field).toBeTruthy();
};

const testButtonDisable = (sut: RenderResult, fieldName) : void => {
  const submitButton = sut.getByTestId(fieldName) as HTMLButtonElement;
  expect(submitButton.disabled).toBeTruthy();
};

const testButtonNotDisable = (sut: RenderResult, fieldName) : void => {
  const submitButton = sut.getByTestId(fieldName) as HTMLButtonElement;
  expect(submitButton.disabled).toBeFalsy();
};

describe('Login Component', () => {
  afterEach(cleanup);

  test('Should start with initial state', () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });
    const errorWrap = sut.getByTestId('errorWrap');
    expect(errorWrap.childElementCount).toBe(0);
    testButtonDisable(sut, 'submit');
    testStatusForField(sut, 'email', validationError);
    testStatusForField(sut, 'password', validationError);
  });

  test('should show email error if validation fails', () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });
    populateEmailField(sut);
    testStatusForField(sut, 'email', validationError);
  });

  test('should show password error if validation fails', () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });
    populatePasswordField(sut);
    testStatusForField(sut, 'password', validationError);
  });

  test('should show valid email state if validation succeeds', () => {
    const { sut } = makeSut();
    populateEmailField(sut);
    testStatusForField(sut, 'email');
  });

  test('should show valid password state if validation succeeds', () => {
    const { sut } = makeSut();
    populatePasswordField(sut);
    testStatusForField(sut, 'password');
  });

  test('should enable submit button if form is valid', () => {
    const { sut } = makeSut();
    populateEmailField(sut);
    populatePasswordField(sut);
    testButtonNotDisable(sut, 'submit');
  });

  test('should show spinner on submit', () => {
    const { sut } = makeSut();
    simulateValidSubmit(sut);
    testElementExist(sut, 'spinner-status');
  });

  test('should call Authentication with correct values', () => {
    const { sut, authenticationSpy } = makeSut();
    const email = faker.internet.email();
    const password = faker.internet.password();
    simulateValidSubmit(sut, email, password);
    expect(authenticationSpy.params).toEqual({
      email,
      password
    });
  });

  test('should call Authentication only once', () => {
    const { sut, authenticationSpy } = makeSut();
    simulateValidSubmit(sut);
    simulateValidSubmit(sut);
    expect(authenticationSpy.callsCount).toBe(1);
  });

  test('should not call Authentication if form is invalid', () => {
    const validationError = faker.random.words();
    const { sut, authenticationSpy } = makeSut({ validationError });
    fireEvent.submit(sut.getByTestId('form'));
    expect(authenticationSpy.callsCount).toBe(0);
  });

  test('should present error if Authentication fails', async () => {
    const error = new InvalidCredentialsError();
    const { sut, authenticationSpy } = makeSut();
    jest.spyOn(authenticationSpy, 'auth').mockReturnValueOnce(Promise.reject(error));
    simulateValidSubmit(sut);
    const errorWrap = sut.getByTestId('errorWrap');
    await waitFor(() => {
      expect(sut.getByTestId('mainError').textContent).toBe(error.message);
      expect(errorWrap.childElementCount).toBe(1);
    });
  });

  test('should calls SaveAccessToKen on success', async () => {
    const { sut, authenticationSpy, saveAccessTokenMock } = makeSut();
    simulateValidSubmit(sut);
    await waitFor(() => {
      expect(saveAccessTokenMock.value).toBe(authenticationSpy.account.accessTokes);
      expect(history.location.pathname).toBe('/');
    });
  });

  test('should present error if SaveAccessToKen fails', async () => {
    const error = new InvalidCredentialsError();
    const { sut, saveAccessTokenMock } = makeSut();
    jest.spyOn(saveAccessTokenMock, 'save').mockReturnValueOnce(Promise.reject(error));
    simulateValidSubmit(sut);
    const errorWrap = sut.getByTestId('errorWrap');
    await waitFor(() => {
      expect(sut.getByTestId('mainError').textContent).toBe(error.message);
      expect(errorWrap.childElementCount).toBe(1);
    });
  });

  test('should go to signUp page', async () => {
    const { sut } = makeSut();
    const register = sut.getByTestId('register');
    fireEvent.click(register);
    expect(history.location.pathname).toBe('/signUp');
  });
});
