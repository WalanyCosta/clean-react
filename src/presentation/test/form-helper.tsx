import faker from '@faker-js/faker';
import { fireEvent, screen } from '@testing-library/react';

export const testChildCount = (field: string, count: number) => {
  const errorWrap = screen.getByTestId(field);
  expect(errorWrap.childElementCount).toBe(count);
};

export const testStatusForField = (fieldName, validationError: string = '') : void => {
  const wrap = screen.getByTestId(`${fieldName}-wrap`);
  const field = screen.getByTestId(fieldName);
  const label = screen.getByTestId(`${fieldName}-label`);
  expect(wrap.getAttribute('data-status')).toBe(validationError ? 'invalid' : 'valid');
  expect(field.title).toBe(validationError);
  expect(label.title).toBe(validationError);
};

export const testButtonDisable = (fieldName) : void => {
  const submitButton = screen.getByTestId(fieldName) as HTMLButtonElement;
  expect(submitButton.disabled).toBeTruthy();
};

export const populateField = (field:string, value = faker.random.word()): void => {
  const input = screen.getByTestId(field);
  fireEvent.input(input, {
    target: {
      value: value
    }
  });
};

export const testButtonNotDisable = (fieldName) : void => {
  const submitButton = screen.getByTestId(fieldName) as HTMLButtonElement;
  expect(submitButton.disabled).toBeFalsy();
};

export const simulateValidSubmit = (email?, password?) : void => {
  populateField('email', email);
  populateField('password', password);
  const submitButton = screen.getByTestId('submit');
  fireEvent.click(submitButton);
};

export const simulateValidSubmitSignUp = (email?, password?, passwordConfirmation?) : void => {
  populateField('email', email);
  populateField('password', password);
  populateField('passwordConfirmation', passwordConfirmation);
  const submitButton = screen.getByTestId('submit');
  fireEvent.click(submitButton);
};

export const testElementExist = (fieldName) : void => {
  const field = screen.getByTestId(fieldName);
  expect(field).toBeTruthy();
};

export const testElementText = (fieldName, message): void => {
  const field = screen.getByTestId(fieldName);
  expect(field.textContent).toBe(message);
};
