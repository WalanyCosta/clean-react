import React from 'react';
import { render, RenderResult, fireEvent, cleanup } from '@testing-library/react';
import { Validation } from '@/presentation/protocols/validation';
import Login from './index';

class ValidationSpy implements Validation {
  errorMessage: string;
  input: object;

  validate (input: object) : string {
    this.input = input;
    return this.errorMessage;
  }
}

type SutTypes = {
  sut: RenderResult,
  validationSpy?: ValidationSpy;
}

const makeSut = () : SutTypes => {
  const validationSpy = new ValidationSpy();
  const sut = render(<Login validation={validationSpy} />);
  return {
    sut,
    validationSpy
  };
};

describe('Login Component', () => {
  afterEach(cleanup);
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

  test('should call validation with correct email', () => {
    const { sut, validationSpy } = makeSut();
    const emailInput = sut.getByTestId('email');
    fireEvent.input(emailInput, { target: { value: 'any_value' } });
    expect(validationSpy.input).toEqual({
      email: 'any_value'
    });
  });

  test('should call validation with correct password', () => {
    const { sut, validationSpy } = makeSut();
    const passwordInput = sut.getByTestId('password');
    fireEvent.input(passwordInput, { target: { value: 'any_value' } });
    expect(validationSpy.input).toEqual({
      password: 'any_value'
    });
  });
});
