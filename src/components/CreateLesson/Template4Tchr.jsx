// Template2Tchr.jsx
import React, { useState } from 'react';
import * as C from './CreateLessonStyle';
import * as L from '../LessonTchr/LessonStyle';
import * as D from '../WordCreateTchr/WordDetailStyle';
import Back from '/src/assets/icon/back.svg';
import add from '../../assets/icon/add.svg';
import createimg from '/src/assets/image/template/createimg.svg';
import send from '/src/assets/icon/send.svg';
import Form from 'react-bootstrap/Form';

const Template4Tchr = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    numberOfStories: '1',
  });
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

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    if (name === 'numberOfWords') {
      adjustWordCards(parseInt(value, 10));
    }
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
      <D.Select style={{width: '20%', marginLeft: '7px', marginBottom: '5px'}}>
        <D.SecondTitle style={{minWidth: '80px'}}>조각 개수</D.SecondTitle>
        <Form.Select
          name="numberOfStories"
          value={formData.numberOfStories}
          onChange={handleSelectChange}
          style={{paddingLeft: '10px', paddingRight: '10px', fontSize: '1.5rem', borderRadius: '7px',  border: '1px solid #ACAACC', width: '200px', height: '36px',  marginLeft: '22%' }}
        >
      {Array.from({ length: 4 }, (_, i) => i + 1).map((number) => (
        <option key={number} value={number}>{number}개</option>
      ))}
        </Form.Select>
      </D.Select>
      <C.StoryWrap>
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
      </C.StoryWrap>
      </L.LessonWrapper>
      <C.SubmitButton>제출</C.SubmitButton>
    </>
  );
};

export default Template4Tchr;