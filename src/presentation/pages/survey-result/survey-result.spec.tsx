import React from 'react';
import { queryAllByTestId, render, screen, waitFor } from '@testing-library/react';
import SurveyResult from './survey-result';
import { ApiContext } from '@/presentation/context';
import { mockAccount } from '@/domain/test';
import { createMemoryHistory } from 'history';
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import { LoadSurveyResultSpy, mockSurveyResultModel } from '@/presentation/test';

type SutTypes = {
  loadSurveyResultSpy: LoadSurveyResultSpy
}

const makeSut = (surveyResult = mockSurveyResultModel()) : SutTypes => {
  const loadSurveyResultSpy = new LoadSurveyResultSpy();
  loadSurveyResultSpy.surveyResult = surveyResult;

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

  test('should present SurveyResult data on success', async () => {
    const surveyResult = Object.assign(mockSurveyResultModel(), {
      date: new Date('2022-09-27T00:00:00')
    });
    makeSut(surveyResult);
    await waitFor(() => {
      expect(screen.getByTestId('day')).toHaveTextContent('27');
      expect(screen.getByTestId('month')).toHaveTextContent('set');
      expect(screen.getByTestId('year')).toHaveTextContent('2022');
      expect(screen.getByTestId('question')).toHaveTextContent(surveyResult.question);
      expect(screen.getByTestId('answers').childElementCount).toBe(2);
      const answersWrap = screen.queryAllByTestId('answer-wrap');
      expect(answersWrap[0]).toHaveClass('active');
      expect(answersWrap[1]).not.toHaveClass('active');
      const images = screen.queryAllByTestId('image');
      expect(images[0]).toHaveAttribute('src', surveyResult.answers[0].image);
      expect(images[0]).toHaveAttribute('alt', surveyResult.answers[0].answer);
      expect(images[1]).toBeFalsy();
      const answers = screen.queryAllByTestId('answer');
      expect(answers[0]).toHaveTextContent(surveyResult.answers[0].answer);
      expect(answers[1]).toHaveTextContent(surveyResult.answers[1].answer);
      const percents = screen.queryAllByTestId('percent');
      expect(percents[0]).toHaveTextContent(`${surveyResult.answers[0].percent}%`);
      expect(percents[1]).toHaveTextContent(`${surveyResult.answers[1].percent}%`);
    });
  });
});
