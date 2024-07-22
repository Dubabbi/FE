import React from 'react';
import * as C from '../CreateLesson/CreateLessonStyle';
import createimg from '/src/assets/image/template/createimg.svg';
import send from '/src/assets/icon/send.svg';
import close from '/src/assets/icon/closebtn.svg';

const ModalComponent = ({
  isOpen,
  toggleModal,
  inputModalValue,
  handleInputModalChange,
  handleKeyDown,
  handleModalSubmit,
  handleRegenerateImage,
  handleAddImage,
  generatedImageUrl
}) => {
  if (!isOpen) return null;


  return (
    <C.ModalOverlay>
      <C.ModalContent>
        <C.CloseButton>
          <img src={close} alt="닫기" onClick={toggleModal} />
        </C.CloseButton>
        <h1>이미지 생성</h1>
        <C.ModalImg>
          <div>
            {generatedImageUrl ? (
              <img src={generatedImageUrl} alt="생성 이미지" />
            ) : (
              <img src={createimg} alt="생성 이미지" />
            )}
          </div>
        </C.ModalImg>
        <C.InputWrap>
          <C.InputField
            type="text"
            placeholder="텍스트 입력"
            value={inputModalValue}
            onChange={handleInputModalChange}
            onKeyDown={handleKeyDown}
          />
          <C.Send onClick={handleModalSubmit}><img src={send} alt="보내기 아이콘" /></C.Send>
        </C.InputWrap>
        <C.ButtonWrapper>
          <C.ModalButton onClick={handleRegenerateImage}>다시 생성</C.ModalButton>
          <C.ModalButton onClick={handleAddImage} disabled={!generatedImageUrl}>생성 완료</C.ModalButton>
        </C.ButtonWrapper>
      </C.ModalContent>
    </C.ModalOverlay>
  );
};

export default ModalComponent;
