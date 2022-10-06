import { render, screen } from '@testing-library/react';
import React, { useState } from 'react';
import List from './list';
import { SurveyContext } from '@/presentation/pages/survey-list/components';

describe('List Component', () => {
  test('should render 4 items empty if not value on surveys', () => {
    render(
      <SurveyContext.Provider value={{ state: { surveys: [] } }}>
        <List />
      </SurveyContext.Provider>
    );
    const surveyList = screen.getByTestId('survey-list');
    expect(surveyList.querySelectorAll('li:empty')).toHaveLength(4);
  });
});
