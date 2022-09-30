import React from 'react';
import { SignUp } from '@/presentation/pages';
import { makeSignUpValidation } from './signup-validation';
import { makeRemoteAddAccount } from '@/main/factories/usecases/addAccount/remote-add-account';

export const makeSignUp : React.FC = () => {
  return (
    <SignUp
      addAccount={makeRemoteAddAccount()}
      validation={makeSignUpValidation()}
    />
  );
};
