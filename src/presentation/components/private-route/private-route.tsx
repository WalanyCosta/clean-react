import { ApiContext } from '@/presentation/context';
import { LoadSurveyListSpy } from '@/presentation/test/mock-load-survey-list';
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { makeSurveyList as MakeSurveyList } from '@/main/factories/pages/surveys-list/surveys-list-factory';

const PrivateRoute:React.FC = () => {
  const { getCurrentAccount } = useContext(ApiContext);
  return getCurrentAccount()?.accessToken ? <MakeSurveyList /> : <Navigate to="/login"/>;
};

export default PrivateRoute;
