
import React from 'react';
import faker from '@faker-js/faker';
import { cleanup, fireEvent, render, RenderResult, waitFor } from '@testing-library/react';
import SignUp from './signup';
import { helper, ValidationStub } from '@/presentation/test';

type SutTypes = {
    sut: RenderResult;
}

type SutParams = {
  validationError?: string;
}

const makeSut = (params?: SutParams) : SutTypes => {
  const validationStub = new ValidationStub();
  validationStub.errorMessage = params?.validationError;
  const sut = render(
        <SignUp
          validation = {validationStub}
        />
  );

  return {
    sut
  };
};

const simulateValidSubmit = (sut: RenderResult, email?, password?, passwordConfirmation?) : void => {
  helper.populateField(sut, 'email', email);
  helper.populateField(sut, 'password', password);
  helper.populateField(sut, 'passwordConfirmation', passwordConfirmation);
  const submitButton = sut.getByTestId('submit');
  fireEvent.click(submitButton);
};

const testElementExist = (sut: RenderResult, fieldName) : void => {
  const field = sut.getByTestId(fieldName);
  expect(field).toBeTruthy();
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

  test('should show spinner on submit', () => {
    const { sut } = makeSut();
    simulateValidSubmit(sut);
    waitFor(() => testElementExist(sut, 'spinner-status'));
  });
});
