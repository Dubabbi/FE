import React, { useState } from 'react';
import * as C from './CreateLessonStyle';
import * as L from '../LessonTchr/LessonStyle';
import * as D from '../WordCreateTchr/WordDetailStyle';
import Upload from '/src/assets/icon/uploadphoto.svg';
import Back from '/src/assets/icon/back.svg';
import My from '/src/assets/icon/phimg.svg'; 
import UploadPhoto from './UploadPhoto';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';

const Template4Tchr = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state || {};  // 안전하게 데이터를 처리
  const [description, setDescription] = useState(''); 
  const [hint, setHint] = useState(''); 
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [modalCardIndex, setModalCardIndex] = useState(null);
  const [storyCards, setStoryCards] = useState([
    { image: '', answerNumber: 1, imagePreviewUrl: My, description: '' },
    { image: '', answerNumber: 2, imagePreviewUrl: My, description: '' },
    { image: '', answerNumber: 3, imagePreviewUrl: My, description: '' },
  ]);

  const handleDescriptionChange = e => setDescription(e.target.value);
  const handleHintChange = e => setHint(e.target.value);

  const toggleUploadModal = index => {
    setModalCardIndex(index);
    setIsUploadModalOpen(true);
  };

  const handleAddImage = async (file) => {
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('id', '3');

      try {
        const response = await axios.post('https://maeummal.com/template4/upload', formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          }
        });
        if (response.data.isSuccess) {
          const newStoryCards = [...storyCards];
          newStoryCards[modalCardIndex].image = response.data.data.url;
          newStoryCards[modalCardIndex].imagePreviewUrl = response.data.data.url;
          setStoryCards(newStoryCards);
        } else {
          alert(`이미지 업로드에 실패했습니다: ${response.data.message}`);
        }
      } catch (error) {
        alert(`이미지 업로드 중 오류가 발생했습니다: ${error.toString()}`);
      } finally {
        setIsUploadModalOpen(false);
      }
    }
  };

  // story -> description으로 변경
  const handleStoryCardChange = (index, value) => {
    const newStoryCards = storyCards.map((card, i) =>
      i === index ? { ...card, description: value } : card
    );
    setStoryCards(newStoryCards);
  };

  const handleSubmit = async () => {
    const payload = {
      title: data.title,
      description: description,
      level: data.level,
      hint: hint,
      type: data.content,
      storyCardEntityList: storyCards.map(card => ({
        image: card.image, 
        answerNumber: card.answerNumber,
        description: card.description // 여기서 story 대신 description 사용
      }))
    };
    try {
      const response = await axios.post('https://maeummal.com/template4/create', payload, {
        headers: { Authorization: `Bearer ${localStorage.getItem("key")}` }
      });
      alert('강의가 성공적으로 생성되었습니다.');
      navigate('/lessontchr');
    } catch (error) {
      alert(`강의 생성에 실패했습니다: ${error.response ? error.response.data.message : error.message}`);
    }
  };

  return (
    <>
      <D.ImageWrap>
        <a href="/MainTchr"><img src={Back} alt="Back" /></a>
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
                  <img src={card.imagePreviewUrl} alt="Preview" style={{
                    borderRadius: '7px',
                    border: '4px solid #ACAACC',
                    width: 'auto',
                    height: '93%',
                    maxWidth: '93%',
                    objectFit: 'cover',
                    maxHeight: '100%',
                    marginLeft: '0px'
                  }} />
                </C.SelectBox>
                <C.StoryField
                  type="text"
                  placeholder="이야기 입력"
                  as="textarea"
                  value={card.description} // story 대신 description 사용
                  onChange={e => handleStoryCardChange(index, e.target.value)}
                  style={{ backgroundColor: '#FCFBFB' }}
                />
              </C.SelectCard>
            ))}
          </C.CardContainer>
          <div style={{ width: '100%', gap: '1%', display: 'flex', flexDirection: 'row', justifyContent: 'space-around', marginTop: '2%' }}>
            {storyCards.map((_, index) => (
              <C.Upload key={index} src={Upload} alt="Upload Photo" onClick={() => toggleUploadModal(index)} />
            ))}
          </div>
        </C.StoryWrap>
      </L.LessonWrapper>
      <C.HintWrapper style={{ marginTop: '3%' }}>
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
      <UploadPhoto isOpen={isUploadModalOpen} toggleModal={() => setIsUploadModalOpen(false)} handleAddImage={handleAddImage} />
    </>
  );
};

export default Template4Tchr;
