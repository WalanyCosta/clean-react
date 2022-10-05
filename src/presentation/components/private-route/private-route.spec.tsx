import React from 'react';
import { ApiContext } from '@/presentation/context';
import { render, screen } from '@testing-library/react';
import PrivateRoute from './private-route';
import { createMemoryHistory } from 'history';
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';

const makeSut = (account = null): void => {
  const setCurrentAccountMock = jest.fn();
  render(
      <ApiContext.Provider value={{
        setCurrentAccount: setCurrentAccountMock,
        getCurrentAccount: () => account
      }}>
      <HistoryRouter history={createMemoryHistory()}>
       <PrivateRoute />
      </HistoryRouter>
      </ApiContext.Provider>
  );
};

describe('PrivateRoute', () => {
  test('should redirect to / if localStorage has value account', () => {
    const account = {
      accessToken: 'laldadajdaldald',
      email: 'delcio@gmail.com'
    };
    makeSut(account);
    expect(screen.getByTestId('surveyList')).toBeTruthy();
  });
});
