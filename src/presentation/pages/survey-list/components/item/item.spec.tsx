import React from 'react';
import { render, screen } from '@testing-library/react';
import SurveyItem from './item';
import { mockSurveyModel } from '@/domain/test';
import { IconName } from '@/presentation/components';

const makeSut = (survey = mockSurveyModel()): void => {
  render(<SurveyItem survey={survey}/>);
};

describe('SurveyItem Component', () => {
  test('should render with correct values', () => {
    const survey = Object.assign(mockSurveyModel(), {
      didAnswer: true,
      date: new Date('2022-09-27T00:00:00')
    });
    makeSut(survey);
    expect(screen.getByTestId('icon')).toHaveProperty('src', IconName.thumbUp);
    expect(screen.getByTestId('question')).toHaveTextContent(survey.question);
    expect(screen.getByTestId('day')).toHaveTextContent('27');
    expect(screen.getByTestId('month')).toHaveTextContent('set');
    expect(screen.getByTestId('year')).toHaveTextContent('2022');
  });

  test('should render with correct values', () => {
    const survey = Object.assign(mockSurveyModel(), {
      didAnswer: false,
      date: new Date('2021-02-02T00:00:00')
    });
    makeSut(survey);
    expect(screen.getByTestId('icon')).toHaveProperty('src', IconName.thumbDown);
    expect(screen.getByTestId('question')).toHaveTextContent(survey.question);
    expect(screen.getByTestId('day')).toHaveTextContent('02');
    expect(screen.getByTestId('month')).toHaveTextContent('fev');
    expect(screen.getByTestId('year')).toHaveTextContent('2021');
  });
});
