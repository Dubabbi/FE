import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '/contexts/AuthContext';
import styled from 'styled-components';
import Toast from '/src/assets/icon/errortoast.svg'

export default function LoginModal() {
    const { showModal, setShowModal, isLoggedIn } = useAuth();
    const navigate = useNavigate();
  
    const closeModal = () => {
      setShowModal(false);
      if (!isLoggedIn) {
        navigate('/');
      }
    };
  
    useEffect(() => {
      if (!isLoggedIn) {
        setShowModal(true);
      }
    }, [isLoggedIn, setShowModal]);
  
    if (!showModal) return null;

  return (
      <ModalOverlay>
      <ModalContent>
        <ModalTitle><img src={Toast}/>로그인이 필요합니다.</ModalTitle>
        <p>로그인 페이지로 이동합니다.</p>
        <div style={{display: 'flex', alignItems: 'center', flexDirection: 'row', marginTop: '2%'}}>
          <Button onClick={closeModal}>확인</Button>
        </div>
      </ModalContent>
    </ModalOverlay>
  );
}

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
  height: 20vh;
  background: white;
  border-radius: 7px;
  padding: 17px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  border: 1.3px solid #B40000;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  h1{
    margin: 5%;
    font-size: 1.2vw;
  }
`;

const ModalTitle = styled.h1`
  font-size: 1vw;
  display: flex;
  align-items: center;
  gap: 4%;
  color: #333333;
  width: 200px;
  img{
    margin-left: 7px;
    width: 25px;
    height: auto;
  }
`;

const Button = styled.button`
  padding: 7px 15px;
  margin-top: 10px;
  border-radius: 10px;
  border: none;
  background-color: #ACAACC;
  color: white;
  cursor: pointer;
  width: 110px;

  &:hover {
     background-color: rgba(180, 0, 0, 0.93);
  }

  &:first-child {
    background-color: #ffffff;
    color: #333;
    box-shadow: inset 0 0 0 1.4px #B40000;

    &:hover {
      background-color: rgba(166, 46, 46, 0.1);
    }
  }
`;