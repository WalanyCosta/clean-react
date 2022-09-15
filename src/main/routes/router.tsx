import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { makeLogin as MakeLogin } from '@/main/factories/pages/login/login-factory';
import { makeSignUp as MakeSignUp } from '@/main/factories/pages/signup/signup-factory';
import { SurveyList } from '@/presentation/pages';
import { ApiContext } from '@/presentation/context';
import { setCurrentAccountAdapter } from '@/main/adapters/current-account-adapter';

import '@/presentation/styles/global-styles.scss';

const Router : React.FC = () => {
  return (
    <ApiContext.Provider
    value={{
      setCurrentAccount: setCurrentAccountAdapter
    }}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<MakeLogin/>} />
          <Route path="/signup" element={<MakeSignUp/>} />
          <Route path="/" element={<SurveyList/>} />
        </Routes>
      </BrowserRouter>
    </ApiContext.Provider>
  );
};

export default Router;
