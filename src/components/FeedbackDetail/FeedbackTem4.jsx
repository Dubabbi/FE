import React, { useState, useEffect } from 'react';
import * as C from '../CreateLesson/CreateLessonStyle';
import * as D from '../WordCreateTchr/WordDetailStyle';
import * as L from '../LessonTchr/LessonStyle';
import Back from '/src/assets/icon/back.svg';
import styled from 'styled-components';
import Form from 'react-bootstrap/Form';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Correct from '/src/assets/icon/correct.svg';
import Incorrect from '/src/assets/icon/incorrect.svg';
// id=25

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

const FeedbackTem4 = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userInfo, setUserInfo] = useState({});
  const [error, setError] = useState('');
  // location.state에서 feedbackId를 가져옵니다.
  const feedbackId = location.state?.feedbackId;

  const [feedbackData, setFeedbackData] = useState({});

  useEffect(() => {
    if (feedbackId) {
      fetchFeedbackDetails(feedbackId);
    }
  }, [feedbackId]);

  const fetchFeedbackDetails = async (id) => {
    try {
      const response = await axios.get(`https://maeummal.com/feedback/detail?id=${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      if (response.data.isSuccess) {
        const { data } = response.data;
        setFeedbackData({
          templateTitle: data.templateTitle,
          correctnessList: data.correctnessList,
          aiFeedback: data.aiFeedback,
          solution: data.solution,
          correctFeedbackCards: data.correctFeedbackCards,
          studentFeedbackCards: data.studentFeedbackCards,
          answerNum: data.answerNum
        });
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error('Error fetching feedback details:', error);
      alert('Failed to fetch feedback details.');
    }
  };
  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleStop = () => {
    navigate('/MainStd');
  };
  useEffect(() => {
    const fetchUserInfo = async () => {
      const accessToken = localStorage.getItem("key");
      if (!accessToken) {
        setError('Authentication required');
        return;
      }
      try {
        const response = await axios.get('https://maeummal.com/user', {
          headers: { Authorization: `Bearer ${accessToken}` }
        });
        if (response.data.isSuccess) {
          setUserInfo(response.data.data);
        } else {
          throw new Error(response.data.message || 'Failed to fetch user info');
        }
      } catch (error) {
        console.error('Error fetching user info:', error);
        setError('Failed to fetch user info: ' + error.message);
      }
    };
    fetchUserInfo();
  }, []);

  const BackLink = userInfo.iq != null ? '/mypagestd' : '/mypagetchr';
  const isCorrect = feedbackData.correctnessList ? feedbackData.correctnessList[0] : false;

  return (
    <>
      <D.ImageWrap>
        <a href={BackLink}><img src={Back} alt="" /></a>
      </D.ImageWrap>
      <L.LessonWrapper style={{ marginBottom: '5%' }}>
        <L.Section>
          <h1>{feedbackData.templateTitle || '강의 제목'}</h1>
        </L.Section>
        
        {/* 한 번만 정답 또는 오답 표시 */}
        {isCorrect !== null && (
          <C.FeedbackLine style={{ marginBottom: '5%' }}>
            <C.FirstBox>
              <img src={isCorrect ? Correct : Incorrect} alt={isCorrect ? 'Correct' : 'Incorrect'} />
            </C.FirstBox>
            <C.SecondBox>
            {feedbackData.solution || 'No description provided.'}
            </C.SecondBox>
          </C.FeedbackLine>
        )}

        {/* 학생이 선택한 카드 이미지와 설명   */}
        <L.Section>
          <C.StuTitle style={{ fontSize: '1.7rem' }}>학생이 선택한 이미지</C.StuTitle>
          <C.StoryWrap style={{ marginBottom: '3%', border: 'none'  }}>
          <C.CardContainer>
            {/* 전달받은 cardData 배열을 사용해 설명과 이미지 렌더링 */}
           {feedbackData.studentFeedbackCards && feedbackData.studentFeedbackCards.map((card, index) => (
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
        </L.Section>
        {/* 정답 카드 이미지와 설명  */}
        <L.Section>
          <C.StuTitle style={{ fontSize: '1.7rem', marginLeft: '' }}>정답 이미지</C.StuTitle>
          <C.StoryWrap style={{ marginBottom: '3%', border: 'none' }}>
          <C.CardContainer>
          {feedbackData.correctFeedbackCards && feedbackData.correctFeedbackCards.map((card, index) => (
              <C.SelectCard key={index} style={{ border: '4px solid #eee' }}>
                <C.StoryList>
                  <img style={{ height: '100%', border: 'none' }} src={card.image} alt={`Story card ${card.storyCardId}`} />
                </C.StoryList>
                <C.Story>
                  {/* Display description from studentFeedbackCards for the corresponding index */}
                  <p style={{ textAlign: 'left', fontSize: '1.2rem' }}>
                    {feedbackData.studentFeedbackCards && feedbackData.studentFeedbackCards[index]
                    ? feedbackData.studentFeedbackCards[index].description
                    : '설명이 없습니다.'}
                  </p>
                </C.Story>
              </C.SelectCard>
            ))}
          </C.CardContainer>
        </C.StoryWrap>
        </L.Section>

        {/* AI 피드백 */}
        <C.AIWrapper style={{ width: '70%', padding: '1rem 0' }}>
          <C.HintGroup2 style={{ flexDirection: 'column', justifyContent: 'flex-start' }}>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', width: '100%', marginTop: '2%' }}>
              <C.Label style={{ marginLeft: '-3%' }}>AI 피드백</C.Label>
              <div style={{ width: '70%' }}></div>
            </div>
            <C.HintBox2 style={{ width: '90%', border: 'none', fontSize: '1.2rem' , textAlign: 'left' }}>
              {feedbackData.aiFeedback || 'AI 피드백 없음'}
            </C.HintBox2>
          </C.HintGroup2>
        </C.AIWrapper>
        {/* 버튼 */}
        <C.InLineButton>
          <C.FeedbackButton onClick={handleStop}>그만 할래요</C.FeedbackButton>
          <C.FeedbackButton>다음 학습</C.FeedbackButton>
        </C.InLineButton>
        <h1 style={{ width: '100%', marginLeft: '60%', fontSize: '1vw', color: '#777' }}>➡ 추천 학습: 낱말 카드 학습</h1>
      </L.LessonWrapper>
    </>
  );
};
export default FeedbackTem4;
