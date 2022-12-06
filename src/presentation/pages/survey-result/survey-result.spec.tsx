import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import SurveyResult from './survey-result';
import { ApiContext } from '@/presentation/context';
import { mockAccount } from '@/domain/test';
import { createMemoryHistory } from 'history';
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import { LoadSurveyResultSpy } from '@/presentation/test';

type SutTypes = {
  loadSurveyResultSpy: LoadSurveyResultSpy
}

const makeSut = () : SutTypes => {
  const loadSurveyResultSpy = new LoadSurveyResultSpy();
  render(
    <ApiContext.Provider value={{
      setCurrentAccount: jest.fn(),
      getCurrentAccount: () => mockAccount()
    }}>
      <HistoryRouter history={createMemoryHistory()}>
        <SurveyResult loadSurveyResult={loadSurveyResultSpy} />
      </HistoryRouter>
    </ApiContext.Provider>
  );
  return {
    loadSurveyResultSpy
  };
};

describe('SurveyResult Component', () => {
  test('should present correct initial state', async () => {
    makeSut();
    const surveyResult = screen.getByTestId('survey-result');
    expect(surveyResult.childElementCount).toBe(0);
    expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
    expect(screen.queryByTestId('error')).not.toBeInTheDocument();
    await waitFor(() => surveyResult);
  });

  test('should call LoadSurveyResult', async () => {
    const { loadSurveyResultSpy } = makeSut();
    await waitFor(() => screen.getByTestId('survey-result'));
    expect(loadSurveyResultSpy.callsCount).toBe(1);
  });
});
