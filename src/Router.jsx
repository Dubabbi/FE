import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Top from './components/Top/Top';
import Navbar from './components/Navbar/Navbar';

import SelectPage  from './pages/Select';
import LoginPage from './pages/Login';



export default function Router() {
  return (
    <>
      <BrowserRouter>
        <Top/>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/Select" element={<SelectPage />} />     
        </Routes>
        <Navbar/>
      </BrowserRouter>
    </>
  );
}