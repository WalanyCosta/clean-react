import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { makeLogin as MakeLogin } from '@/main/factories/pages/login/login-factory';
import { SignUp } from '@/presentation/pages';

import '../../styles/global-styles.scss';

const Router : React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<MakeLogin/>} />
        <Route path="/signup" element={<SignUp/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
