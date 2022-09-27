import React from 'react';
import { render, screen } from '@testing-library/react';
import SurveyItem from './survey-item';
import { mockSurveyModel } from '@/domain/test';
import { IconName } from '@/presentation/components';

describe('SurveyItem Component', () => {
  test('should render with correct values', () => {
    const survey = mockSurveyModel();
    survey.didAnswer = true;
    survey.date = new Date('2022-09-27T00:00:00');
    render(<SurveyItem survey={survey}/>);
    expect(screen.getByTestId('icon')).toHaveProperty('src', IconName.thumbUp);
    expect(screen.getByTestId('question')).toHaveTextContent(survey.question);
    expect(screen.getByTestId('day')).toHaveTextContent('27');
    expect(screen.getByTestId('month')).toHaveTextContent('set');
    expect(screen.getByTestId('year')).toHaveTextContent('2022');
  });
});
