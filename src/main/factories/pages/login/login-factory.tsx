import React from 'react';
import { makeLoginValidation } from './login-validation';
import { Login } from '@/presentation/pages';
import { makeRemoteAuthenticationFirebase } from '@/main/factories/usecases/authentication-firebase/remote-authentication-firebase';

export const makeLogin : React.FC = () => {
  return (
    <Login
      authentication={makeRemoteAuthenticationFirebase()}
      validation={makeLoginValidation()}
    />
  );
};
