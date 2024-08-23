import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as C from '../CreateLesson/CreateLessonStyle';
import * as L from '../LessonTchr/LessonStyle';
import * as D from '../WordCreateTchr/WordDetailStyle';
import Back from '/src/assets/icon/back.svg';
import up1 from '/src/assets/image/up1.svg';
import up2 from '/src/assets/image/up2.svg';
import up3 from '/src/assets/image/up3.svg';
import axios from 'axios';
import { ModalOverlay } from './Feedback2';
import Reward from '../Reward/Reward';

const Template4Std = () => {
  const navigate = useNavigate();
  const [showReward, setShowReward] = useState(false);
  const [feedbackData, setFeedbackData] = useState(null);
  const [templateData, setTemplateData] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);
  const [lives, setLives] = useState(2);
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    const template2Id = 4;

    axios.get(`https://maeummal.com/template2/get?template2Id=${template2Id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("key")}`
      }
    })
    .then(response => {
      if (response.data.isSuccess) {
        setTemplateData(response.data.data);
        setSelectedImages([]);
      } else {
        throw new Error('Failed to fetch data');
      }
    })
    .catch(error => {
      console.error('Error fetching data:', error);
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

  const handleSubmit = () => {
    const userAnswerOrder = selectedImages.map(item => item.answerNumber);
    const correctOrder = templateData.storyCardEntityList.map(card => card.answerNumber);
  
    if (userAnswerOrder.length !== templateData.storyCardEntityList.length) {
      console.error('Answer list size does not match the image card entities size');
      return;
    }
  
    const isCorrect = JSON.stringify(userAnswerOrder) === JSON.stringify(correctOrder);
  
    const submitFeedback = async () => {
      try {
        const accessToken = `${localStorage.getItem("key")}`;
        const response = await axios.post('https://maeummal.com/feedback/create', {
          templateId: 4,
          answerList: userAnswerOrder.map(String),
          studentId: 12,
          templateType: "TEMPLATE4"
        }, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
  
        if (response.data && response.data.id) {
          setFeedbackData(response.data);
          handleShowReward(true);
        } else {
          console.error('Failed to submit feedback:', response.data.message || 'Unknown error');
        }
      } catch (error) {
        if (error.response) {
          console.error('Error response:', error.response.data);
        } else if (error.request) {
          console.error('No response received:', error.request);
        } else {
          console.error('Error during setup:', error.message);
        }
      }
    };
  
    if (isCorrect) {
      submitFeedback();
    } else {
      if (lives > 0) {
        setLives(lives - 1);
        setShowHint(true);
        setSelectedImages([]);
        if (lives === 1) {
          submitFeedback();
        }
      } else {
        submitFeedback();
      }
    }
  };
  

  const handleShowReward = (show) => {
    setShowReward(show);
  };

  const handleCloseReward = () => {
    setShowReward(false);
  
    if (feedbackData) {
      navigate('/Feedback2', { 
        state: { 
          feedbackData, 
          description: templateData.description
        } 
      });
    } else {
      console.error('No feedback data available to pass to Feedback2');
    }
  };
  const [selectedCard, setSelectedCard] = useState(null);

  const handleSelectCard = (index) => {
    setSelectedCard(index);
  };

  return (
    <>
      <D.ImageWrap>
        <a href="/MainTchr"><img src={Back} alt="" /></a>
      </D.ImageWrap>
      <L.LessonWrapper>
        <L.Section>
          <h1>이야기 순서 배열하기</h1>
          <p>Up 이야기 알아보기</p>
        </L.Section>
        <D.Select style={{width: '20%', marginLeft: '7px', marginBottom: '5px'}}>
        </D.Select>
        <C.StoryWrap>
          <C.CardContainer>
            {[up1, up2, up3].map((image, index) => (
              <C.SelectCard
                key={index}
                selected={selectedCard === index}
                onClick={() => handleSelectCard(index)}
              >
                <C.ImageList>
                  <div><img src={image} alt="" /></div>
                </C.ImageList>
                <C.Story><p>이야기</p></C.Story>
              </C.SelectCard>
            ))}
          </C.CardContainer>
        </C.StoryWrap>
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

export default Template4Std;
