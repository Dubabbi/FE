import React, { useState } from 'react';
import * as C from './CreateLessonStyle';
import * as L from '../LessonTchr/LessonStyle';
import * as D from '../WordCreateTchr/WordDetailStyle';
import Back from '/src/assets/icon/back.svg';
import add from '../../assets/icon/add.svg';
import ModalComponent from '../ImageModal/ImageModal';
import axios from 'axios';

const Template2Tchr = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalCardIndex, setModalCardIndex] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [storyCards, setStoryCards] = useState([
    { image: '', answerNumber: 1 },
    { image: '', answerNumber: 2 },
    { image: '', answerNumber: 3 },
  ]);

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
  const handleModalSubmit = async () => {
    try {
      const response = await axios.post('https://maeummal.com/ai/image', { prompt: inputValue });
      if (response.data.imageUrl) {
        const newStoryCards = [...storyCards];
        newStoryCards[modalCardIndex].image = response.data.imageUrl;
        setStoryCards(newStoryCards);
        setModalOpen(false);
  
        const payload = {
          title: "Example Title",
          description: "Example Description",
          hint: "Example Hint",
          imageNum: storyCards.length,
          type: "TEMPLATE2",
          storyCardEntityList: storyCards.map(card => ({ image: card.image, answerNumber: card.answerNumber }))
        };
  
        const token = localStorage.getItem("key"); 
        const templateResponse = await axios.post('https://maeummal.com/template2/create', payload, {
          headers: { Authorization: `Bearer ${token}` }
        });
  
        if (templateResponse.data.isSuccess) {
          console.log("Template2 created successfully");
        } else {
          throw new Error('Template2 creation failed');
        }
      }
    } catch (error) {
      console.error('Error generating image or creating Template2:', error);
      alert('이미지 생성 또는 템플릿 생성에 실패했습니다.');
    }};


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
            <C.Box key={index}>
              <div onClick={() => toggleModal(index)}>
              <img src={card.image || add} alt="Add Image" />
              </div>
            </C.Box>
          ))}
        </C.Line>
      </L.LessonWrapper>
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
      <C.SubmitButton onClick={() => console.log('Submit Action')}>제출</C.SubmitButton>
    </>
  );
};

export default Template2Tchr;
