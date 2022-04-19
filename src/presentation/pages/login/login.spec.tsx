import React from 'react';
import 'jest-localstorage-mock';
import { render, RenderResult, fireEvent, cleanup, waitFor } from '@testing-library/react';
import Login from './index';
import { ValidationStub, AuthenticationSpy } from '@/presentation/test';
import faker from '@faker-js/faker';
import { InvalidCredentialsError } from '@/domain/errors';

type SutTypes = {
  sut: RenderResult;
  validationStub?: ValidationStub;
  authenticationSpy: AuthenticationSpy;
}

type SutParams = {
  validationError?: string;
}

const makeSut = (params?: SutParams) : SutTypes => {
  const validationStub = new ValidationStub();
  const authenticationSpy = new AuthenticationSpy();
  validationStub.errorMessage = params?.validationError;
  const sut = render(<Login validation={validationStub} authentication={authenticationSpy} />);
  return {
    sut,
    authenticationSpy
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

const simuteStatusForField = (sut: RenderResult, fieldName, validationError = null) : void => {
  const fieldStatus = sut.getByTestId(`${fieldName}-status`);
  expect(fieldStatus.title).toBe(validationError || 'tudo certo');
  expect(fieldStatus.textContent).toBe(validationError ? '🔴' : '🟢');
};

describe('Login Component', () => {
  afterEach(cleanup);
  beforeEach(() => {
    localStorage.clear();
  });

  test('Should start with initial state', () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });
    const errorWrap = sut.getByTestId('errorWrap');
    expect(errorWrap.childElementCount).toBe(0);
    const submitButton = sut.getByTestId('submit') as HTMLButtonElement;
    expect(submitButton.disabled).toBeTruthy();
    simuteStatusForField(sut, 'email', validationError);
    simuteStatusForField(sut, 'password', validationError);
  });

  test('should show email error if validation fails', () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });
    populateEmailField(sut);
    simuteStatusForField(sut, 'email', validationError);
  });

  test('should show password error if validation fails', () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });
    populatePasswordField(sut);
    simuteStatusForField(sut, 'password', validationError);
  });

  test('should show valid email state if validation succeeds', () => {
    const { sut } = makeSut();
    populateEmailField(sut);
    simuteStatusForField(sut, 'email');
  });

  test('should show valid password state if validation succeeds', () => {
    const { sut } = makeSut();
    populatePasswordField(sut);
    simuteStatusForField(sut, 'password');
  });

  test('should enable submit button if form is valid', () => {
    const { sut } = makeSut();
    populateEmailField(sut);
    populatePasswordField(sut);
    const submitButton = sut.getByTestId('submit') as HTMLButtonElement;
    expect(submitButton.disabled).toBeFalsy();
  });

  test('should show spinner on submit', () => {
    const { sut } = makeSut();
    simulateValidSubmit(sut);
    const spinner = sut.getByTestId('spinner-status');
    expect(spinner).toBeTruthy();
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

  test('should present error if Authentication fails', async () => {
    const { sut, authenticationSpy } = makeSut();
    simulateValidSubmit(sut);
    await waitFor(() => {
      expect(localStorage.setItem).toHaveBeenCalledWith('accessToken', authenticationSpy.account.accessTokes);
    });
  });
});
