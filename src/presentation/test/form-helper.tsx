import faker from '@faker-js/faker';
import { fireEvent, screen } from '@testing-library/react';

export const testStatusForField = (fieldName, validationError: string = '') : void => {
  const wrap = screen.getByTestId(`${fieldName}-wrap`);
  const field = screen.getByTestId(fieldName);
  const label = screen.getByTestId(`${fieldName}-label`);
  expect(wrap).toHaveAttribute('data-status', validationError ? 'invalid' : 'valid');
  expect(field).toHaveProperty('title', validationError);
  expect(label).toHaveProperty('title', validationError);
};

export const populateField = (field:string, value = faker.random.word()): void => {
  const input = screen.getByTestId(field);
  fireEvent.input(input, {
    target: {
      value: value
    }
  });
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
