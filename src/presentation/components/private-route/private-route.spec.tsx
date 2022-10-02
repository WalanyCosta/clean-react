import React from 'react';
import { ApiContext } from '@/presentation/context';
import { render, screen } from '@testing-library/react';
import PrivateRoute from './private-route';
import { CurrentAccountAdapterMock } from '@/presentation/test/current-account-adapter-mock';
import { createMemoryHistory } from 'history';
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';

describe('PrivateRoute', () => {
  test('should redirect to / if localStorage has value account', () => {
    const currentAccountAdapterMock = new CurrentAccountAdapterMock();
    const setCurrentAccountMock = jest.fn();
    render(
      <ApiContext.Provider value={{
        setCurrentAccount: setCurrentAccountMock,
        getCurrentAccount: currentAccountAdapterMock.getCurrentAccountAdapter
      }}>
      <HistoryRouter history={createMemoryHistory()}>
       <PrivateRoute />
      </HistoryRouter>
      </ApiContext.Provider>
    );

    expect(screen.getByTestId('surveyList')).toBeTruthy();
  });
});
