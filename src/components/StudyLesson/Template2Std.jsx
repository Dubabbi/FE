// Template2Std.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as C from '../CreateLesson/CreateLessonStyle';
import * as L from '../LessonTchr/LessonStyle';
import * as D from '../WordCreateTchr/WordDetailStyle';
import Back from '/src/assets/icon/back.svg';
import { ModalOverlay } from './Feedback2';
import Reward from '../Reward/Reward';

const Template2Std = () => {
  const navigate = useNavigate();
  const [showReward, setShowReward] = useState(false);

  const handleShowReward = () => {
    setShowReward(true);
  };

  const handleCloseReward = () => {
    setShowReward(false);
    navigate('/Feedback2');
  };

  const handleSubmit = () => {
    handleShowReward();
  };

  return (
    <>
      <D.ImageWrap>
        <a href="/MainTchr"><img src={Back} alt="" /></a>
      </D.ImageWrap>
      <L.LessonWrapper>
        <L.Section>
          <h1>등교를 합시다!</h1>
          <p>아침에 일어나서 학교에 가는 과정을 순서대로 선택하세요.</p>
        </L.Section>
        <C.Line>
          <C.Box><div></div></C.Box>
          <C.Box><div></div></C.Box>
          <C.Box><div></div></C.Box>
        </C.Line>
      </L.LessonWrapper>
      <C.SubmitButton onClick={handleSubmit}>제출</C.SubmitButton>
      {showReward && (
        <ModalOverlay>
          <Reward onClose={handleCloseReward} />
        </ModalOverlay>
      )}
    </>
  );
};

export default Template2Std;
