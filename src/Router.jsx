import React from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import SelectPage from './pages/Select';
import LoginPage from './pages/Login';
import SignupStdPage from './pages/SignupStd';
import SignupTchrPage from './pages/SignupTchr';
import ResetPw from './components/Login/ResetPw';
import ForgotId from './components/Login/ForgotId';
import ShowMsg from './components/SignupStd/ShowMsg';
import User from './User';

export default function Router() {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/select" element={<SelectPage />} />
        <Route path="/signupstd" element={<SignupStdPage />} />
        <Route path="/signuptchr" element={<SignupTchrPage />} />
        <Route path="/showmsg" element={<ShowMsg />} />
        <Route path="/resetpw" element={<ResetPw />}/>
        <Route path="/forgotid" element={<ForgotId />}/>
        <Route path="/*" element={<User />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}