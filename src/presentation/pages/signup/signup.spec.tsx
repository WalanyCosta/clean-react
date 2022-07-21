
import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import SignUp from './signup';
import faker from '@faker-js/faker';

type SutTypes = {
    sut: RenderResult;
}

const makeSut = () : SutTypes => {
  const sut = render(
        <SignUp />
  );

  return {
    sut
  };
};

const testChildCount = (sut: RenderResult, field: string, count: number) => {
  const errorWrap = sut.getByTestId(field);
  expect(errorWrap.childElementCount).toBe(count);
};

const testStatusForField = (sut: RenderResult, fieldName, validationError = null) : void => {
  const fieldStatus = sut.getByTestId(`${fieldName}-status`);
  expect(fieldStatus.title).toBe(validationError || 'tudo certo');
  expect(fieldStatus.textContent).toBe(validationError ? '🔴' : '🟢');
};

const testButtonDisable = (sut: RenderResult, fieldName) : void => {
  const submitButton = sut.getByTestId(fieldName) as HTMLButtonElement;
  expect(submitButton.disabled).toBeTruthy();
};

describe('SignUp Component', () => {
  test('Should start with initial state', () => {
    const validationError = 'campo obrigatório';
    const { sut } = makeSut();
    testChildCount(sut, 'errorWrap', 0);
    testButtonDisable(sut, 'submit');
    testStatusForField(sut, 'email', validationError);
    testStatusForField(sut, 'password', validationError);
    testStatusForField(sut, 'passwordConfirmation', validationError);
  });
});
