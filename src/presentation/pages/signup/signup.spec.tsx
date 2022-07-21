
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

const populateField = (sut: RenderResult, field:string, value = faker.random.word()): void => {
  const input = sut.getByTestId(field);
  fireEvent.input(input, {
    target: {
      value: value
    }
  });
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
    populateField(sut, 'email');
    helper.testStatusForField(sut, 'email', validationError);
  });
});