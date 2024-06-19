import React from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Nav/Navbar';
import Footer from './components/Footer/Footer';
import SelectPage from './pages/Select';
import LoginPage from './pages/Login';
import MainStdPage from './pages/MainStd';
import MainTchrPage from './pages/MainTchr';
import SignupStdPage from './pages/SignupStd';
import SignupTchrPage from './pages/SignupTchr';
import LessonTchrPage from './pages/LessonTchr';
import LessonStdPage from './pages/LessonStd';

export default function Router() {
  return (
    <BrowserRouter>
      <AppWrapper />
    </BrowserRouter>
  );
}

function AppWrapper() {
  const location = useLocation();
  const hideNavBarRoutes = ['/Select', '/SignupStd', '/SignupTchr', '/']; // 숨기고 싶은 경로
  const showNavBar = !hideNavBarRoutes.includes(location.pathname);
  const showComponents = !hideNavBarRoutes.includes(location.pathname);

  return (
    <>
      {showNavBar && <Navbar />}
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/mainstd" element={<MainStdPage />} />
        <Route path="/maintchr" element={<MainTchrPage />} />
        <Route path="/select" element={<SelectPage />} />
        <Route path="/signupstd" element={<SignupStdPage />} />
        <Route path="/signuptchr" element={<SignupTchrPage />} />
        <Route path="/lessontchr" element={<LessonTchrPage />} />
        <Route path="/lessonstd" element={<LessonStdPage />} />
      </Routes>
    </>
  );
}
