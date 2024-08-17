import React, { useState } from 'react';
import * as C from './CreateLessonStyle';
import * as L from '../LessonTchr/LessonStyle';
import * as D from '../WordCreateTchr/WordDetailStyle';
import Back from '/src/assets/icon/back.svg';
import add from '../../assets/icon/add.svg';
import Form from 'react-bootstrap/Form';
import ModalComponent from '../ImageModal/ImageModal';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const Template4Tchr = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalCardIndex, setModalCardIndex] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const location = useLocation();
  const data = location.state;
  const [generatedImageUrl, setGeneratedImageUrl] = useState(null);
  const [storyCards, setStoryCards] = useState([
    { story: '', imagePreviewUrl: null },
    { story: '', imagePreviewUrl: null },
    { story: '', imagePreviewUrl: null }
  ]);

  const toggleModal = (index) => {
    setModalOpen(!modalOpen);
    setModalCardIndex(index);
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
      if (response.data) {
        const newStoryCards = [...storyCards];
        newStoryCards[modalCardIndex].imagePreviewUrl = response.data;
        setStoryCards(newStoryCards);
        toggleModal(null);
      }
    } catch (error) {
      console.error('이미지 생성 실패:', error);
      alert('이미지 생성에 실패했습니다.');
    }
  };

  const handleStoryCardChange = (index, value) => {
    const newStoryCards = [...storyCards];
    newStoryCards[index].story = value;
    setStoryCards(newStoryCards);
  };

  return (
    <>
      <D.ImageWrap>
        <a href="/MainTchr"><img src={Back} alt="" /></a>
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
                {!card.imagePreviewUrl && (
                  <div>
                    <img src={add} onClick={() => toggleModal(index)} alt="Add icon" />
                    </div>
                )}
                  {card.imagePreviewUrl && (
                    <div style={{border: 'none'}}>
                    <img
                      src={card.imagePreviewUrl}
                      alt="Preview"
                      style={{ borderRadius: '7px', border: '4px solid #ACAACC', width: 'auto', height: '100%', marginLeft: '0px' }}
                    />
                    </div>
                  )}
                </C.SelectBox>
                <C.StoryField
                  type="text"
                  placeholder="이야기 입력"
                  as="textarea"
                  value={card.story}
                  onChange={(e) => handleStoryCardChange(index, e.target.value)}
                />
              </C.SelectCard>
            ))}
          </C.CardContainer>
        </C.StoryWrap>
        <ModalComponent
          isOpen={modalOpen}
          toggleModal={() => toggleModal(null)}
          inputModalValue={inputValue}
          handleInputModalChange={handleInputChange}
          handleKeyPress={handleKeyPress}
          handleModalSubmit={handleModalSubmit}
          generatedImageUrl={generatedImageUrl}
        />
        <C.SubmitButton>제출</C.SubmitButton>
      </L.LessonWrapper>
    </>
  );
};

export default Template4Tchr;
