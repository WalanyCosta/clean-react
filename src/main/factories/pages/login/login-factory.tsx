import React from 'react';
import { makeLoginValidation } from './login-validation';
import { Login } from '@/presentation/pages';
import { makeRemoteAuthenticationFirebase } from '@/main/factories/usecases/authentication-firebase/remote-authentication-firebase';
import { makeLocalSaveAccessToken } from '@/main/factories/usecases/save-access-token/local-save-access-token-factory';

export const makeLogin : React.FC = () => {
  return (
    <Login
      authentication={makeRemoteAuthenticationFirebase()}
      validation={makeLoginValidation()}
      saveAccessToken={makeLocalSaveAccessToken()}
    />
  );
};
