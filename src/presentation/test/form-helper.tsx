import faker from '@faker-js/faker';
import { fireEvent, RenderResult } from '@testing-library/react';

export const testChildCount = (sut: RenderResult, field: string, count: number) => {
  const errorWrap = sut.getByTestId(field);
  expect(errorWrap.childElementCount).toBe(count);
};

export const testStatusForField = (sut: RenderResult, fieldName, validationError = null) : void => {
  const fieldStatus = sut.getByTestId(`${fieldName}-status`);
  expect(fieldStatus.title).toBe(validationError || 'tudo certo');
  expect(fieldStatus.textContent).toBe(validationError ? '🔴' : '🟢');
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
