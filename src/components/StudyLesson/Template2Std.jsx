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
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 관리

  useEffect(() => {
    const template2Id = 3;
  
    const fetchTemplateData = async () => {
      try {
        console.log("Fetching template data..."); // 요청 시작 로그
        const response = await axios.get(`https://maeummal.com/template2/get?template2Id=${template2Id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("key")}`
          }
        });
  
        if (response.data.isSuccess) {
          console.log("Template data fetched successfully:", response.data.data); // 요청 성공 로그
          setTemplateData(response.data.data);
          setSelectedImages([]);
        } else {
          throw new Error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false); // 로딩 상태 업데이트
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
  
  const handleSubmit = () => {
    // Check if template data is loaded properly
    if (!templateData || !templateData.templateId) {
        console.error('템플릿 데이터가 없습니다. 다시 시도해주세요.');
        return; // Exit the function if data is missing
    }

    const userAnswerOrder = selectedImages.map(item => item.answerNumber);
    const correctOrder = templateData.storyCardEntityList.map(card => card.answerNumber);

    // Check if the user has selected all required images
    if (userAnswerOrder.length !== templateData.storyCardEntityList.length) {
        alert('모든 이미지를 선택해주세요.');
        return;
    }

    const isCorrect = JSON.stringify(userAnswerOrder) === JSON.stringify(correctOrder);

    const submitFeedback = async () => {
        try {
            const accessToken = localStorage.getItem("key");
            console.log("Submitting feedback request with data:", {
                templateId: templateData.templateId,
                answerList: userAnswerOrder.map(String),
                studentId: 25,
                templateType: "TEMPLATE2",
                title: templateData.title // Including the title in the POST request
            });

            const response = await axios.post('https://maeummal.com/feedback/create', {
                templateId: templateData.templateId,
                answerList: userAnswerOrder.map(String),
                studentId: 25,
                templateType: "TEMPLATE2",
                title: templateData.title // Passing the title along with other data
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
                console.error('Error response:', error.response.data || 'An unexpected error occurred');
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
            <C.TemplateBox key={card.storyCardId} onClick={() => toggleSelectImage(card.storyCardId)}
              >
              <img style={{ border: selectedImages.some(item => item.id === card.storyCardId) ? '4px solid #ACAACC' : '4px solid #eee' }} src={card.image} alt={`Story card ${card.storyCardId}`} />
            </C.TemplateBox>
          ))}
        </C.Line>
      </L.LessonWrapper>
      {showHint && (
        <C.HintWrapper style = {{border: 'none', position: 'fixed', width: '60%', marginLeft: '20%', marginTop: '-4%'}}>
          <C.HintToast style={{ minWidth: '200px', backgroundColor: '#fff' }}>
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
