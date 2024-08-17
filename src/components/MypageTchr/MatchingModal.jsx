import React, { useState, useRef } from 'react';
import * as C from './MypageStyle';
import CloseIcon from '/src/assets/icon/closebtn.svg';
import styled from 'styled-components';


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
  h1{
    margin: 5%;
    font-size: 1.2vw;
  }
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
  margin-left: 5%;
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

  &:first-child {
    background-color: #ffffff;
    color: #ACAACC;
    box-shadow: inset 0 0 0 1.4px #ACAACC;

    &:hover {
      background-color: hsl(240, 15%, 99%);;
    }
  }
`;

export default function MatchingModal({ isOpen, toggleModal }) {
  if (!isOpen) return null;
  return (
    <ModalOverlay>
      <ModalContent>
        <CloseButton onClick={toggleModal}>
          <img src={CloseIcon} alt="Close" />
        </CloseButton>
        <Title>매칭할 학생 코드 입력</Title>
        <InputField placeholder="코드 입력" />
        <div style={{display: 'flex', alignItems: 'center', flexDirection: 'row'}}>
          <Button onClick={toggleModal}>취소</Button>
          <Button>확인</Button>
        </div>
      </ModalContent>
    </ModalOverlay>
  );
}
