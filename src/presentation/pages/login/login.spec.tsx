import React from 'react';
import { render, RenderResult, fireEvent, cleanup } from '@testing-library/react';
import Login from './index';
import { ValidationSpy } from '@/presentation/test';
import fake from '@faker-js/faker';

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
    const email = fake.internet.email();
    fireEvent.input(emailInput, { target: { value: email } });
    expect(validationSpy.fieldName).toBe('email');
    expect(validationSpy.fieldValue).toBe(email);
  });

  test('should call validation with correct password', () => {
    const { sut, validationSpy } = makeSut();
    const passwordInput = sut.getByTestId('password');
    const password = fake.internet.password();
    fireEvent.input(passwordInput, { target: { value: password } });
    expect(validationSpy.fieldName).toBe('password');
    expect(validationSpy.fieldValue).toBe(password);
  });
});
