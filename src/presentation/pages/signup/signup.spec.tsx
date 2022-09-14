import React from 'react';
import faker from '@faker-js/faker';
import { createMemoryHistory } from 'history';
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import { cleanup, fireEvent, render, RenderResult, waitFor } from '@testing-library/react';
import SignUp from './signup';
import { AddAccountSpy, helper, UpdateCurrentAccountMock, ValidationStub } from '@/presentation/test';
import { EmailInUseError } from '@/domain/errors';

type SutTypes = {
    sut: RenderResult;
    addAccountSpy: AddAccountSpy;
    updateCurrentAccountMock: UpdateCurrentAccountMock;
}

type SutParams = {
  validationError?: string;
}

const history = createMemoryHistory({ initialEntries: ['/signup'] });

const makeSut = (params?: SutParams) : SutTypes => {
  const validationStub = new ValidationStub();
  validationStub.errorMessage = params?.validationError;
  const updateCurrentAccountMock = new UpdateCurrentAccountMock();
  const addAccountSpy = new AddAccountSpy();
  const sut = render(
    <HistoryRouter history={history}>
        <SignUp
          validation = {validationStub}
          addAccount = {addAccountSpy}
          updateCurrentAccount ={updateCurrentAccountMock}
        />
    </HistoryRouter>
  );

  return {
    sut,
    addAccountSpy,
    updateCurrentAccountMock
  };
};

describe('SignUp Component', () => {
  afterEach(cleanup);

  test('Should start with initial state', () => {
    const validationError = 'campo obrigatório';
    const { sut } = makeSut({ validationError });
    helper.testChildCount(sut, 'errorWrap', 0);
    helper.testButtonDisable(sut, 'submit');
    helper.testStatusForField(sut, 'email', validationError);
    helper.testStatusForField(sut, 'password', validationError);
    helper.testStatusForField(sut, 'passwordConfirmation', validationError);
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

  test('should show passwordConfirmation error if validation fails', () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });
    helper.populateField(sut, 'passwordConfirmation');
    helper.testStatusForField(sut, 'passwordConfirmation', validationError);
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

  test('should show valid passwordConfirmation state if validation succeeds', () => {
    const { sut } = makeSut();
    helper.populateField(sut, 'passwordConfirmation');
    helper.testStatusForField(sut, 'passwordConfirmation');
  });

  test('should enable submit button if form is valid', () => {
    const { sut } = makeSut();
    helper.populateField(sut, 'email');
    helper.populateField(sut, 'password');
    helper.testButtonNotDisable(sut, 'submit');
  });

  test('should show spinner on submit', async () => {
    const { sut } = makeSut();
    await helper.simulateValidSubmitSignUp(sut);
    waitFor(() => {
      helper.testElementExist(sut, 'spinner-status');
    });
  });

  test('should call addAccountSpy with correct values', async () => {
    const { sut, addAccountSpy } = makeSut();
    const email = faker.internet.email();
    const password = faker.internet.password();
    await helper.simulateValidSubmit(sut, email, password);
    waitFor(() => {
      expect(addAccountSpy.param).toEqual({
        email,
        password
      });
    });
  });

  test('should call addAccount only once', async () => {
    const { sut, addAccountSpy } = makeSut();
    await helper.simulateValidSubmit(sut);
    await helper.simulateValidSubmit(sut);
    waitFor(() => expect(addAccountSpy.callsCount).toBe(1));
  });

  test('should not call addAccount if form is invalid', async () => {
    const validationError = faker.random.words();
    const { sut, addAccountSpy } = makeSut({ validationError });
    await fireEvent.submit(sut.getByTestId('form'));
    waitFor(() => expect(addAccountSpy.callsCount).toBe(0));
  });

  test('should present error if addAccount fails', async () => {
    const error = new EmailInUseError();
    const { sut, addAccountSpy } = makeSut();
    jest.spyOn(addAccountSpy, 'add').mockRejectedValueOnce(error);
    await helper.simulateValidSubmitSignUp(sut);
    waitFor(() => {
      helper.testElementText(sut, 'mainError', error.message);
      helper.testChildCount(sut, 'errorWrap', 1);
    });
  });

  test('should calls SaveAccessToKen on success', async () => {
    const { sut, addAccountSpy, updateCurrentAccountMock } = makeSut();
    await helper.simulateValidSubmit(sut);
    waitFor(() => {
      expect(updateCurrentAccountMock.value).toEqual(addAccountSpy.account);
      expect(history.location.pathname).toBe('/');
    });
  });

  test('should present error if SaveAccessToKen fails', async () => {
    const error = new EmailInUseError();
    const { sut, updateCurrentAccountMock } = makeSut();
    jest.spyOn(updateCurrentAccountMock, 'save').mockRejectedValueOnce(error);
    await helper.simulateValidSubmit(sut);
    waitFor(() => {
      helper.testElementText(sut, 'mainError', error.message);
      helper.testChildCount(sut, 'errorWrap', 1);
    });
  });

  test('should go to login page', async () => {
    const { sut } = makeSut();
    const loginLink = sut.getByTestId('login-link');
    fireEvent.click(loginLink);
    expect(history.location.pathname).toBe('/login');
  });
});
