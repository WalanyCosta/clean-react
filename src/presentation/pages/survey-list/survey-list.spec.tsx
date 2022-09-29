import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { LoadSurveyList } from '@/domain/usecases/load-survey-list';
import SurveyList from './survey-list';
import { LoadSurveyListSpy } from '@/presentation/test/mock-load-survey-list';

type SutTypes = {
  loadSurveyListSpy: LoadSurveyListSpy
}

const makeSut = (): SutTypes => {
  const loadSurveyListSpy = new LoadSurveyListSpy();
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
  });

  test('should call LoadSurveyList', async () => {
    const { loadSurveyListSpy } = makeSut();
    expect(loadSurveyListSpy.callsCount).toBe(1);
  });

  test('should render SurveyItems on success', async () => {
    makeSut();
    const surveyList = screen.getByTestId('survey-list');
    waitFor(() => {
      expect(surveyList.querySelectorAll('li:surveyItemWrap')).toHaveLength(3);
    });
  });
});
