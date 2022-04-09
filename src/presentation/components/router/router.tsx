import React from 'react';
import { Login } from '@/presentation/pages';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import '../../styles/global-styles.scss';

const Router : React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
