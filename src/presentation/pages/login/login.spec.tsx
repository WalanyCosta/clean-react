import React from 'react';
import { render } from '@testing-library/react';
import Login from './index';

describe('Login Component', () => {
  test('Should not render spinner and error on start', () => {
    const { getByTestId } = render(<Login/>);
    const errorWrap = getByTestId('errorWrap');
    expect(errorWrap.childElementCount).toBe(0);
  });
});
