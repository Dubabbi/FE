import React, { useState } from 'react';
import * as C from './CreateLessonStyle';
import * as L from '../LessonTchr/LessonStyle';
import * as D from '../WordCreateTchr/WordDetailStyle';
import Back from '/src/assets/icon/back.svg';
import add from '../../assets/icon/add.svg';
import ModalComponent from '../ImageModal/ImageModal';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';

const Template2Tchr = () => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalCardIndex, setModalCardIndex] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const location = useLocation();
  const [description, setDescription] = useState(''); 
  const [hint, setHint] = useState(''); 
  const data = location.state;
  const [storyCards, setStoryCards] = useState([
    { image: '', answerNumber: 1 },
    { image: '', answerNumber: 2 },
    { image: '', answerNumber: 3 },
  ]);
  console.log(data);
  const toggleModal = (index) => {
    setModalCardIndex(index);
    setModalOpen(!modalOpen);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleModalSubmit();
    }
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleHintChange = (e) => {
    setHint(e.target.value);
  };

  
  const handleModalSubmit = async () => {
    try {
      const response = await axios.post('https://maeummal.com/ai/image', { prompt: inputValue });
      if (response.status === 200 && response.data) {
        const newStoryCards = [...storyCards];
        newStoryCards[modalCardIndex].image = response.data;
        setStoryCards(newStoryCards);
        setModalOpen(false);
      }
    } catch (error) {
      console.error('Error generating image or creating Template2:', error);
      alert('이미지 생성에 실패했습니다.');
    }};

    const handleSubmit = async () => {
      const payload = {
        title: data.title,
        description: description,
        hint: hint,
        imageNum: storyCards.length,
        type: data.difficulty,
        storyCardEntityList: storyCards.map(card => ({ image: card.image, answerNumber: card.answerNumber }))
      };
      try {
        const response = await axios.post('https://maeummal.com/template2/create', payload, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("key")}`,
          }
        });
        console.log('Response:', response.data);
        alert('강의가 성공적으로 생성되었습니다.');
        navigate('/lessontchr')
      } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
        alert('강의 생성에 실패했습니다.');
      }
    };
  

  return (
    <>
      <D.ImageWrap>
        <a href="/MainTchr"><img src={Back} alt="" /></a>
      </D.ImageWrap>
      <L.LessonWrapper>
        <L.Section>
          <h1>이미지 순서 배열하기</h1>
          <p>순서대로 이미지를 생성해 주세요.</p>
        </L.Section>
        <C.Line>
        {storyCards.map((card, index) => (
          <C.Box key={index}  
            style={{
              border: card.image ? 'none' : '5px solid #ACAACC'
            }}>
            <div onClick={() => toggleModal(index)}>
              <img
                style={{
                  width: card.image ? '100%' : '40%',
                  height: 'auto',
                  borderRadius: '1rem',
                  border: card.image ? '5px solid #ACAACC' : 'none'
                }}
                src={card.image || add}
                alt="Add Image"
              />
            </div>
          </C.Box>
        ))}
        </C.Line>
      </L.LessonWrapper>
        <C.HintWrapper>
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
      {modalOpen && (
        <ModalComponent
          isOpen={modalOpen}
          toggleModal={() => setModalOpen(false)}
          inputModalValue={inputValue}
          handleInputModalChange={handleInputChange}
          handleKeyPress={handleKeyPress}
          handleModalSubmit={handleModalSubmit}
          generatedImageUrl={storyCards[modalCardIndex]?.image}
        />
      )}
      <C.SubmitButton onClick={handleSubmit}>제출</C.SubmitButton>
    </>
  );
};

export default Template2Tchr;
