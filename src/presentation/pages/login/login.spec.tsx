import React from 'react';
import { render } from '@testing-library/react';
import Login from './index';

describe('Login Component', () => {
  test('Should start with initial state', () => {
    const { getByTestId } = render(<Login/>);
    const errorWrap = getByTestId('errorWrap');
    const submitButton = getByTestId('submit') as HTMLButtonElement;
    expect(errorWrap.childElementCount).toBe(0);
    expect(submitButton.disabled).toBeTruthy();
  });
});
