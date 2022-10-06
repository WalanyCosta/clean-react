import { render, screen } from '@testing-library/react';
import React from 'react';
import { SurveyContext } from '@/presentation/pages/survey-list/components';
import List from './list';

const makeSut = (surveys = []) : void => {
  const state = { surveys };
  render(
    <SurveyContext.Provider value={{ state }}>
      <List />
    </SurveyContext.Provider>
  );
};

describe('List Component', () => {
  test('should render 4 items empty if not value on surveys', () => {
    makeSut();
    const surveyList = screen.getByTestId('survey-list');
    expect(surveyList.querySelectorAll('li:empty')).toHaveLength(4);
  });
});
