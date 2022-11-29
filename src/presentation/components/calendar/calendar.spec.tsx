import React from 'react';
import { render, screen } from '@testing-library/react';
import Calendar from './calendar';

const makeSut = (date: Date): void => {
  render(<Calendar date={date}/>);
};

describe('Calendar Component', () => {
  test('should render with correct values', () => {
    makeSut(new Date('2022-09-27T00:00:00'));
    expect(screen.getByTestId('day')).toHaveTextContent('27');
    expect(screen.getByTestId('month')).toHaveTextContent('set');
    expect(screen.getByTestId('year')).toHaveTextContent('2022');
  });

  test('should render with correct values', () => {
    makeSut(new Date('2021-02-02T00:00:00'));
    expect(screen.getByTestId('day')).toHaveTextContent('02');
    expect(screen.getByTestId('month')).toHaveTextContent('fev');
    expect(screen.getByTestId('year')).toHaveTextContent('2021');
  });
});
