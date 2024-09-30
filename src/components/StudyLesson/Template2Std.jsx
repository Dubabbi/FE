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
import Reward from '../Reward/Reward2';
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
  const [imageSelectionOrder, setImageSelectionOrder] = useState({});

  useEffect(() => {
    const template2Id = 11;
    const fetchTemplateData = async () => {
      try {
        const response = await axios.get(`https://maeummal.com/template2/get?template2Id=${template2Id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("key")}` }
        });
        if (response.data.isSuccess) {
          setTemplateData(response.data.data);
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

  const toggleSelectImage = (id) => {
    const index = selectedImages.findIndex(item => item.id === id);
    if (index === -1) {
      const newImages = [...selectedImages, { id, originalIndex: selectedImages.length + 1 }];
      setSelectedImages(newImages);
      setImageSelectionOrder(newImages.reduce((acc, item, idx) => {
        acc[item.id] = idx + 1;
        return acc;
      }, {}));
    } else {
      const newImages = selectedImages.filter(item => item.id !== id);
      setSelectedImages(newImages);
      setImageSelectionOrder(newImages.reduce((acc, item, idx) => {
        acc[item.id] = idx + 1;
        return acc;
      }, {}));
    }
  };

  const handleSubmit = async () => {
    if (!templateData || !templateData.templateId) {
      console.error('Template data is missing, please try again.');
      return;
    }
  

    const userAnswerOrder = selectedImages
      .sort((a, b) => a.originalIndex - b.originalIndex)  
      .map(item => {
        const card = templateData.storyCardEntityList.find(card => card.storyCardId === item.id);
        return card.answerNumber;
      });
  
    const correctOrder = templateData.storyCardEntityList
      .map(card => card.answerNumber)
      .sort((a, b) => a - b); 
    const isCorrect = JSON.stringify(userAnswerOrder) === JSON.stringify(correctOrder);
  
    if (isCorrect) {
      await submitFeedback(userAnswerOrder);
      setShowReward(true);
      awardBadge(22, "TEMPLATE4");
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
  
  const submitFeedback = async (userAnswerOrder) => {
    try {
      const accessToken = localStorage.getItem("key");
      const response = await axios.post('https://maeummal.com/feedback/create', {
        templateId: templateData.templateId,
        answerList: userAnswerOrder.map(String),  // Send the order of answers as strings
        studentId: 1,
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
  const awardBadge = async (memberId, templateType) => {
    const accessToken = localStorage.getItem("key");
  
    try {
      // memberId와 templateType을 &로 연결하여 URL에 쿼리 파라미터로 전달
      const response = await axios.post(`https://maeummal.com/badges/award?memberId=${memberId}&templateType=${templateType}`, {}, {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
  
      if (!response.data) {
        throw new Error('Failed to award badge');
      }
      console.log('Badge awarded successfully:', response.data);
    } catch (error) {
      console.error('Error awarding badge:', error);
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
        <C.TemplateBox key={card.storyCardId} onClick={() => toggleSelectImage(card.storyCardId)} style={{ position: 'relative' }}>
          <img src={card.image} alt={`Story card ${card.storyCardId}`} style={{ border: selectedImages.some(item => item.id === card.storyCardId) ? '4px solid #ACAACC' : '4px solid #eee' }} />
          {imageSelectionOrder[card.storyCardId] && (
            <div style={{ position: 'absolute', top: '5px', right: '5px', color: 'white', fontWeight: 'bold', background: 'rgba(0, 0, 0, 0.5)', padding: '2px 6px', borderRadius: '50%' }}>
              {imageSelectionOrder[card.storyCardId]}
            </div>
          )}
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
