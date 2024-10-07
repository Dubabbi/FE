import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import * as C from '../CreateLesson/CreateLessonStyle';
import * as L from '../LessonTchr/LessonStyle';
import * as D from '../WordCreateTchr/WordDetailStyle';
import Back from '/src/assets/icon/back.svg';
import styled from 'styled-components';
import Correct from '/src/assets/icon/correct.svg';
import Incorrect from '/src/assets/icon/incorrect.svg';

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  background-color: rgba(0, 0, 0, 0.5); 
  justify-content: center;
  align-items: center;
  z-index: 1000; 
`;

const Feedback4 = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // 기본값 설정으로 빈 데이터에 대한 처리
  const feedbackData = location.state?.feedbackData || {};
  const feedbackDescription = location.state?.description || '설명이 없습니다.';
  const cardData = location.state?.cardData || []; // 카드 데이터 받아오기

  const handleStop = () => {
    navigate('/MainStd');
  };

  const isCorrect = feedbackData.correctnessList ? feedbackData.correctnessList[0] : null;

  if (!feedbackData) {
    return <p>Loading...</p>; // 로딩 중 메시지
  }

  return (
    <>
      <D.ImageWrap>
        <a href="/MainStd"><img src={Back} alt="Back" /></a>
      </D.ImageWrap>
      <L.LessonWrapper style={{ marginBottom: '5%' }}>
        <L.Section style={{ marginTop: '3%' }}>
          <h1>{feedbackData.templateTitle || '강의 제목'}</h1>
          <C.FeedbackContainer>
            <C.HalfLine />
            <C.FeedbackText>최종평가</C.FeedbackText>
            <C.HalfLine />
          </C.FeedbackContainer>
        </L.Section>

        <C.FeedbackLine style={{ marginBottom: '5%' }}>
          <C.FirstBox>
            <img src={isCorrect ? Correct : Incorrect} alt={isCorrect ? 'Correct' : 'Incorrect'} />
          </C.FirstBox>
          <C.SecondBox>
            {feedbackDescription}
          </C.SecondBox>
        </C.FeedbackLine>

        <C.StoryWrap style={{ marginBottom: '3%' }}>
          <C.CardContainer>
            {/* 전달받은 cardData 배열을 사용해 설명과 이미지 렌더링 */}
            {cardData.map((card, index) => (
              <C.SelectCard key={index} style={{ border: '4px solid #eee' }}>
                <C.StoryList>
                  <img style={{ height: '100%', border: 'none' }} src={card.image} alt={`Story card ${card.storyCardId}`} />
                </C.StoryList>
                <C.Story>
                  <p style={{ textAlign: 'left', fontSize: '1.2rem' }}>{card.description || '설명이 없습니다.'}</p>
                </C.Story>
              </C.SelectCard>
            ))}
          </C.CardContainer>
        </C.StoryWrap>

        <C.HintWrapper2 style={{ width: '70%', padding: '1rem 0' }}>
          <C.HintGroup2 style={{ flexDirection: 'column', justifyContent: 'flex-start' }}>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', width: '100%', marginTop: '2%' }}>
              <C.Label style={{ marginLeft: '-3%' }}>AI 피드백</C.Label>
              <div style={{ width: '70%' }}></div>
            </div>
            <C.HintBox2 style={{ width: '90%', border: 'none', fontSize: '1.2rem', textAlign: 'left' }}>
              {feedbackData.aiFeedback || 'AI 피드백 없음'}
            </C.HintBox2>
          </C.HintGroup2>
        </C.HintWrapper2>

        <C.InLineButton>
          <C.FeedbackButton onClick={handleStop}>그만 할래요</C.FeedbackButton>
          <C.FeedbackButton>다음 학습</C.FeedbackButton>
        </C.InLineButton>

        <h1 style={{ width: '100%', marginLeft: '60%', fontSize: '1vw', color: '#777' }}>➡ 추천 학습: 낱말 카드 학습</h1>
      </L.LessonWrapper>
    </>
  );
};

export default Feedback4;
