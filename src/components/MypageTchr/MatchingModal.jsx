import React, { useState, useRef } from 'react';
import * as C from './MypageStyle';
import styled from 'styled-components';
import axios from 'axios';
import CloseIcon from '/src/assets/icon/closebtn.svg';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
`;

const ModalContent = styled.div`
  position: relative;
  min-width: 300px;
  height: 30vh;
  background: white;
  border-radius: 10px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const CloseButton = styled.button`
  position: absolute;
  cursor: pointer;
  top: 7%;
  right: 5%;
  img{
    width: 25px;
    height: 25px;
  }
`;

const Title = styled.h1`
  font-size: 1vw;
  color: #333333;
`;

const InputField = styled.input`
  width: 90%;
  padding: 10px;
  border: 1.5px solid #cccccc;
  border-radius: 5px;

  &:focus {
    border: 1.5px solid #777777;
  }
`;

const Button = styled.button`
  padding: 10px 20px;
  margin: 5px;
  border-radius: 20px;
  border: none;
  background-color: #ACAACC;
  color: white;
  cursor: pointer;
  width: 110px;

  &:hover {
     background-color: hsl(240, 8%, 70%);
  }
`;

export default function MatchingModal({ isOpen, toggleModal }) {
  const [pinCode, setPinCode] = useState('');

  const handleMatch = async () => {
    try {
      const accessToken = localStorage.getItem('key');
      const response = await axios.post('https://maeummal.com/api/match/match-student', null, {
        params: { pinCode },
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      console.log('Response:', response.data);
      alert('매칭 성공!');
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
      alert('매칭 실패');
    }
  };
  

  return isOpen ? (
    <ModalOverlay>
      <ModalContent>
        <CloseButton onClick={toggleModal}>
          <img src={CloseIcon} alt="Close" />
        </CloseButton>
        <Title>매칭할 학생 코드 입력</Title>
        <InputField 
          value={pinCode} 
          onChange={e => setPinCode(e.target.value)}
          placeholder="코드 입력"
        />
        <div>
          <Button onClick={toggleModal}>취소</Button>
          <Button onClick={handleMatch}>확인</Button>
        </div>
      </ModalContent>
    </ModalOverlay>
  ) : null;
}
