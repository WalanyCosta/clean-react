import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { createMemoryHistory, MemoryHistory } from 'history';
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import Header from './header';
import { ApiContext } from '@/presentation/context';
import { AccountModel } from '@/domain/model';
import { mockAccount } from '@/domain/test';

type SutTypes ={
  history: MemoryHistory;
  setCurrentAccountMock: (account: AccountModel) => void;
}

const makeSut = (account = mockAccount()): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/'] });
  const setCurrentAccountMock = jest.fn();
  render(
      <ApiContext.Provider value={{
        setCurrentAccount: setCurrentAccountMock,
        getCurrentAccount: () => account
      }}>
      <HistoryRouter history={history}>
        <Header />
      </HistoryRouter>
      </ApiContext.Provider>
  );

  return {
    history,
    setCurrentAccountMock
  };
};

describe('Header Component', () => {
  test('should call setCurrentAccount with null', () => {
    const { history, setCurrentAccountMock } = makeSut();
    fireEvent.click(screen.getByTestId('logout'));
    expect(setCurrentAccountMock).toHaveBeenCalledWith(undefined);
    expect(history.location.pathname).toBe('/login');
  });

  test('should render email currently', () => {
    const account = mockAccount();
    makeSut(account);
    expect(screen.getByTestId('userEmail')).toHaveTextContent(account.email);
  });
});
