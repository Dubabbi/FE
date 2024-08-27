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

// 이미지 임포트
import image1 from '/src/assets/image/template/example1.svg';
import image2 from '/src/assets/image/template/example2.svg';
import image3 from '/src/assets/image/template/example3.svg';

const Template4Std = () => {
  const navigate = useNavigate();
  const [showReward, setShowReward] = useState(false);
  const [feedbackData, setFeedbackData] = useState(null);
  const [templateData, setTemplateData] = useState({
    storyCardEntityList: [
      { storyCardId: 1, image: image1, answerNumber: 1, description: '주인공 칼은 모험을 떠나고 싶은 아내의 꿈을 이뤄주고 싶었지만, 아내가 세상을 떠날 때까지 꿈을 이뤄주지 못했어요.' },
      { storyCardId: 2, image: image2, answerNumber: 2, description: '아내와의 추억이 가득한 집을 철거할 위기에 처하자, 수천 개의 풍선을 매달아 집을 통째로 남아메리카로 날려 버려요.' },
      { storyCardId: 3, image: image3, answerNumber: 3, description: '황야의 탐험가 러셀과 강아지와 함께 섬에서 어려운 상황들을 이겨내며 아내와의 추억을 회상하고 삶의 의미와 가치를 깨닫게 돼요.' }
    ]
  }); // 임시 이미지 데이터로 초기 설정
  const [selectedImages, setSelectedImages] = useState([]);
  const [lives, setLives] = useState(2);
  const [showHint, setShowHint] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
    // 실제 데이터 페칭 로직은 필요에 따라 활성화
    setIsLoading(false); // 테스트를 위해 로딩을 false로 설정
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
    setShowReward(true);
    navigate('/feedback4');
  };

  {/*
  const submitFeedback = async (userOrder) => {
    try {
      const accessToken = localStorage.getItem("key");
      const headers = {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json' 
      };
      const payload = {
        templateId: templateData.templateId,
        answerList: userOrder.map(String), 
        studentId: 25,
        templateType: "TEMPLATE4" 
      };

      const response = await axios.post('https://maeummal.com/feedback/create', payload, { headers });
  
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
  */}

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
      setShowReward(true);
    } else {
      if (lives > 1) {
        setLives(lives - 1);
        setShowHint(true);
        setSelectedImages([]);
      } else {
        setLives(0);
        setShowHint(false);
        await submitFeedback(userAnswerOrder);
        setShowReward(true);
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
    return <p>로딩 중...</p>;
  }

  return (
    <>
      <D.ImageWrap>
        <a href="/MainStd"><img src={Back} alt="뒤로 가기" /></a>
      </D.ImageWrap>
      <D.HeartWrap>
        {Array.from({ length: 2 }).map((_, index) => (
          <img key={index} src={index < (2 - lives) ? White : Pink} alt="Heart" />
        ))}
      </D.HeartWrap>
      <L.LessonWrapper>
        <L.Section>
          <h1>이야기 순서 배열하기</h1>
          <p>애니메이션 up 이야기 알아보기</p>
          </L.Section>
        <D.Select style={{width: '20%', marginLeft: '7px', marginBottom: '5px'}}>
        </D.Select>        
        <C.StoryWrap>
          <C.CardContainer>
          {templateData.storyCardEntityList.map((card, idx) => (
            <C.SelectCard
              key={card.storyCardId} 
              onClick={() => toggleSelectImage(card.storyCardId)}
              style={{ border: selectedImages.some(item => item.id === card.storyCardId) ? '4px solid #ACAACC' : '4px solid #eee' }}
              selected={selectedCard === idx} 
            >
              <C.StoryList>
                <img style={{height: '100%', border: 'none'}} src={card.image} alt={`Story card ${card.storyCardId}`} />
              </C.StoryList>
              <C.Story><p style={{textAlign: 'left', fontSize: '1.2rem'}}>{card.description}</p></C.Story>
            </C.SelectCard>
          ))}
          </C.CardContainer>
        </C.StoryWrap>
      </L.LessonWrapper>
      {showHint && (
        <C.HintWrapper style={{border: 'none', position: 'fixed', width: '60%', marginLeft: '20%', marginTop: '-4%'}}>
          <C.HintToast style={{ minWidth: '200px', backgroundColor: '#fff' }}>
            <img src={Toast} alt="Hint" /><p>주인공이 왜 모험을 시작했는지, 그리고 모험을 통해 깨닫게 된 점을 생각해</p>
          </C.HintToast>
        </C.HintWrapper>
      )}
      <C.SubmitButton onClick={handleShowReward}>제출</C.SubmitButton>
      {showReward && (
        <ModalOverlay>
          <Reward onClose={handleCloseReward} />
        </ModalOverlay>
      )}
    </>
  );
};

export default Template4Std;
