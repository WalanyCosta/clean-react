import { ApiContext } from '@/presentation/context';
import { LoadSurveyListSpy } from '@/presentation/test/mock-load-survey-list';
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { makeSurveyList as MakeSurveyList } from '@/main/factories/pages/surveys-list/surveys-list-factory';
import { makeSurveyResult as MakeSurveyResult } from '@/main/factories/pages/survey-result/survey-result-factory';

type Props = {
  result?: boolean
}

const PrivateRoute:React.FC<Props> = ({ result }: Props) => {
  const { getCurrentAccount } = useContext(ApiContext);
  if (result) {
    return getCurrentAccount()?.accessToken ? <MakeSurveyResult /> : <Navigate to="/login"/>;
  }
  return getCurrentAccount()?.accessToken ? <MakeSurveyList /> : <Navigate to="/login"/>;
};

export default PrivateRoute;
