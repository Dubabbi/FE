import React, { useState, useEffect } from 'react';
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
  height: 26vh;
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
  img {
    width: 25px;
    height: 25px;
  }
`;

const Title = styled.h1`
  font-size: 1vw;
  margin-top: 2%;
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

export default function CodeModal({ isOpen, toggleModal }) {
  const [studentInfo, setStudentInfo] = useState('');

  useEffect(() => {
    const fetchStudentInfo = async () => {
        try {
            const accessToken = localStorage.getItem("key");
            if (!accessToken) {
                setError('Authentication required');
                return;
            }
            const response = await axios.get('https://maeummal.com/user', {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });

            if (response.data.isSuccess) {
                setStudentInfo(response.data.data);
            } else {
                throw new Error(response.data.message || 'Failed to fetch teacher info');
            }
        } catch (error) {
            console.error('Error fetching teacher info:', error);
            setError('Failed to fetch teacher info: ' + error.message);
        }
    };

    fetchStudentInfo();
}, []);
  

  return isOpen ? (
    <ModalOverlay>
      <ModalContent>
        <CloseButton onClick={toggleModal}>
          <img src={CloseIcon} alt="Close" />
        </CloseButton>
        <Title>김망곰 학생의 매칭 코드는</Title>
        <Title>{studentInfo.pinCode}</Title>
        <Title>입니다.</Title>
        <div>
          <Button onClick={toggleModal}>취소</Button>
          <Button onClick={toggleModal}>확인</Button>
        </div>
      </ModalContent>
    </ModalOverlay>
  ) : null;
}

