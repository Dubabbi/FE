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
import Reward from '../Reward/Reward4';
import Toast from '/src/assets/icon/errortoast.svg';
import LoadingModal from '../ImageModal/LoadingModal';

const Template4Std = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userId, setUserId] = useState(null);
  // templateId를 상태로 저장
  const [templateId, setTemplateId] = useState(location.state?.templateId || null);

  const [showReward, setShowReward] = useState(false);
  const [feedbackData, setFeedbackData] = useState(null);
  const [templateData, setTemplateData] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);
  const [lives, setLives] = useState(2);
  const [showHint, setShowHint] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCard, setSelectedCard] = useState(null);
  const [imageSelectionOrder, setImageSelectionOrder] = useState({});
  const [firstFeedback, setFirstFeedback] = useState(null);  
  const [isCreatingFeedback, setIsCreatingFeedback] = useState(false);  
  useEffect(() => {
    const fetchUserId = async () => {
      const accessToken = localStorage.getItem('key');
      if (!accessToken) {
        console.error('Authentication token is missing');
        return;
      }
  
      try {
        const response = await axios.get('https://maeummal.com/auth/userId', {
          headers: { Authorization: `Bearer ${accessToken}` }
        });
        if (response.status === 200) {
          console.log('Fetched user ID:', response.data); // Log to see what is actually returned
          setUserId(response.data); // Assuming the response is just the userId
        } else {
          throw new Error('Failed to fetch user ID');
        }
      } catch (error) {
        console.error('Error fetching user ID:', error.message || 'Unknown error');
      }
    };
  
    fetchUserId();
  }, []);
  
  // templateId를 기반으로 데이터를 가져옵니다.
  useEffect(() => {
    if (!templateId) {
      console.error('Template ID is missing');
      return;
    }
    setIsLoading(true); 
    const fetchTemplateData = async () => {
      const accessToken = localStorage.getItem("key");
      if (!accessToken) {
        console.log('Authentication required');
        return;
      }

      try {
        const response = await axios.get(`https://maeummal.com/template4/get?template4Id=${templateId}`, {
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

  const submitFeedback = async (userOrder) => {
    try {
      const accessToken = localStorage.getItem("key");
      const response = await axios.post('https://maeummal.com/feedback/create', {
        templateId: templateData.templateId,
        answerList: userOrder.map(String),
        studentId: userId,
        templateType: "TEMPLATE4",
        title: templateData.title,
        solution: templateData.description
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
      console.error('Error during feedback submission:', error);
    }
  };
  
  const handleSubmit = async () => {
    if (!templateData || !templateData.templateId) {
      console.error('Template data is missing, please try again.');
      return;
    }
  
    if (selectedImages.length !== templateData.storyCardEntityList.length) {
      alert('모든 카드를 선택해야 합니다.');
      return;
    }
  
    const userAnswerOrder = selectedImages
      .sort((a, b) => a.originalIndex - b.originalIndex)
      .map(item => {
        const card = templateData.storyCardEntityList.find(card => card.storyCardId === item.id);
        return card.answerNumber.toString();
      });
  
    const correctOrder = templateData.storyCardEntityList
      .map(card => card.answerNumber.toString())
      .sort((a, b) => a - b);
  
    const isCorrect = JSON.stringify(userAnswerOrder) === JSON.stringify(correctOrder);
  
    if (isCorrect) {
      setIsCreatingFeedback(true); // Set loading true only for final feedback submission
      await submitFeedback(userAnswerOrder);
      setShowReward(true);
      awardBadge();
      setIsCreatingFeedback(false); // Reset loading state after feedback is submitted
    } else {
      if (lives > 1) {
        setLives(lives - 1);
        setSelectedImages([]);
        setImageSelectionOrder({});
      } else {
        setLives(0);
        setShowHint(false);
        setSelectedImages([]);
        setImageSelectionOrder({});
        setIsCreatingFeedback(true); // Set loading true for final unsuccessful attempt
        await submitFeedback(userAnswerOrder);
        setIsCreatingFeedback(false); // Reset loading state after feedback is submitted
      }
    }
  };
  
  
  const submitFirstFeedback = async (userOrder) => {
    try {
      const accessToken = localStorage.getItem("key");
      const response = await axios.post('https://maeummal.com/feedback/createFirst', {
        templateId: templateData.templateId,
        answerList: userOrder.map(String),
        studentId: userId,
        templateType: "TEMPLATE4",
        solution: templateData.description 
      }, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
  
      if (response.data) {
        setFirstFeedback(response.data);
        setLives(response.data.heartCount);
        setShowHint(true);
        setSelectedImages([]); // 첫 번째 피드백 후 이미지 선택 초기화
        setImageSelectionOrder({}); // 첫 번째 피드백 후 이미지 넘버링 초기화
      } else {
        console.error('Failed to submit first feedback');
      }
    } catch (error) {
      console.error('Error submitting first feedback:', error);
    }
  };
  



  const awardBadge = async () => {
    if (userId !== null) {  // userId가 null이 아닌지 확인
      const accessToken = localStorage.getItem("key");
      const memberId = userId;
      const templateType = "TEMPLATE4";
      
      try {
        const response = await axios.post(
          `https://maeummal.com/badges/award?memberId=${memberId}&templateType=${templateType}`, 
          {}, 
          {
            headers: { Authorization: `Bearer ${accessToken}` }
          }
        );
  
        if (!response.data.isSuccess) {  // 응답 성공 여부 확인

        console.log('Badge awarded successfully:', response.data)}
      } catch (error) {
        console.error('Error awarding badge:', error.response ? error.response.data : error);  // 오류 응답 로그 개선
      }
    } else {
      console.error('UserId is null, cannot award badge');
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
        solution: templateData.description,
        cardData
      }
    });
  };

  if (isLoading || isCreatingFeedback) { // Show loading modal when fetching data or creating feedback
    return <LoadingModal isOpen={isLoading || isCreatingFeedback} />;
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
