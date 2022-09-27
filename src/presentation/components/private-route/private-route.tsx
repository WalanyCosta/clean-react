import { ApiContext } from '@/presentation/context';
import { SurveyList } from '@/presentation/pages';
import { LoadSurveyListSpy } from '@/presentation/test/mock-load-survey-list';
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute:React.FC = () => {
  const { getCurrentAccount } = useContext(ApiContext);
  return getCurrentAccount()?.accessToken ? <SurveyList loadSurveyList={new LoadSurveyListSpy()}/> : <Navigate to="/login"/>;
};

export default PrivateRoute;
