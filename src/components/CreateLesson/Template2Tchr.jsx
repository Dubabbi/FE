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
  const [inputValue, setInputValue] = useState('');
  const [generatedImageUrl, setGeneratedImageUrl] = useState(null);
  const [storyCards, setStoryCards] = useState([
    { image: '', answerNumber: 1 },
    { image: '', answerNumber: 2 },
    { image: '', answerNumber: 3 },
  ]);

  const toggleModal = () => {
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
      const response = await axios.post('https://maeummal.com/ai/image', {
        prompt: inputValue,
      });
      if (response.data.imageUrl) {
        setGeneratedImageUrl(response.data.imageUrl);
        updateStoryCardImage(response.data.imageUrl);
      }
    } catch (error) {
      console.error('Error generating image:', error);
      alert('이미지 생성에 실패했습니다.');
    }
  };

  const updateStoryCardImage = (imageUrl) => {
    const newStoryCards = storyCards.map(card => ({
      ...card,
      image: imageUrl,
    }));
    setStoryCards(newStoryCards);
  };

  const handleSubmit = async () => {
    const payload = {
      title: "Template2 Example",
      description: "A simple description of the template",
      hint: "Order the images correctly",
      imageNum: storyCards.length,
      type: "TEMPLATE2",
      storyCardEntityList: storyCards,
    };

    try {
      const response = await axios.post('https://maeummal.com/template2/create', payload);
      if (response.data.isSuccess) {
        console.log("Template2 created successfully");
      } else {
        throw new Error('Template2 creation failed');
      }
    } catch (error) {
      console.error('Failed to create Template2:', error);
      alert('템플릿 생성에 실패했습니다.');
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
            <C.Box key={index}>
              <div><img onClick={() => toggleModal()} src={add} alt="Add Image" /></div>
              {card.image && <img src={card.image} alt="Story Image" />}
            </C.Box>
          ))}
        </C.Line>
      </L.LessonWrapper>
      <ModalComponent
        isOpen={modalOpen}
        toggleModal={toggleModal}
        inputModalValue={inputValue}
        handleInputModalChange={handleInputChange}
        handleKeyPress={handleKeyPress}
        handleModalSubmit={handleModalSubmit}
        generatedImageUrl={generatedImageUrl}
      />
      <C.SubmitButton onClick={handleSubmit}>제출</C.SubmitButton>
    </>
  );
};

export default Template2Tchr;
