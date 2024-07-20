// Template2Tchr.jsx
import React, { useState } from 'react';
import * as C from './CreateLessonStyle';
import * as L from '../LessonTchr/LessonStyle';
import * as D from '../WordCreateTchr/WordDetailStyle';
import Back from '/src/assets/icon/back.svg';
import add from '../../assets/icon/add.svg';
import ModalComponent from '../ImageModal/ImageModal';

const Template2Tchr = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [generatedImageUrl, setGeneratedImageUrl] = useState(null);

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
      const response = await axios.post('http://ec2-3-34-149-148.ap-northeast-2.compute.amazonaws.com:8080/api/ai/generateImage', {
        prompt: inputValue,
      });
      setGeneratedImageUrl(response.data.imageUrl);
    } catch (error) {
      console.error('Error generating image:', error);
      alert('이미지 생성에 실패했습니다.');
    }
  };

  const handleRegenerateImage = async () => {
    try {
      const response = await axios.post('http://ec2-3-34-149-148.ap-northeast-2.compute.amazonaws.com:8080/api/ai/generateImage', {
        prompt: inputValue,
      });
      setGeneratedImageUrl(response.data.imageUrl);
    } catch (error) {
      console.error('Error regenerating image:', error);
      alert('이미지 다시 생성에 실패했습니다.');
    }
  };

  const handleAddImage = () => {
    if (generatedImageUrl) {
      console.log("Image Added:", generatedImageUrl);
      setGeneratedImageUrl(null);
      toggleModal();
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
          <C.Box><div><img onClick={toggleModal} src={add} alt="단어" /></div></C.Box>
          <C.Box><div><img onClick={toggleModal} src={add} alt="단어" /></div></C.Box>
          <C.Box><div><img onClick={toggleModal} src={add} alt="단어" /></div></C.Box>
        </C.Line>
      </L.LessonWrapper>
      <ModalComponent
        isOpen={modalOpen}
        toggleModal={toggleModal}
        inputModalValue={inputValue}
        handleInputModalChange={handleInputChange}
        handleKeyPress={handleKeyPress}
        handleModalSubmit={handleModalSubmit}
        handleRegenerateImage={handleRegenerateImage}
        handleAddImage={handleAddImage}
        generatedImageUrl={generatedImageUrl}
      />
      <L.LessonWrapper>
        <C.Card>
          <C.TopTab>해설 작성</C.TopTab>
        </C.Card>
        <C.ContentInput
            as="textarea"
            type="text"
            placeholder="내용을 입력하세요."
          />
        <C.SubmitButton>제출</C.SubmitButton>
      </L.LessonWrapper>
    </>
  );
};

export default Template2Tchr;
