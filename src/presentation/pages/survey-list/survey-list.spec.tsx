import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import SurveyList from './survey-list';
import { LoadSurveyListSpy } from '@/presentation/test/mock-load-survey-list';
import { UnexpectedError } from '@/domain/errors';

type SutTypes = {
  loadSurveyListSpy: LoadSurveyListSpy
}

const makeSut = (loadSurveyListSpy = new LoadSurveyListSpy()): SutTypes => {
  render(<SurveyList loadSurveyList={loadSurveyListSpy}/>);
  return {
    loadSurveyListSpy
  };
};

describe('SurveyList', () => {
  test('should present 4 empty items on start', async () => {
    makeSut();
    const surveyList = screen.getByTestId('survey-list');
    expect(surveyList.querySelectorAll('li:empty')).toHaveLength(4);
    expect(screen.queryByTestId('error')).not.toBeInTheDocument();
  });

  test('should call LoadSurveyList', async () => {
    const { loadSurveyListSpy } = makeSut();
    expect(loadSurveyListSpy.callsCount).toBe(1);
    expect(screen.queryByTestId('error')).not.toBeInTheDocument();
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
});
