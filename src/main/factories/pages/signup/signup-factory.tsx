import React from 'react';
import { SignUp } from '@/presentation/pages';
import { makeUpdateCurrentAccount } from '@/main/factories/usecases/update-current-account/local-update-current-account-factory';
import { makeSignUpValidation } from './signup-validation';
import { makeRemoteAddAccount } from '@/main/factories/usecases/addAccount/remote-authentication-firebase';

export const makeSignUp : React.FC = () => {
  return (
    <SignUp
      addAccount={makeRemoteAddAccount()}
      validation={makeSignUpValidation()}
      updateCurrentAccount={makeUpdateCurrentAccount()}
    />
  );
};
