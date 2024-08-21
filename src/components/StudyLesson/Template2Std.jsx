import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as C from '../CreateLesson/CreateLessonStyle';
import * as L from '../LessonTchr/LessonStyle';
import * as D from '../WordCreateTchr/WordDetailStyle';
import Back from '/src/assets/icon/back.svg';
import Pink from '/src/assets/icon/heartpink.svg';
import White from '/src/assets/icon/heartwhite.svg';
import { ModalOverlay } from './Feedback2';
import axios from 'axios';
import Reward from '../Reward/Reward';
import Toast from '/src/assets/icon/errortoast.svg'

const Template2Std = () => {
  const navigate = useNavigate();
  const [showReward, setShowReward] = useState(false);
  const [error, setError] = useState('');
  const [templateData, setTemplateData] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);
  const [userSequence, setUserSequence] = useState([]);
  const [lives, setLives] = useState(2); // 생명이 2개
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    const template2Id = 1;
    const accessToken = `Bearer xfe38sefpESfd39er`;

    axios.get(`https://maeummal.com/template2/get?template2Id=${template2Id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    .then(response => {
      if (response.data.isSuccess) {
        setTemplateData(response.data.data);
      } else {
        throw new Error('Failed to fetch data');
      }
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      setError(`Failed to load template data: ${error.message}`);
    });
  }, []);

  const correctSequence = [1, 2]; // 정답 순서, 실제 데이터에 맞게 조정 필요

  const toggleSelectImage = (id) => {
    const index = selectedImages.indexOf(id);
    let newSelectedImages = [...selectedImages];
    let newUserSequence = [...userSequence];

    if (index === -1) {
      newSelectedImages.push(id);
      newUserSequence.push(id); // 순서를 추적
    } else {
      newSelectedImages.splice(index, 1);
      newUserSequence.splice(newUserSequence.indexOf(id), 1); // 순서에서 제거
    }

    setSelectedImages(newSelectedImages);
    setUserSequence(newUserSequence);
  };

  const handleSubmit = () => {
    const isCorrect = JSON.stringify(userSequence) === JSON.stringify(correctSequence);
    if (isCorrect) {
      setShowReward(true);
    } else {
      if (lives > 0) {
        setLives(lives - 1);
        setShowHint(true);
      } else {
        navigate('/Feedback2');
      }
    }
  };

  const handleShowReward = () => {
    setShowReward(true);
  };

  const handleCloseReward = () => {
    setShowReward(false);
    navigate('/Feedback2');
  };

  return (
    <>
      <D.ImageWrap>
        <a href="/MainTchr"><img src={Back} alt="Back" /></a>
      </D.ImageWrap>
      <D.HeartWrap>
        {Array.from({ length: 2 }).map((_, index) => (
          <img key={index} src={index < (2 - lives) ? White : Pink} alt="Heart" />
        ))}
      </D.HeartWrap>
      <L.LessonWrapper>
        <L.Section>
          <h1>{templateData ? templateData.title : 'Loading...'}</h1>
          <p>{templateData ? templateData.description : 'Loading...'}</p>
        </L.Section>
        <C.Line>
          {templateData && templateData.storyCardEntityList.map(card => (
            <C.TemplateBox key={card.storyCardId} onClick={() => toggleSelectImage(card.storyCardId)}
              style={{ border: selectedImages.includes(card.storyCardId) ? '2px solid blue' : 'none' }}>
              <img src={card.image} alt={`Story card ${card.storyCardId}`} />
            </C.TemplateBox>
          ))}
        </C.Line>
      </L.LessonWrapper>
      {showHint && (
        <C.HintWrapper style = {{border: 'none'}}>
            <C.HintToast>
              <img src={Toast}/> {templateData ? templateData.hint : 'Loading...'}
            </C.HintToast>
        </C.HintWrapper>
      )}
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
