import React from 'react';
import { SurveyResult } from '@/presentation/pages';
import { makeRemoteLoadSurveyResult } from '@/main/factories/usecases/load-survey-result/remote-load-survey-result';

export const makeSurveyResult : React.FC = () => {
  return (
    <SurveyResult
      loadSurveyResult={makeRemoteLoadSurveyResult()}
    />
  );
};
