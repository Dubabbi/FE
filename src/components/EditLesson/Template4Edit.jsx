import React, { useState, useEffect } from 'react';
import * as C from '../CreateLesson/CreateLessonStyle';
import * as L from '../LessonTchr/LessonStyle';
import * as D from '../WordCreateTchr/WordDetailStyle';
import Upload from '/src/assets/icon/uploadphoto.svg';
import Back from '/src/assets/icon/back.svg';
import My from '/src/assets/icon/phimg.svg'; 
import UploadPhoto from '../CreateLesson/UploadPhoto';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';

const Template4Edit = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [description, setDescription] = useState(''); 
  const [hint, setHint] = useState(''); 
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [modalCardIndex, setModalCardIndex] = useState(null); // 현재 이미지 업로드를 할 카드 인덱스
  const [storyCards, setStoryCards] = useState([
    { image: '', answerNumber: 1, imagePreviewUrl: My, description: '' },
    { image: '', answerNumber: 2, imagePreviewUrl: My, description: '' },
    { image: '', answerNumber: 3, imagePreviewUrl: My, description: '' },
  ]);
  
  useEffect(() => {
    const template4Id = 1; // 템플릿 ID
    const fetchTemplateData = async () => {
      const accessToken = localStorage.getItem('key');
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
          const templateData = response.data.data;
          setDescription(templateData.description);
          setHint(templateData.hint);
          setStoryCards(templateData.storyCardEntityList || []);
        } else {
          throw new Error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchTemplateData();
  }, [location.state?.template4Id]);
  
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleHintChange = (e) => {
    setHint(e.target.value);
  };

  const toggleUploadModal = (index) => {
    setModalCardIndex(index); // 클릭한 카드 인덱스 설정
    setIsUploadModalOpen(true); // 업로드 모달 열기
  };

  const handleAddImage = (file) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newStoryCards = [...storyCards];
        newStoryCards[modalCardIndex].imagePreviewUrl = reader.result; // 선택된 카드 인덱스의 이미지 업데이트
        setStoryCards(newStoryCards);
        setIsUploadModalOpen(false); // 이미지 업로드 후 모달 닫기
      };
      reader.readAsDataURL(file);
    }
  };

  const handleStoryCardChange = (index, value) => {
    const newStoryCards = [...storyCards];
    newStoryCards[index].description = value; // 스토리 카드의 설명 변경
    setStoryCards(newStoryCards);
  };

  const handleSubmit = async () => {
    const payload = {
      title: 'Example Title',  // title을 여기에 설정합니다.
      level: 5,  // level도 여기에 설정합니다.
      description,
      hint,
      storyCardEntityList: storyCards.map(card => ({
        image: card.image,
        answerNumber: card.answerNumber,
        description: card.description
      })),
    };

    try {
      const template4Id = 1; // 수정할 템플릿 ID를 가져옵니다.
      const response = await axios.patch(
        `https://thingproxy.freeboard.io/fetch/https://maeummal.com/template4/update?template4Id=${template4Id}`, // template4Id를 URL 파라미터로 전달
        payload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('key')}`, // 인증 토큰
          },
        }
      );
      if (response.data.isSuccess) {
        console.log('Response:', response.data);
        alert('템플릿이 성공적으로 수정되었습니다.');
        navigate('/lessontchr');
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
      alert('템플릿 수정에 실패했습니다.');
    }
  };

  return (
    <>
      <D.ImageWrap>
        <a href="/MainTchr">
          <img src={Back} alt="Back" />
        </a>
      </D.ImageWrap>
      <L.LessonWrapper>
        <L.Section>
          <h1>이야기 순서 배열하기</h1>
        </L.Section>
        <C.StoryWrap>
          <C.CardContainer>
            {storyCards.map((card, index) => (
              <C.SelectCard key={index}>
                <C.SelectBox>
                  <img
                    src={card.imagePreviewUrl}
                    alt="Preview"
                    style={{
                      borderRadius: '7px',
                      border: '4px solid #ACAACC',
                      width: 'auto',
                      height: '93%',
                      maxWidth: '93%',
                      objectFit: 'cover',
                      maxHeight: '100%',
                      marginLeft: '0px'
                    }}
                  />
                </C.SelectBox>
                <C.StoryField
                  type="text"
                  placeholder="이야기 입력"
                  as="textarea"
                  value={card.description}
                  onChange={(e) => handleStoryCardChange(index, e.target.value)}
                  style={{ backgroundColor: '#FCFBFB'}}
                />
              </C.SelectCard>
            ))}
          </C.CardContainer>
          <div style={{ width: '86%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginLeft: '7%', marginTop: '2%' }}>
            {storyCards.map((_, index) => (
              <C.Upload
                key={index}
                src={Upload}
                alt="Upload Photo"
                onClick={() => toggleUploadModal(index)}
              />
            ))}
          </div>
        </C.StoryWrap>
      </L.LessonWrapper>
      <C.HintWrapper style={{marginTop: '3%'}}>
        <C.HintGroup>
          <C.Label>해설</C.Label>
          <C.HintBox style={{ minWidth: '200px' }}>
            <Form.Control
              type="text"
              placeholder="해설을 입력하세요"
              name="description"
              value={description}
              onChange={handleDescriptionChange}
            />
          </C.HintBox>
        </C.HintGroup>
        <C.HintGroup>
          <C.Label>힌트</C.Label>
          <C.HintBox style={{ minWidth: '200px' }}>
            <Form.Control
              type="text"
              placeholder="문제 힌트를 입력하세요"
              name="hint"
              value={hint}
              onChange={handleHintChange}
            />
          </C.HintBox>
        </C.HintGroup>
      </C.HintWrapper>
      <C.SubmitButton onClick={handleSubmit}>제출</C.SubmitButton>

      <UploadPhoto
        isOpen={isUploadModalOpen}
        toggleModal={() => setIsUploadModalOpen(false)}
        handleAddImage={handleAddImage}
      />
    </>
  );
};

export default Template4Edit;
