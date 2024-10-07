import React, { useState, useEffect } from 'react';
import * as C from '../CreateLesson/CreateLessonStyle';
import send from '/src/assets/icon/send.svg';
import close from '/src/assets/icon/closebtn.svg';

const ModalComponent = ({
  isOpen,
  toggleModal,
  inputModalValue,
  handleInputModalChange,
  handleModalSubmit,
  generatedImageUrl
}) => {
  const [loading, setLoading] = useState(false);  // 로딩 상태 관리
  const [hasRequestedImage, setHasRequestedImage] = useState(false);  // 이미지 생성 요청 상태

  const handleInputChange = (e) => {
    handleInputModalChange(e);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      initiateImageCreation();
    }
  };

  const initiateImageCreation = () => {
    setLoading(true);  // 로딩 상태를 true로 설정
    setHasRequestedImage(true);  // 이미지 생성 요청이 시작됨을 설정
    handleModalSubmit();
  };

  useEffect(() => {
    if (isOpen && generatedImageUrl) {
      setLoading(false);  // 이미지 생성 완료 시 로딩 상태 해제
    }
  }, [isOpen, generatedImageUrl]);

  if (!isOpen) return null;

  return (
    <C.ModalOverlay>
      <C.ModalContent>
        <C.CloseButton onClick={() => toggleModal(null)}>
          <img src={close} alt="Close" />
        </C.CloseButton>
        <h1>이미지 생성</h1>
        {hasRequestedImage && loading ? (
          <div style={{width: '100%', textAlign: 'center'}}>
            <p style={{ color: '#8344B5', fontSize: '1.8rem', marginBottom: '3%' }}>이미지 생성 중입니다.</p>
            <p style={{ color: '#888', fontSize: '1.4rem', marginBottom: '2%' }}>💜잠시만 기다려 주세요!💜</p>
            <div className="loading-bar">
              <div className="loading-progress"></div>
            </div>
          </div>
        ) : (
          <C.ModalImage>
            {hasRequestedImage && !loading ? (
              generatedImageUrl ? (
                <img src={generatedImageUrl} alt="Generated" />
              ) : (
                <></>
              )
            ) : (
              <div>
                <p style={{fontSize: '1.2rem'}}>이미지 설명을 <br />입력해 주세요.</p>
              </div>
            )}
          </C.ModalImage>
        )}
        
        <C.InputWrap>
          <C.InputField
            type="text"
            placeholder="Enter prompt here"
            value={inputModalValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
          <C.Send onClick={initiateImageCreation}>
            <img src={send} alt="Send" />
          </C.Send>
        </C.InputWrap>
      </C.ModalContent>
      <style>{`
        .loading-bar {
          width: 80%;
          margin-left: 10%;
          height: 20px;
          background-color: #f3f3f3;
          border-radius: 25px;
          overflow: hidden;
          position: relative;
          margin-top: 20px;
        }

        .loading-progress {
          width: 0%;
          height: 100%;
          background: linear-gradient(to right, #ff007b, #a826ff);
          animation: load 3s infinite;
          border-radius: 25px;
        }

        @keyframes load {
          0% {
            width: 0%;
          }
          100% {
            width: 100%;
          }
        }
      `}</style>
    </C.ModalOverlay>
  );
};

export default ModalComponent;
