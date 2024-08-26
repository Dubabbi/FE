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

const Template4Std = () => {
  const navigate = useNavigate();
  const [showReward, setShowReward] = useState(false);
  const [feedbackData, setFeedbackData] = useState(null);
  const [templateData, setTemplateData] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);
  const [lives, setLives] = useState(2);
  const [showHint, setShowHint] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
    const template4Id = 1;
    const fetchTemplateData = async () => {
      const accessToken = localStorage.getItem("key");
      if (!accessToken) {
        console.log('Authentication required');
        return;
      }

      try {
        const response = await axios.get(`https://maeummal.com/template4/get?template4Id=${template4Id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });

        if (response.data.isSuccess && response.data.data) {
          console.log("Template data fetched successfully:", response.data.data);
          setTemplateData(response.data.data); // API 구조에 따라 데이터 설정
          setSelectedImages([]); // 이미지 선택 초기화
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
  const submitFeedback = async (userOrder) => {
    try {
      const accessToken = localStorage.getItem("key");
      const response = await axios.post('https://maeummal.com/feedback/create', {
        templateId: templateData.templateId,
        answerList: userOrder.map(String),
        studentId: 25,
        templateType: "TEMPLATE4"
      }, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
  
      if (response.data && response.data.id) {
        setFeedbackData(response.data);
        setShowReward(true);
      } else {
        console.error('Failed to submit feedback:', response.data.message || 'Unknown error');
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
    }
  };
  
  const handleSubmit = async () => {
    const userAnswerOrder = selectedImages.map(item => item.answerNumber);
    const correctOrder = templateData.storyCardEntityList.map(card => card.answerNumber);
  
    if (userAnswerOrder.length !== templateData.storyCardEntityList.length) {
      console.error('Answer list size does not match the image card entities size');
      return;
    }
  
    const isCorrect = JSON.stringify(userAnswerOrder) === JSON.stringify(correctOrder);
  
    if (isCorrect) {
      await submitFeedback(userAnswerOrder);
    } else {
      if (lives > 1) {
        setLives(lives - 1);
        setShowHint(true);
        setSelectedImages([]);
      } else {
        setLives(0);
        setShowHint(false);
        await submitFeedback(userAnswerOrder);
      }
    }
  };

  const handleSelectCard = (index) => {
    setSelectedCard(index);
  };

  const handleShowReward = (show) => {
    setShowReward(show);
  };

  const handleCloseReward = () => {
    setShowReward(false);
      navigate('/Feedback4', {
          state: {feedbackData, description: templateData.description } 
      });
  };

  if (isLoading) {
    return <p>Loading...</p>; 
  }

  return (
    <>
      <D.ImageWrap>
        <a href="/MainTchr"><img src={Back} alt="" /></a>
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
        <D.Select style={{width: '20%', marginLeft: '7px', marginBottom: '5px'}}>
        </D.Select>
        <C.StoryWrap>
          <C.CardContainer>
          {templateData && templateData.storyCardEntityList.map((card, index) => (
              <C.SelectCard
                key={card.storyCardId} 
                style={{ border: selectedImages.some(item => item.id === card.storyCardId) ? '4px solid #ACAACC' : '4px solid #eee' }}
                onClick={() => toggleSelectImage(card.storyCardId)}
                selected={selectedCard === index}
              >
                <C.ImageList>
                  <div><img  src={card.image} alt={`Story card ${card.storyCardId}`} /></div>
                </C.ImageList>
                <C.Story><p>이야기</p></C.Story>
              </C.SelectCard>
            ))}
          </C.CardContainer>
        </C.StoryWrap>
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

export default Template4Std;
