import React, { useState } from 'react';
import * as C from './CreateLessonStyle';
import * as L from '../LessonTchr/LessonStyle';
import * as D from '../WordCreateTchr/WordDetailStyle';
import Back from '/src/assets/icon/back.svg';
import add from '../../assets/icon/add.svg';
import Form from 'react-bootstrap/Form';
import ModalComponent from '../ImageModal/ImageModal';
import axios from 'axios';

const Template4Tchr = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalCardIndex, setModalCardIndex] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [generatedImageUrl, setGeneratedImageUrl] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    numberOfStories: '1',
  });
  const [storyCards, setStoryCards] = useState([{
    story: '',
    imagePreviewUrl: null
  }]);

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
    const promptValue = typeof inputValue === 'string' ? inputValue : String(inputValue);
    try {
      const response = await axios.post('https://maeummal.com/ai/image', {
        prompt: promptValue,
      });
      setGeneratedImageUrl(response.data.imageUrl);
    } catch (error) {
      console.error('Error generating image:', error);
      alert('이미지 생성에 실패했습니다.');
    }
  };

  const handleAddImage = () => {
    if (generatedImageUrl && modalCardIndex !== null) {
      const newStoryCards = [...storyCards];
      newStoryCards[modalCardIndex].imagePreviewUrl = generatedImageUrl;
      setStoryCards(newStoryCards);
      setGeneratedImageUrl(null);
      toggleModal(null);
    }
  };

  const handleRegenerateImage = async () => {
    const promptValue = typeof inputValue === 'string' ? inputValue : String(inputValue);
    try {
      const response = await axios.post('https://maeummal.com/ai/image', {
        prompt: promptValue,
      });
      if (response.status === 200) {
      setGeneratedImageUrl(response.data.imageUrl);
      }
    } catch (error) {
      console.error('Error regenerating image:', error);
      alert('이미지 다시 생성에 실패했습니다.');
    }
  };

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    if (name === 'numberOfStories') {
      adjustStoryCards(parseInt(value, 10));
    }
  };

  const adjustStoryCards = (number) => {
    const currentLength = storyCards.length;
    const newStoryCards = storyCards.slice(0, number);
    while (newStoryCards.length < number) {
      newStoryCards.push({ story: '', imagePreviewUrl: null });
    }
    setStoryCards(newStoryCards);
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
        <D.Select style={{ width: '20%', marginLeft: '7px', marginBottom: '5px' }}>
          <C.Line>
            <D.SecondTitle style={{ minWidth: '80px' }}>조각 개수</D.SecondTitle>
            <Form.Select
              name="numberOfStories"
              value={formData.numberOfStories}
              onChange={handleSelectChange}
              style={{ paddingLeft: '10px', paddingRight: '130px', fontSize: '1.5rem', borderRadius: '7px', border: '1px solid #ACAACC', width: '200px', height: '36px', marginLeft: '22%', marginBottom: '10px' }}
            >
              {Array.from({ length: 4 }, (_, i) => i + 1).map((number) => (
                <option key={number} value={number}>{number}개</option>
              ))}
            </Form.Select>
          </C.Line>
        </D.Select>
        <C.StoryWrap>
          <C.CardContainer>
            {storyCards.map((card, index) => (
              <C.SelectCard key={index}>
                <C.SelectBox>
                  <div>
                    <img src={add} onClick={() => toggleModal(index)} alt="Add icon" />
                  </div>
                  {card.imagePreviewUrl && (
                    <img
                      src={card.imagePreviewUrl}
                      alt="Preview"
                      style={{ borderRadius: '7px', border: '4px solid #ACAACC', width: '100%', height: 'auto', marginLeft: '20%' }}
                    />
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
      </L.LessonWrapper>
      <ModalComponent
        isOpen={modalOpen}
        toggleModal={() => toggleModal(null)}
        inputModalValue={inputValue}
        handleInputModalChange={handleInputChange}
        handleKeyPress={handleKeyPress}
        handleModalSubmit={handleModalSubmit}
        handleRegenerateImage={handleRegenerateImage}
        handleAddImage={handleAddImage}
        generatedImageUrl={generatedImageUrl}
        placeholder="Enter prompt"
      />
      <C.SubmitButton>제출</C.SubmitButton>
    </>
  );
};

export default Template4Tchr;
