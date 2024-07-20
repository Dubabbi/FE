// Feedback2.jsx
import React, { useState } from 'react';
import * as C from '../CreateLesson/CreateLessonStyle';
import * as L from '../LessonTchr/LessonStyle';
import * as D from '../WordCreateTchr/WordDetailStyle';
import Back from '/src/assets/icon/back.svg';
import Reward from '../Reward/Reward';
import styled from 'styled-components';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
    background-color: rgba(0, 0, 0, 0.5); /* Optional: for better visibility */
  justify-content: center;
  align-items: center;
  z-index: 1000; // Make sure it's on top
`;

const Feedback2 = () => {
  const [showReward, setShowReward] = useState(false);

  const handleShowReward = () => {
    setShowReward(true);
  };

  const handleCloseReward = () => {
    setShowReward(false);
  };

  return (
    <>
      <D.ImageWrap>
        <a href="/MainStd"><img src={Back} alt="" /></a>
      </D.ImageWrap>
      <L.LessonWrapper style={{marginBottom: '5%'}}>
        <L.Section>
          <h1>이미지 순서 배열하기</h1>
          <C.FeedbackContainer>
            <C.HalfLine />
            <C.FeedbackText>최종평가</C.FeedbackText>
            <C.HalfLine />
          </C.FeedbackContainer>
        </L.Section>
        <C.FeedbackLine style={{marginBottom: '5%'}}>
          <C.FirstBox>정답</C.FirstBox>
          <C.SecondBox>아침에 일어나서 아침을 먹고 학교에 가는 과정입니다.</C.SecondBox>
        </C.FeedbackLine>
        <C.FeedbackLine>
          <C.ImageListBox><div></div></C.ImageListBox>
          <C.ImageListBox><div></div></C.ImageListBox>
          <C.ImageListBox><div></div></C.ImageListBox>
        </C.FeedbackLine>
        <C.InLineButton>
          <C.FeedbackButton onClick={handleShowReward}>그만 할래요</C.FeedbackButton>
          <C.FeedbackButton>다음 학습</C.FeedbackButton>
        </C.InLineButton>
        <h1 style={{width: '100%', marginLeft: '60%', fontSize: '1vw', color: '#777'}}>➡ 추천 학습: 낱말 카드 학습</h1>
      </L.LessonWrapper>
      {showReward && (
        <ModalOverlay>
          <Reward onClose={handleCloseReward} />
        </ModalOverlay>
      )}
    </>
  );
};

export default Feedback2;
