import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { SurveyContext } from '@/presentation/pages/survey-list/components';
import List from './list';
import { mockSurveyList } from '@/domain/test';

const makeSut = (surveysArray = []) : void => {
  const state = { surveys: surveysArray };
  render(
      <SurveyContext.Provider value={{ state }}>
        <List />
      </SurveyContext.Provider>
  );
};

describe('List Component', () => {
  test('should render 4 items empty if not value on surveys', async () => {
    makeSut();
    const surveyList = screen.getByTestId('survey-list');
    await waitFor(() => expect(surveyList.querySelectorAll('li:empty')).toHaveLength(4));
  });

  test('should render SurveyItems if have values on surveys', async () => {
    makeSut(mockSurveyList());
    const surveyList = screen.getByTestId('survey-list');
    waitFor(() => {
      expect(surveyList.querySelectorAll('li:surveyItemWrap')).toHaveLength(3);
    });
  });
});
