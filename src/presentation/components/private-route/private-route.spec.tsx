import React from 'react';
import { ApiContext } from '@/presentation/context';
import { render, screen } from '@testing-library/react';
import PrivateRoute from './private-route';
import { CurrentAccountAdapterMock } from '@/presentation/test/current-account-adapter-mock';

describe('PrivateRoute', () => {
  test('should redirect to / if localStorage has value account', () => {
    const currentAccountAdapterMock = new CurrentAccountAdapterMock();
    render(
      <ApiContext.Provider value={{
        setCurrentAccount: null,
        getCurrentAccount: currentAccountAdapterMock.getCurrentAccountAdapter
      }}>
       <PrivateRoute />
      </ApiContext.Provider>
    );

    expect(screen.getByTestId('surveyList')).toBeTruthy();
  });
});
