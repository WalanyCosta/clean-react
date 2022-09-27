import React from 'react';
import { render, screen } from '@testing-library/react';
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
  test('should present 4 empty items on start', () => {
    makeSut();
    const surveyList = screen.getByTestId('survey-list');
    expect(surveyList.querySelectorAll('li:empty').length).toBe(4);
  });

  test('should call LoadSurveyList', () => {
    const { loadSurveyListSpy } = makeSut();
    expect(loadSurveyListSpy.callsCount).toBe(1);
  });
});
