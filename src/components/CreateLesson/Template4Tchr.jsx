import React, { useState } from 'react';
import * as C from './CreateLessonStyle';
import * as L from '../LessonTchr/LessonStyle';
import * as D from '../WordCreateTchr/WordDetailStyle';
import Upload from '/src/assets/icon/uploadphoto.svg';
import Back from '/src/assets/icon/back.svg';
import My from '/src/assets/icon/phimg.svg'; 
import UploadPhoto from './UploadPhoto';
import { useLocation } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';

const Template4Tchr = () => {
  const [description, setDescription] = useState(''); 
  const [hint, setHint] = useState(''); 
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [modalCardIndex, setModalCardIndex] = useState(null); // 현재 이미지 업로드를 할 카드 인덱스
  const [storyCards, setStoryCards] = useState([
    { story: '', imagePreviewUrl: My },
    { story: '', imagePreviewUrl: My },
    { story: '', imagePreviewUrl: My }
  ]);
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleHintChange = (e) => {
    setHint(e.target.value);
  };

  // 특정 인덱스의 카드에 대해 업로드 모달을 열도록 설정
  const toggleUploadModal = (index) => {
    setModalCardIndex(index); // 클릭한 카드 인덱스 설정
    setIsUploadModalOpen(true); // 업로드 모달 열기
  };

  // 이미지 업로드 처리 함수
  const handleAddImage = (file) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newStoryCards = [...storyCards];
        newStoryCards[modalCardIndex].imagePreviewUrl = reader.result; // 선택된 카드 인덱스의 이미지 업데이트
        setStoryCards(newStoryCards);
        setIsUploadModalOpen(false); // 이미지 업로드 후 모달 닫기
      };
      reader.readAsDataURL(file);
    }
  };

  // 스토리 내용 변경 처리 함수
  const handleStoryCardChange = (index, value) => {
    const newStoryCards = [...storyCards];
    newStoryCards[index].story = value;
    setStoryCards(newStoryCards);
  };

  return (
    <>
      <D.ImageWrap>
        <a href="/MainTchr"><img src={Back} alt="Back" /></a>
      </D.ImageWrap>
      <L.LessonWrapper>
        <L.Section>
          <h1>이야기 순서 배열하기</h1>
        </L.Section>
        <C.StoryWrap>
          <C.CardContainer>
            {storyCards.map((card, index) => (
              <C.SelectCard key={index}>
                <C.SelectBox>
                  <img
                    src={card.imagePreviewUrl}
                    alt="Preview"
                    style={{
                      borderRadius: '7px',
                      border: '4px solid #ACAACC',
                      width: 'auto',
                      height: '93%',
                      maxWidth: '93%',
                      objectFit: 'cover',
                      maxHeight: '100%',
                      marginLeft: '0px'
                    }}
                  />
                </C.SelectBox>
                <C.StoryField
                  type="text"
                  placeholder="이야기 입력"
                  as="textarea"
                  value={card.story}
                  onChange={(e) => handleStoryCardChange(index, e.target.value)}
                  style={{ backgroundColor: '#FCFBFB'}}
                />
              </C.SelectCard>
            ))}
          </C.CardContainer>
          {/* 여기서 각 C.Upload 버튼을 카드별로 제어 */}
          <div style={{ width: '86%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginLeft: '7%', marginTop: '2%' }}>
            {storyCards.map((_, index) => (
              <C.Upload
                key={index}
                src={Upload}
                alt="Upload Photo"
                onClick={() => toggleUploadModal(index)}
              />
            ))}
          </div>
        </C.StoryWrap>
        </L.LessonWrapper>
        <C.HintWrapper style={{marginTop: '3%'}}>
          <C.HintGroup>
          <C.Label>해설</C.Label>
          <C.HintBox style={{ minWidth: '200px' }}>
            <Form.Control
              type="text"
              placeholder="해설을 입력하세요"
              name="description"
              value={description}
              onChange={handleDescriptionChange}
            />
          </C.HintBox>
          </C.HintGroup>
          <C.HintGroup>
            <C.Label>힌트</C.Label>
            <C.HintBox style={{ minWidth: '200px' }}>
              <Form.Control
                type="text"
                placeholder="문제 힌트를 입력하세요"
                name="hint"
                value={hint}
                onChange={handleHintChange}
              />
            </C.HintBox>
          </C.HintGroup>
        </C.HintWrapper>
        <C.SubmitButton>제출</C.SubmitButton>
      
      <UploadPhoto
        isOpen={isUploadModalOpen}
        toggleModal={() => setIsUploadModalOpen(false)}
        handleAddImage={handleAddImage}
      />
    </>
  );
};

export default Template4Tchr;
