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
import Reward from '../Reward/Reward4';
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
  const [imageSelectionOrder, setImageSelectionOrder] = useState({});

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
      // 이미지 선택
      const newImages = [...selectedImages, { id, answerNumber: cardInfo.answerNumber }];
      setSelectedImages(newImages);
  
      // 선택 순서 저장
      const newOrder = newImages.length; // 마지막 선택된 이미지이므로 총 길이가 새로운 순서가 됨
      setImageSelectionOrder(prev => ({ ...prev, [id]: newOrder }));
    } else {
      // 이미지 선택 취소
      const newImages = selectedImages.filter(item => item.id !== id);
      setSelectedImages(newImages);
  
      // 선택 순서에서 제거
      const newOrder = { ...imageSelectionOrder };
      delete newOrder[id];
      setImageSelectionOrder(newOrder);
    }
  };
  
  const handleSubmit = async () => {
    if (!templateData || !templateData.templateId) {
      console.error('Template data is missing, please try again.');
      return;
    }
  
    const userAnswerOrder = selectedImages.map(item => item.answerNumber);
    const correctOrder = templateData.storyCardEntityList
      .sort((a, b) => a.answerNumber - b.answerNumber)
      .map(card => card.answerNumber);
  
    const isCorrect = JSON.stringify(userAnswerOrder) === JSON.stringify(correctOrder);
  
    if (isCorrect) {
      await submitFeedback(userAnswerOrder);
      setShowReward(true);
      awardBadge();
    } else {
      if (lives > 1) {
        setLives(lives - 1);
        setShowHint(true);
        setSelectedImages([]); // 정답이 아닐 경우 선택 초기화
      } else {
        setLives(0);
        setShowHint(false);
        await submitFeedback(userAnswerOrder);
      }
    }
  };
  const submitFeedback = async (userOrder) => {
    try {
      const accessToken = localStorage.getItem("token");
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
  

  
  const handleSelectCard = (index) => {
    setSelectedCard(index);
  };
  const awardBadge = async () => {
    const accessToken = localStorage.getItem("key"); // 액세스 토큰을 로컬 스토리지에서 가져옵니다.
    const memberId = 1; // 예시 memberId, 실제 사용자 ID로 교체해야 합니다.
    const templateType = "TEMPLATE4"; 
    
    try {
      const response = await axios.post(`https://maeummal.com/badges/award?memberId=${memberId}`, {
        templateType 
      }, {
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
            style={{ position: 'relative', border: selectedImages.some(item => item.id === card.storyCardId) ? '4px solid #ACAACC' : '4px solid #eee' }}
            onClick={() => toggleSelectImage(card.storyCardId)}
            selected={selectedCard === index}
          >
            <C.ImageList>
              <img src={card.image} alt={`Story card ${card.storyCardId}`} />
            </C.ImageList>
            <C.Story><p>{card.description}</p></C.Story>
            {imageSelectionOrder[card.storyCardId] && (
              <div style={{
                position: 'absolute', // 절대 위치 지정으로 상단 우측에 숫자 표시
                top: '5px', // 상단에서 5px
                right: '5px', // 우측에서 5px
                color: 'white',
                fontWeight: 'bold',
                background: 'rgba(0, 0, 0, 0.75)',
                padding: '2px 6px',
                borderRadius: '50%',
                fontSize: '0.75em' // 폰트 크기 조정
              }}>
                {imageSelectionOrder[card.storyCardId]}
              </div>
            )}
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
