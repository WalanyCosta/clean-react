
import React from 'react';
import { cleanup, fireEvent, render, RenderResult } from '@testing-library/react';
import SignUp from './signup';
import { helper, ValidationStub } from '@/presentation/test';
import faker from '@faker-js/faker';

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

const testButtonNotDisable = (sut: RenderResult, fieldName) : void => {
  const submitButton = sut.getByTestId(fieldName) as HTMLButtonElement;
  expect(submitButton.disabled).toBeFalsy();
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
    testButtonNotDisable(sut, 'submit');
  });
});
