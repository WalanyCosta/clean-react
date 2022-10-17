import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import SurveyList from './survey-list';
import { LoadSurveyListSpy } from '@/presentation/test/mock-load-survey-list';
import { UnexpectedError } from '@/domain/errors';
import { createMemoryHistory } from 'history';
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import { ApiContext } from '@/presentation/context';
import { mockAccount } from '@/domain/test';

type SutTypes = {
  loadSurveyListSpy: LoadSurveyListSpy
}

const makeSut = (loadSurveyListSpy = new LoadSurveyListSpy()): SutTypes => {
  const setCurrentAccountMock = jest.fn();
  render(
    <ApiContext.Provider value={{
      setCurrentAccount: setCurrentAccountMock,
      getCurrentAccount: () => mockAccount()
    }}>
    <HistoryRouter history={createMemoryHistory()}>
      <SurveyList loadSurveyList={loadSurveyListSpy}/>
    </HistoryRouter>
    </ApiContext.Provider>
  );
  return {
    loadSurveyListSpy
  };
};

describe('SurveyList', () => {
  test('should present 4 empty items on start', async () => {
    makeSut();
    const surveyList = screen.getByTestId('survey-list');
    await waitFor(() => {
      expect(surveyList.querySelectorAll('li:empty')).toHaveLength(4);
      expect(screen.queryByTestId('error')).not.toBeInTheDocument();
    });
  });

  test('should call LoadSurveyList', async () => {
    const { loadSurveyListSpy } = makeSut();
    expect(loadSurveyListSpy.callsCount).toBe(1);
    await waitFor(() => {
      expect(screen.queryByTestId('error')).not.toBeInTheDocument();
    });
  });

  test('should render SurveyItems on success', async () => {
    makeSut();
    const surveyList = screen.getByTestId('survey-list');
    waitFor(() => {
      expect(surveyList.querySelectorAll('li:surveyItemWrap')).toHaveLength(3);
      expect(screen.queryByTestId('error')).not.toBeInTheDocument();
    });
  });

  test('should render error on failure', async () => {
    const loadSurveyListSpy = new LoadSurveyListSpy();
    const error = new UnexpectedError();
    jest.spyOn(loadSurveyListSpy, 'loadAll').mockRejectedValueOnce(error);
    makeSut(loadSurveyListSpy);
    waitFor(() => {
      expect(screen.queryByTestId('survey-list')).not.toBeInTheDocument();
      expect(screen.getByTestId('error')).toHaveTextContent(error.message);
    });
  });

  test('should call LoadSurveyList on reload', async () => {
    const loadSurveyListSpy = new LoadSurveyListSpy();
    jest.spyOn(loadSurveyListSpy, 'loadAll').mockRejectedValueOnce(new UnexpectedError());
    makeSut(loadSurveyListSpy);
    waitFor(() => {
      fireEvent.click(screen.getByTestId('reload'));
      expect(loadSurveyListSpy.callsCount).toBe(1);
    });
  });
});
