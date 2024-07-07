// Template2Tchr.jsx
import React, { useState } from 'react';
import styled from 'styled-components';
import * as C from './CreateLessonStyle';
import * as L from '../LessonTchr/LessonStyle';
import * as D from '../WordCreateTchr/WordDetailStyle';
import Back from '/src/assets/icon/back.svg';
import add from '../../assets/icon/add.svg';
import createimg from '/src/assets/image/template/createimg.svg';
import send from '/src/assets/icon/send.svg';
import Form from 'react-bootstrap/Form';

const CardContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 90%;
  margin-left: 5%;
  gap: 2%;
`;

const Card = styled.div`
  width: 30%;
  background: #FFFFFF;
  border: 1px solid #ddd;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ImageBox = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  div {
    width: 80%;
    height: 170px;
    border: 2px solid #F6F6F6;
    border-radius: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  img {
    cursor: pointer;
    width: 30%;
    max-height: 100%;
  }
`;

const InputField = styled.input`
  width: 90%;
  padding: 10px;
  resize: none;
  margin: 10px;
  font-size: 1vw;
  border: none;
  border-radius: 5px;
  background: #F6F6F6;
  color: #777777;
  text-align: center;
  height: 100px;
  outline: none; 
  &:focus {
    border: 2px solid #777777; 
  }

  &::placeholder {
    color: #777777;
  }
`;


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
      <C.Line>
        <D.SecondTitle style={{minWidth: '80px'}}>조각 개수</D.SecondTitle>
        <Form.Select
          name="numberOfStories"
          value={formData.numberOfStories}
          onChange={handleSelectChange}
          style={{paddingLeft: '10px', paddingRight: '130px', fontSize: '1.5rem', borderRadius: '7px',  
          border: '1px solid #ACAACC', width: '200px', height: '36px',  marginLeft: '22%', marginBottom: '10px' }}
        >
          {Array.from({ length: 4 }, (_, i) => i + 1).map((number) => (
            <option key={number} value={number}>{number}개</option>
          ))}
        </Form.Select>
      </C.Line>
      </D.Select>
      <C.StoryWrap>
      <CardContainer>
      {Array.from({ length: parseInt(formData.numberOfStories) }).map((_, index) => (
        <Card key={index}>
          <ImageBox>
            <div><img src={add} onClick={toggleModal} alt="Add icon"/></div>
          </ImageBox>
          <InputField
            type="text"
            placeholder="이야기 입력"
            as="textarea"
            value={inputValue}
            onChange={handleInputChange}
          />
        </Card>
      ))}
      </CardContainer>
        {modalOpen && (
        <C.ModalOverlay>
          <C.ModalContent>
            <h1>이미지 생성</h1>
            <C.ModalImg>
              <div><img src={createimg} alt="Create icon"/></div>
            </C.ModalImg>
            <C.InputWrap>
              <C.InputField
                type="text"
                placeholder="텍스트 입력"
                value={inputValue}
                onChange={handleInputChange}
              />
              <C.Send><img src={send} alt="Send icon"/></C.Send>
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