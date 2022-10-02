import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import Header from './header';
import { ApiContext } from '@/presentation/context';

describe('Header Component', () => {
  test('should call setCurrentAccount with null', () => {
    const history = createMemoryHistory({ initialEntries: ['/'] });
    const setCurrentAccountMock = jest.fn();
    render(
      <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountMock }}>
      <HistoryRouter history={history}>
        <Header />
      </HistoryRouter>
      </ApiContext.Provider>
    );
    fireEvent.click(screen.getByTestId('logout'));
    expect(setCurrentAccountMock).toHaveBeenCalledWith(undefined);
    expect(history.location.pathname).toBe('/login');
  });
});
