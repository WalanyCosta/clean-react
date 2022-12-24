import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { makeLogin as MakeLogin } from '@/main/factories/pages/login/login-factory';
import { makeSignUp as MakeSignUp } from '@/main/factories/pages/signup/signup-factory';
import { ApiContext } from '@/presentation/context';
import { getCurrentAccountAdapter, setCurrentAccountAdapter } from '@/main/adapters/current-account-adapter';
import '@/presentation/styles/global-styles.scss';
import PrivateRoute from '@/presentation/components/private-route/private-route';

const Router : React.FC = () => {
  return (
    <ApiContext.Provider
    value={{
      setCurrentAccount: setCurrentAccountAdapter,
      getCurrentAccount: getCurrentAccountAdapter
    }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PrivateRoute />} />
          <Route path="/signup" element={<MakeSignUp/>} />
          <Route path="/login" element={<MakeLogin/>} />
          <Route path="/surveys/:id" element={<PrivateRoute result />} />
        </Routes>
      </BrowserRouter>
    </ApiContext.Provider>
  );
};

export default Router;
