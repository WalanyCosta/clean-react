import React from 'react';
import { render, screen } from '@testing-library/react';
import SurveyResult from './survey-result';
import { ApiContext } from '@/presentation/context';
import { mockAccount } from '@/domain/test';
import { createMemoryHistory } from 'history';
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';

describe('SurveyResult Component', () => {
  test('should present correct initial state', () => {
    render(
        <ApiContext.Provider value={{
          setCurrentAccount: jest.fn(),
          getCurrentAccount: () => mockAccount()
        }}>
          <HistoryRouter history={createMemoryHistory()}>
          <SurveyResult />
          </HistoryRouter>
        </ApiContext.Provider>
    );
    const surveyResult = screen.getByTestId('survey-result');
    expect(surveyResult.childElementCount).toBe(0);
    expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
    expect(screen.queryByTestId('error')).not.toBeInTheDocument();
  });
});
