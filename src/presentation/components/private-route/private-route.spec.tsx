import React from 'react';
import { ApiContext } from '@/presentation/context';
import { render } from '@testing-library/react';
import PrivateRoute from './private-route';
import { CurrentAccountAdapterMock } from '@/presentation/test/current-account-adapter-mock';

describe('PrivateRoute', () => {
  test('should redirect to / if localStorage has value account', () => {
    const currentAccountAdapterMock = new CurrentAccountAdapterMock();
    const login = render(
      <ApiContext.Provider value={{
        setCurrentAccount: null,
        getCurrentAccount: currentAccountAdapterMock.getCurrentAccountAdapter
      }}>
       <PrivateRoute />
      </ApiContext.Provider>
    );

    expect(login.getByTestId('surveyList')).toBeTruthy();
  });
});
