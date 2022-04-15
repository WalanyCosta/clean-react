import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import Login from './index';

type SutTypes = {
  sut: RenderResult
}

const makeSut = () : SutTypes => {
  const sut = render(<Login/>);

  return {
    sut
  };
};

describe('Login Component', () => {
  test('Should start with initial state', () => {
    const { sut } = makeSut();
    const errorWrap = sut.getByTestId('errorWrap');
    const submitButton = sut.getByTestId('submit') as HTMLButtonElement;
    expect(errorWrap.childElementCount).toBe(0);
    expect(submitButton.disabled).toBeTruthy();
    const emailStatus = sut.getByTestId('email-status');
    expect(emailStatus.title).toBe('campo obrigatório');
    expect(emailStatus.textContent).toBe('🔴');
    const passwordStatus = sut.getByTestId('password-status');
    expect(passwordStatus.title).toBe('campo obrigatório');
    expect(passwordStatus.textContent).toBe('🔴');
  });
});
