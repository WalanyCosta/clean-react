import React from 'react';
import { makeLogin as MakeLogin } from '@/main/factories/pages/login/login-factory';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import '../../styles/global-styles.scss';

const Router : React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MakeLogin/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
