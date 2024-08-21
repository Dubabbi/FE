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
  const [lives, setLives] = useState(2);
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    const template2Id = 1;
    const accessToken = `${localStorage.getItem("key")}`;

    axios.get(`https://maeummal.com/template2/get?template2Id=${template2Id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    .then(response => {
      if (response.data.isSuccess) {
        setTemplateData(response.data.data);
        setUserSequence(response.data.data.storyCardEntityList.map(card => card.storyCardId));
      } else {
        throw new Error('Failed to fetch data');
      }
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      setError(`Failed to load template data: ${error.message}`);
    });
  }, []);


  const toggleSelectImage = (id) => {
    const cardInfo = templateData.storyCardEntityList.find(card => card.storyCardId === id);
    const index = selectedImages.findIndex(item => item.id === id);
    if (index === -1) {
        const newImages = [...selectedImages, { id, answerNumber: cardInfo.answerNumber }];
        setSelectedImages(newImages);
    } else {
        const newImages = selectedImages.filter(item => item.id !== id);
        setSelectedImages(newImages);
    }
};


useEffect(() => {
    console.log("Current Selected Images:", selectedImages);
}, [selectedImages]);

useEffect(() => {
  console.log("User Answer Order on Submit:", selectedImages.map(item => item.answerNumber));
}, [selectedImages]);

const handleSubmit = () => {
  const userAnswerOrder = selectedImages.map(item => item.answerNumber);
  const correctOrder = templateData.storyCardEntityList.map(card => card.answerNumber);

  const isCorrect = JSON.stringify(userAnswerOrder) === JSON.stringify(correctOrder);

  if (isCorrect) {
      handleShowReward(true);
  } else {
      handleShowReward(false);
      if (lives > 0) {
        setLives(lives - 1);
        setShowHint(true);
        if (lives === 1) {
            navigate('/Feedback2');
        }
    } else {
        navigate('/Feedback2');
    }
  }
};
  
  const handleShowReward = (show) => {
    setShowReward(show);
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
              <C.HintToast style={{ minWidth: '200px' }}>
              <img src={Toast}/>{templateData ? templateData.hint : 'Loading...'}
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
