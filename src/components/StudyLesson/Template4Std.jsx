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
  const [lives, setLives] = useState(2); // 하트 수 관리
  const [showHint, setShowHint] = useState(false); // 힌트 표시 여부
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태
  const [selectedCard, setSelectedCard] = useState(null); // 선택된 카드
  const [imageSelectionOrder, setImageSelectionOrder] = useState({}); // 이미지 선택 순서
  const [firstFeedback, setFirstFeedback] = useState(null); // 1차 피드백 response

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

  // 1차 피드백 요청을 보내는 함수
  const submitFirstFeedback = async (userOrder) => {
    try {
      const accessToken = localStorage.getItem("token");
      const response = await axios.post('https://maeummal.com/feedback/createFirst', {
        templateId: templateData.templateId,
        answerList: userOrder.map(String),
        studentId: 25,
        templateType: "TEMPLATE4"
      }, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });

      if (response.data) {
        setFirstFeedback(response.data); // 1차 피드백 응답 저장
        setLives(response.data.heartCount); // 피드백에 따른 하트 수 업데이트
        setShowHint(true); // 힌트 표시
      } else {
        console.error('Failed to submit first feedback');
      }
    } catch (error) {
      console.error('Error submitting first feedback:', error);
    }
  };

  // 이미지 선택 토글 함수
  const toggleSelectImage = (id) => {
    const cardInfo = templateData.storyCardEntityList.find(card => card.storyCardId === id);
    const index = selectedImages.findIndex(item => item.id === id);
  
    if (index === -1) {
      const newImages = [...selectedImages, { id, answerNumber: cardInfo.answerNumber }];
      setSelectedImages(newImages);
      const newOrder = newImages.length;
      setImageSelectionOrder(prev => ({ ...prev, [id]: newOrder }));
    } else {
      const newImages = selectedImages.filter(item => item.id !== id);
      setSelectedImages(newImages);
      const newOrder = { ...imageSelectionOrder };
      delete newOrder[id];
      setImageSelectionOrder(newOrder);
    }
  };

  // 제출 버튼을 눌렀을 때 호출되는 함수
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
      await submitFeedback(userAnswerOrder); // 최종 피드백 전송
      setShowReward(true);
      awardBadge(); // 보상 지급
    } else {
      if (lives > 1) {
        setLives(lives - 1);
        setSelectedImages([]);
        await submitFirstFeedback(userAnswerOrder); // 1차 피드백 전송
      } else {
        setLives(0);
        await submitFeedback(userAnswerOrder); // 최종 피드백 전송
      }
    }
  };

  // 최종 피드백 전송 함수
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

  // 보상 지급 함수
  const awardBadge = async () => {
    const accessToken = localStorage.getItem("key");
    const memberId = 22;
    const templateType = "TEMPLATE4";
    
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
    } catch (error) {
      console.error('Error awarding badge:', error);
    }
  };

  const handleShowReward = (show) => {
    setShowReward(show);
  };

  const handleCloseReward = () => {
    const cardData = templateData.storyCardEntityList.map(card => ({
      description: card.description,
      image: card.image,
      storyCardId: card.storyCardId
    }));
  
    setShowReward(false);
  
    navigate('/Feedback4', {
      state: {
        feedbackData,
        description: templateData.description,
        cardData
      }
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
        <D.Select style={{width: '20%', marginLeft: '7px', marginBottom: '5px'}}></D.Select>
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
                    position: 'absolute',
                    top: '5px',
                    right: '5px',
                    color: 'white',
                    fontWeight: 'bold',
                    background: 'rgba(0, 0, 0, 0.75)',
                    padding: '2px 6px',
                    borderRadius: '50%',
                    fontSize: '0.75em'
                  }}>
                    {imageSelectionOrder[card.storyCardId]}
                  </div>
                )}
              </C.SelectCard>
            ))}
          </C.CardContainer>
        </C.StoryWrap>
      </L.LessonWrapper>

      {/* Show hint after 1차 피드백 */}
      {showHint && firstFeedback && (
        <C.HintWrapper style={{border: 'none', position: 'fixed', width: '60%', marginLeft: '20%', marginTop: '-4%'}}>
          <C.HintToast style={{ minWidth: '200px', backgroundColor: '#fff' }}>
            <img src={Toast} alt="Hint" />{firstFeedback.hint ? firstFeedback.hint : '힌트가 없습니다.'}
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
