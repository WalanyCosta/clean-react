import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import List from './list';
import { createMemoryHistory } from 'history';
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import { mockSurveyList } from '@/domain/test';

const makeSut = (surveysArray = []) : void => {
  const state = { surveys: surveysArray };
  render(
    <HistoryRouter history={createMemoryHistory()}>
      <List surveys={state.surveys}/>
    </HistoryRouter>
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
