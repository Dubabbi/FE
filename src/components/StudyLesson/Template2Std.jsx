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
import Toast from '/src/assets/icon/errortoast.svg';
const Template2Std = () => {
  const navigate = useNavigate();
  const [showReward, setShowReward] = useState(false);
  const [feedbackData, setFeedbackData] = useState(null);
  const [templateData, setTemplateData] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);
  const [lives, setLives] = useState(2);
  const [showHint, setShowHint] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const template2Id = 7;
    const fetchTemplateData = async () => {
      try {
        const response = await axios.get(`https://maeummal.com/template2/get?template2Id=${template2Id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("key")}` }
        });
        if (response.data.isSuccess) {
          const cardsWithIndex = response.data.data.storyCardEntityList.map((card, index) => ({
            ...card,
            originalIndex: index
          }));
          const shuffledData = shuffleArray(cardsWithIndex);
          setTemplateData({ ...response.data.data, storyCardEntityList: shuffledData });
          setSelectedImages([]);
        } else {
          throw new Error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTemplateData();
  }, []);

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const toggleSelectImage = (id) => {
    const cardInfo = templateData.storyCardEntityList.find(card => card.storyCardId === id);
    const index = selectedImages.findIndex(item => item.id === id);
    if (index === -1) {
      const newImages = [...selectedImages, { id, originalIndex: cardInfo.originalIndex }];
      setSelectedImages(newImages);
    } else {
      setSelectedImages(selectedImages.filter(item => item.id !== id));
    }
  };

  const handleSubmit = async () => {
    if (!templateData || !templateData.templateId) {
      console.error('Template data is missing, please try again.');
      return;
    }
  
    const userAnswerOrder = selectedImages.map(item => item.answerNumber);
    const correctOrder = templateData.storyCardEntityList.map(card => card.answerNumber);
  
    // 정렬 없이 직접 순서 비교
    const isCorrect = JSON.stringify(userAnswerOrder) === JSON.stringify(correctOrder);
  
    if (isCorrect) {
      await submitFeedback();
    } else {
      if (lives > 1) {
        setLives(lives - 1);
        setShowHint(true);
        setSelectedImages([]);
      } else {
        // 마지막 목숨에서 오답 처리
        setLives(0);
        setShowHint(false);
        await submitFeedback();
      }
    }
  };
  
  const submitFeedback = async () => {
    try {
      const accessToken = localStorage.getItem("key");
      const response = await axios.post('https://maeummal.com/feedback/create', {
        templateId: templateData.templateId,
        answerList: selectedImages.map(item => item.id).map(String),
        studentId: 25,
        templateType: "TEMPLATE2",
        title: templateData.title
      }, {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
  
      if (response.data && response.data.id) {
        setFeedbackData(response.data);
        handleShowReward(true);
      } else {
        console.error('Failed to submit feedback:', response.data.message || 'Unknown error');
      }
    } catch (error) {
      console.error('Error during feedback submission:', error);
    }
  };
  
  
  const handleShowReward = (show) => {
    setShowReward(show);
  };

  const handleCloseReward = () => {
    setShowReward(false);
      navigate('/Feedback2', {
        state: { feedbackData, description: templateData.description }
      });
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

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
            <C.TemplateBox key={card.storyCardId} onClick={() => toggleSelectImage(card.storyCardId)}>
              <img style={{ border: selectedImages.some(item => item.id === card.storyCardId) ? '4px solid #ACAACC' : '4px solid #eee' }} src={card.image} alt={`Story card ${card.storyCardId}`} />
            </C.TemplateBox>
          ))}
        </C.Line>
      </L.LessonWrapper>
      {showHint && (
        <C.HintWrapper style={{border: 'none', position: 'fixed', width: '60%', marginLeft: '20%', marginTop: '-4%'}}>
          <C.HintToast style={{ minWidth: '200px', backgroundColor: '#fff' }}>
            <img src={Toast} alt="Hint" />{templateData ? templateData.hint : 'Loading...'}
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

