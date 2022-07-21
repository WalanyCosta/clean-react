
import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import SignUp from './signup';
import { helper } from '@/presentation/test';

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

describe('SignUp Component', () => {
  test('Should start with initial state', () => {
    const validationError = 'campo obrigatório';
    const { sut } = makeSut();
    helper.testChildCount(sut, 'errorWrap', 0);
    helper.testButtonDisable(sut, 'submit');
    helper.testStatusForField(sut, 'email', validationError);
    helper.testStatusForField(sut, 'password', validationError);
    helper.testStatusForField(sut, 'passwordConfirmation', validationError);
  });
});
