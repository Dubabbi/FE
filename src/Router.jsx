import React from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Nav/Navbar";
import FloatingButton from "./components/FloatingButton/FloatingButton";
import Footer from "./components/Footer/Footer";
import SelectPage from "./pages/Select";
import LoginPage from "./pages/Login";
import MainStdPage from "./pages/MainStd";
import MainTchrPage from "./pages/MainTchr";
import SignupStdPage from "./pages/SignupStd";
import SignupTchrPage from "./pages/SignupTchr";
import LessonTchrPage from "./pages/LessonTchr";
import LessonStdPage from "./pages/LessonStd";
import LessonDetailTchrPage from "./pages/LessonDetailTchr";
import WordTchrPage from "./pages/WordTchr";
import WordStdPage from "./pages/WordStd";
import WordDetailTchrPage from "./pages/WordDetailTchr";
import WordDetailStdPage from "./pages/WordDetailStd";
import CreateLessonPage from "./pages/CreateLesson";
import ResetPw from "./components/Login/ResetPw";
import ForgotId from "./components/Login/ForgotId";

export default function Router() {
  return (
    <BrowserRouter>
      <AppWrapper />
    </BrowserRouter>
  );
}

function AppWrapper() {
  const location = useLocation();
  const hideNavBarRoutes = [
    "/Select",
    "/SignupStd",
    "/SignupTchr",
    "/",
    "/resetpw",
    "/forgotid",
  ]; // 숨기고 싶은 경로
  const showNavBar = !hideNavBarRoutes.includes(location.pathname);
  const showFloatingButton = !hideNavBarRoutes.includes(location.pathname);
  const showFooter = !hideNavBarRoutes.includes(location.pathname);

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
        <Route path="/wordtchr" element={<WordTchrPage />} />
        <Route path="/wordstd" element={<WordStdPage />} />
        <Route path="/lessondetailtchr" element={<LessonDetailTchrPage />} />
        <Route path="/worddetailstd" element={<WordDetailStdPage />} />
        <Route path="/worddetailtchr" element={<WordDetailTchrPage />} />
        <Route path="/createlesson" element={<CreateLessonPage />} />
        <Route path="/resetpw" element={<ResetPw />} />
        <Route path="/forgotid" element={<ForgotId />} />
      </Routes>
      {showFloatingButton && <FloatingButton />}
      {showFooter && <Footer />}
    </>
  );
}
