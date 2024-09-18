import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Nav/Navbar";
import FloatingButton from "./components/FloatingButton/FloatingButton";
import Footer from "./components/Footer/Footer";
import MainStdPage from "./pages/MainStd";
import MainTchrPage from "./pages/MainTchr";
import LessonTchrPage from "./pages/LessonTchr";
import LessonStdPage from "./pages/LessonStd";
import LessonDetailTchrPage from "./pages/LessonDetailTchr";
import WordTchrPage from "./pages/WordTchr";
import WordStdPage from "./pages/WordStd";
import WordCreateTchrPage from "./pages/WordCreateTchr";
import WordLearnStdPage from "./pages/WordLearnStd";
import CreateLessonPage from "./pages/CreateLesson";
import Template1Tchr from "./components/CreateLesson/Template1Tchr";
import Template2Tchr from "./components/CreateLesson/Template2Tchr";
import Template3Tchr from "./components/CreateLesson/Template3Tchr";
import Template4Tchr from "./components/CreateLesson/Template4Tchr";
import Template5Tchr from "./components/CreateLesson/Template5Tchr";
import Template1Std from "./components/StudyLesson/Template1Std";
import Template2Std from "./components/StudyLesson/Template2Std";
import Template3Std from "./components/StudyLesson/Template3Std";
import Template4Std from "./components/StudyLesson/Template4Std";
import Template5Std from "./components/StudyLesson/Template5Std";
import SelfStudy from "./pages/SelfStudy";
import SelfCategory from "./components/SelfStudy/SelfCategory";
import Level1 from "./components/SelfStudy/Level1";
import Level1Result from "./components/SelfStudy/Level1Result";
import Level2 from "./components/SelfStudy/Level2";
import Level2Result from "./components/SelfStudy/Level2Result";
import ImageModal from "./components/ImageModal/ImageModal";
import MatchingModal from "./components/MypageTchr/MatchingModal";
import Feedback2 from "./components/StudyLesson/Feedback2";
import Feedback3 from "./components/StudyLesson/Feedback3";
import Feedback4 from "./components/StudyLesson/Feedback4";
import Feedback5 from "./components/StudyLesson/Feedback5";
import Reward from "./components/Reward/Reward";
import Reward2 from "./components/Reward/Reward2";
import Reward3 from "./components/Reward/Reward3";
import Reward4 from "./components/Reward/Reward4";
import Reward5 from "./components/Reward/Reward5";
import MypageStdPage from "./components/MypageStd/MypageStd";
import MypageTchrPage from "./components/MypageTchr/MypageTchr";
import WordListTchrPage from "./components/WordTchr/WordListTchr";
import WordDetailTchr from "./components/WordTchr/WordDetailTchr";
import WordNextStd from "./components/WordLearnStd/WordNextStd";
import FeedbackTem1 from "./components/FeedbackDetail/FeedbackTem1";
import FeedbackTem2 from "./components/FeedbackDetail/FeedbackTem2";
import FeedbackTem3 from "./components/FeedbackDetail/FeedbackTem3";
import FeedbackTem4 from "./components/FeedbackDetail/FeedbackTem4";
import FeedbackTem5 from "./components/FeedbackDetail/FeedbackTem5";
import Template1Edit from './components/EditLesson/Template1Edit';
import Template2Edit from './components/EditLesson/Template2Edit';
import Template3Edit from './components/EditLesson/Template3Edit';
import Template4Edit from './components/EditLesson/Template4Edit';
import Template5Edit from './components/EditLesson/Template5Edit';

export default function User() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/mainstd" element={<MainStdPage />} />
        <Route path="/maintchr" element={<MainTchrPage />} />
        <Route path="/lessontchr" element={<LessonTchrPage />} />
        <Route path="/lessonstd" element={<LessonStdPage />} />
        <Route path="/wordtchr" element={<WordTchrPage />} />
        <Route path="/wordstd" element={<WordStdPage />} />
        <Route path="/lessondetailtchr" element={<LessonDetailTchrPage />} />
        <Route path="/wordstd/:wordSetId" element={<WordLearnStdPage />} />
        <Route path="/wordnextstd" element={<WordNextStd />} />
        <Route path="/wordcreatetchr" element={<WordCreateTchrPage />} />
        <Route path="/createlesson" element={<CreateLessonPage />} />
        <Route path="/template1tchr" element={<Template1Tchr />} />
        <Route path="/template2tchr" element={<Template2Tchr />} />
        <Route path="/template3tchr" element={<Template3Tchr />} />
        <Route path="/template4tchr" element={<Template4Tchr />} />
        <Route path="/template5tchr" element={<Template5Tchr />} />
        <Route path="/template1std" element={<Template1Std />} />
        <Route path="/template2std" element={<Template2Std />} />
        <Route path="/template3std" element={<Template3Std />} />
        <Route path="/template4std" element={<Template4Std />} />
        <Route path="/template5std" element={<Template5Std />} />
        <Route path="/selfstudy" element={<SelfStudy />} />
        <Route path="/selfcategory" element={<SelfCategory />} />
        <Route path="/level1" element={<Level1 />} />
        <Route path="/level1result" element={<Level1Result />} />
        <Route path="/level2" element={<Level2 />} />
        <Route path="/level2result" element={<Level2Result />} />
        <Route path="/imagemodal" element={<ImageModal />} />
        <Route path="/matchingmodal" element={<MatchingModal />} />
        <Route path="/feedback2" element={<Feedback2 />} />
        <Route path="/feedback3" element={<Feedback3 />} />
        <Route path="/feedback4" element={<Feedback4 />} />
        <Route path="/feedback5" element={<Feedback5 />} />
        <Route path="/reward" element={<Reward />} />
        <Route path="/reward2" element={<Reward2 />} />
        <Route path="/reward3" element={<Reward3 />} />
        <Route path="/reward4" element={<Reward4 />} />
        <Route path="/reward5" element={<Reward5 />} />
        <Route path="/mypagestd" element={<MypageStdPage />} />
        <Route path="/mypagetchr" element={<MypageTchrPage />} />
        <Route path="/wordlisttchr" element={<WordListTchrPage />} />
        <Route path="/wordtchr/:wordSetId" element={<WordDetailTchr />} />
        <Route path="/feedbacktem1" element={<FeedbackTem1 />} />
        <Route path="/feedbacktem2" element={<FeedbackTem2 />} />
        <Route path="/feedbacktem3" element={<FeedbackTem3 />} />
        <Route path="/feedbacktem4" element={<FeedbackTem4 />} />
        <Route path="/feedbacktem5" element={<FeedbackTem5 />} />
        <Route path="/template1edit" element={<Template1Edit />} />
        <Route path="/template2edit" element={<Template2Edit />} />
        <Route path="/template3edit" element={<Template3Edit />} />
        <Route path="/template4edit" element={<Template4Edit />} />
        <Route path="/template5edit" element={<Template5Edit />} />
      </Routes>
      <FloatingButton />
      <Footer />
    </div>
  );
}
