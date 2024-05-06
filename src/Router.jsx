import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Top from './components/Top/Top';
import Navbar from './components/Navbar/Navbar';

import SelectPage  from './pages/Select';
import LoginPage from './pages/Login';
import SignupStdPage from './pages/SignupStd';
import SignupTchrPage from './pages/SignupTchr';



export default function Router() {
  return (
    <>
      <BrowserRouter>
        <Top/>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/Select" element={<SelectPage />} />
          <Route path="/SignupStd" element={<SignupStdPage />} />
          <Route path="/SignupTchr" element={<SignupTchrPage />} />              
        </Routes>
        <Navbar/>
      </BrowserRouter>
    </>
  );
}