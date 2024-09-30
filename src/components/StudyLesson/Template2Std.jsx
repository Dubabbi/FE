import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
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
  const location = useLocation();

  // 이전 페이지에서 전달된 templateId를 가져와서 상태에 저장
  const [templateId, setTemplateId] = useState(location.state?.templateId || null);  // templateId를 상태로 저장


  const [showReward, setShowReward] = useState(false);
  const [feedbackData, setFeedbackData] = useState(null);
  const [templateData, setTemplateData] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);
  const [lives, setLives] = useState(2);
  const [showHint, setShowHint] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [imageSelectionOrder, setImageSelectionOrder] = useState({});

  useEffect(() => {
    if (!templateId) {
      console.error('Template ID is missing');
      return;
    }


    const fetchTemplateData = async () => {
      const accessToken = localStorage.getItem("key");
      if (!accessToken) {
        console.log('Authentication required');
        return;
      }

      try {
        const response = await axios.get(`https://maeummal.com/template2/get?template2Id=${templateId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });

        if (response.data.isSuccess && response.data.data) {
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
  }, [templateId]);  // templateId가 변경될 때마다 데이터를 새로 가져옵니다.


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
      awardBadge();
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
        answerList: userAnswerOrder.map(String),
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

  const awardBadge = async () => {
    const accessToken = localStorage.getItem("key");
    const memberId = 22;
    const templateType = "TEMPLATE2";
    
    try {
      const response = await axios.post(
        `https://maeummal.com/badges/award?memberId=${memberId}&templateType=${templateType}`, 
        {}, 
        {
          headers: { Authorization: `Bearer ${accessToken}` }
        }
      );

      if (!response.data.isSuccess) {
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
        {/* templateData.storyCardEntityList가 존재할 때만 map 호출 */}
        {templateData && templateData.storyCardEntityList ? (
          templateData.storyCardEntityList.map(card => (
            <C.TemplateBox key={card.storyCardId} onClick={() => toggleSelectImage(card.storyCardId)} style={{ position: 'relative' }}>
              <img src={card.image} alt={`Story card ${card.storyCardId}`} style={{ border: selectedImages.some(item => item.id === card.storyCardId) ? '4px solid #ACAACC' : '4px solid #eee' }} />
              {imageSelectionOrder[card.storyCardId] && (
                <div style={{ position: 'absolute', top: '5px', right: '5px', color: 'white', fontWeight: 'bold', background: 'rgba(0, 0, 0, 0.5)', padding: '2px 6px', borderRadius: '50%' }}>
                  {imageSelectionOrder[card.storyCardId]}
                </div>
              )}
            </C.TemplateBox>
          ))
        ) : (
          <p>Loading cards...</p>
        )}
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
