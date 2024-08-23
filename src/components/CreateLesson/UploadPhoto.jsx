import React, { useState, useRef } from 'react';
import * as C from '../MypageTchr/MypageStyle';
import close from '/src/assets/icon/closebtn.svg';
import uploadIcon from '/src/assets/icon/fileupload.svg';

const UploadPhoto = ({ isOpen, toggleModal, handleAddImage }) => {
  const [file, setFile] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewUrl(reader.result);
        setFile(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    if (event.dataTransfer.items && event.dataTransfer.items[0].kind === 'file') {
      const file = event.dataTransfer.items[0].getAsFile();
      setFile(file);
    }
  };
  
  const handleDragOver = (event) => {
    event.preventDefault();
  };

  if (!isOpen) return null;

  return (
    <C.ModalOverlay>
      <C.ModalContent>
        <C.CloseButton onClick={toggleModal}>
          <img src={close} alt="Close" />
        </C.CloseButton>
        <h1>이미지</h1>
        <C.SubModalText>사진 파일을 추가해 주세요. 최대 1개까지만 가능합니다.</C.SubModalText>
        <C.UploadBox onDrop={handleDrop} onDragOver={handleDragOver}>

            <>
              <C.UploadIcon src={uploadIcon} alt="Upload Icon" />
              <C.UploadText>파일을 드래그 하세요.</C.UploadText>
              <C.FeedbackContainer>
                <C.HalfLine />
                <C.FeedbackText>OR</C.FeedbackText>
                <C.HalfLine />
              </C.FeedbackContainer>
              <input
                type="file"
                style={{ display: 'none' }}
                ref={fileInputRef}
                onChange={handleFileChange}
              />
              <C.UploadButton onClick={handleFileUploadClick}>파일 찾기</C.UploadButton>
            </>

        </C.UploadBox>
        <C.FormatText>지원하는 형식: .jpg, .png</C.FormatText>
        {file ? (
            <>
              <C.UploadedFileDetails>
                <div style={{flexDirection: 'row', display: 'flex', justifyContent: 'flex-start', alignItems: 'center'}}>
                  <img src={imagePreviewUrl} alt="Preview" style={{ height: '30px', borderRadius: '5px', marginRight: '10px' }} />
                <C.FileName style={{ marginRight: '10px' }}>{file.name}</C.FileName>
                <C.FileSize>{(file.size / 1024 / 1024).toFixed(2)} MB</C.FileSize>
                </div> 
                <C.RemoveFileButton onClick={() => { setFile(null); setImagePreviewUrl(null); }}>✕</C.RemoveFileButton>
              </C.UploadedFileDetails>
            </>
          ) : (
            <></>
          )}
        <C.ButtonWrapper>
          <C.CancelButton onClick={toggleModal}>취소</C.CancelButton>
          <C.ModalButton onClick={() => handleAddImage(file)} disabled={!file}>다음</C.ModalButton>
        </C.ButtonWrapper>
      </C.ModalContent>
    </C.ModalOverlay>
  );
};

export default UploadPhoto;
