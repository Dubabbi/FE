// Template2Std.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as C from '../CreateLesson/CreateLessonStyle';
import * as L from '../LessonTchr/LessonStyle';
import * as D from '../WordCreateTchr/WordDetailStyle';
import Back from '/src/assets/icon/back.svg';
import { ModalOverlay } from './Feedback2';
import axios from 'axios';
import Reward from '../Reward/Reward';

const Template2Std = () => {
  const navigate = useNavigate();
  const [showReward, setShowReward] = useState(false);
  const [error, setError] = useState('');

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

  useEffect(() => {
    axios.get('https://maeummal.com/template2/all')
      .then(response => {
        console.log(response);
        if (response.data.isSuccess) {
          setWords(response.data.data);
          console.log('Data fetched successfully.');
        } else {
          throw new Error('Failed to fetch data');
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError(`Failed to load word sets: ${error.message}`);
      });
  }, []);


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
