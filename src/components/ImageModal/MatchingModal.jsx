import React, { useState, useEffect } from 'react';
import * as C from '../CreateLesson/CreateLessonStyle';
import createimg from '/src/assets/image/template/createimg.svg';
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
  const [loading, setLoading] = useState(false);

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
    setLoading(true); 
    handleModalSubmit();  
  };

  useEffect(() => {
    if (isOpen && generatedImageUrl) {
      setLoading(false); 
    }
  }, [isOpen, generatedImageUrl]);

  if (!isOpen) return null;

  return (
    <C.ModalOverlay>
      <C.ModalContent>
        <C.CloseButton onClick={toggleModal}><img src={close} alt="Close" /></C.CloseButton>
        <h1>이미지 생성</h1>
        <C.ModalImg>
          {loading ? (
            <div><img src={createimg} alt="Loading" /></div>
          ) : (
            generatedImageUrl ? <img src={generatedImageUrl} alt="Generated" /> : <div><img src={createimg} alt="Placeholder" /></div>
          )}
        </C.ModalImg>
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
    </C.ModalOverlay>
  );
};

export default ModalComponent;
