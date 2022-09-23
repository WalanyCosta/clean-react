import { ApiContext } from '@/presentation/context';
import { SurveyList } from '@/presentation/pages';
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute:React.FC = () => {
  const { getCurrentAccount } = useContext(ApiContext);
  return getCurrentAccount()?.accessToken ? <SurveyList/> : <Navigate to="/login"/>;
};

export default PrivateRoute;
