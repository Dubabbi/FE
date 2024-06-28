// Template2Tchr.jsx
import React, { useState } from 'react';
import * as C from './CreateLessonStyle';
import * as L from '../LessonTchr/LessonStyle';
import * as D from '../WordCreateTchr/WordDetailStyle';
import Back from '/src/assets/icon/back.svg';
import add from '../../assets/icon/add.svg';
import createimg from '/src/assets/image/template/createimg.svg';
import send from '/src/assets/icon/send.svg';

const Template2Tchr = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = () => {
    console.log("Input Submitted:", inputValue);
    toggleModal(); // 제출 후 모달 닫기
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
          <C.Box><div><img onClick={toggleModal} src={add} alt = "단어"/></div></C.Box>
          <C.Box><div><img onClick={toggleModal} src={add} alt = "단어"/></div></C.Box>
          <C.Box><div><img onClick={toggleModal} src={add} alt = "단어"/></div></C.Box>
        </C.Line>
        {modalOpen && (
        <C.ModalOverlay>
          <C.ModalContent>
            <h1>이미지 생성</h1>
            <C.ModalImg>
              <div><img src={createimg} /></div>
            </C.ModalImg>
            <C.InputWrap>
            <C.InputField
              type="text"
              placeholder="텍스트 입력"
              value={inputValue}
              onChange={handleInputChange}
            />
            <C.Send><img src={send} /></C.Send>
            </C.InputWrap>
            <C.ModalButton onClick={handleSubmit}>제출</C.ModalButton>
          </C.ModalContent>
        </C.ModalOverlay>
      )}
      </L.LessonWrapper>
      <C.Card>
      <C.TopTab>해설 작성</C.TopTab> 
      <C.ContentInput
        as="textarea"
        type="text"
        placeholder="내용을 입력하세요."
      />
    </C.Card>
      <C.SubmitButton>제출</C.SubmitButton>
    </>
  );
};

export default Template2Tchr;