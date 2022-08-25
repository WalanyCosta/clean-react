import faker from '@faker-js/faker';
import { fireEvent, RenderResult } from '@testing-library/react';

export const testChildCount = (sut: RenderResult, field: string, count: number) => {
  const errorWrap = sut.getByTestId(field);
  expect(errorWrap.childElementCount).toBe(count);
};

export const testStatusForField = (sut: RenderResult, fieldName, validationError: string = '') : void => {
  const wrap = sut.getByTestId(`${fieldName}-wrap`);
  const field = sut.getByTestId(fieldName);
  const label = sut.getByTestId(`${fieldName}-label`);
  expect(wrap.getAttribute('data-status')).toBe(validationError ? 'invalid' : 'valid');
  expect(field.title).toBe(validationError);
  expect(label.title).toBe(validationError);
};

export const testButtonDisable = (sut: RenderResult, fieldName) : void => {
  const submitButton = sut.getByTestId(fieldName) as HTMLButtonElement;
  expect(submitButton.disabled).toBeTruthy();
};

export const populateField = (sut: RenderResult, field:string, value = faker.random.word()): void => {
  const input = sut.getByTestId(field);
  fireEvent.input(input, {
    target: {
      value: value
    }
  });
};

export const testButtonNotDisable = (sut: RenderResult, fieldName) : void => {
  const submitButton = sut.getByTestId(fieldName) as HTMLButtonElement;
  expect(submitButton.disabled).toBeFalsy();
};

export const simulateValidSubmit = (sut: RenderResult, email?, password?) : void => {
  populateField(sut, 'email', email);
  populateField(sut, 'password', password);
  const submitButton = sut.getByTestId('submit');
  fireEvent.click(submitButton);
};

export const simulateValidSubmitSignUp = (sut: RenderResult, email?, password?, passwordConfirmation?) : void => {
  populateField(sut, 'email', email);
  populateField(sut, 'password', password);
  populateField(sut, 'passwordConfirmation', passwordConfirmation);
  const submitButton = sut.getByTestId('submit');
  fireEvent.click(submitButton);
};

export const testElementExist = (sut: RenderResult, fieldName) : void => {
  const field = sut.getByTestId(fieldName);
  expect(field).toBeTruthy();
};

export const testElementText = (sut: RenderResult, fieldName, message): void => {
  const field = sut.getByTestId(fieldName);
  expect(field.textContent).toBe(message);
};
