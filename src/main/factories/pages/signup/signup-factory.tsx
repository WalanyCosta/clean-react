import React from 'react';
import { SignUp } from '@/presentation/pages';
import { makeLocalSaveAccessToken } from '@/main/factories/usecases/save-access-token/local-save-access-token-factory';
import { makeSignUpValidation } from './signup-validation';
import { makeRemoteAddAccount } from '@/main/factories/usecases/addAccount/remote-authentication-firebase';

export const makeSignUp : React.FC = () => {
  return (
    <SignUp
      addAccount={makeRemoteAddAccount()}
      validation={makeSignUpValidation()}
      saveAccessToken={makeLocalSaveAccessToken()}
    />
  );
};
