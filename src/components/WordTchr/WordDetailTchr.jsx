import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import ModalComponent from '../ImageModal/ImageModal';
import * as W from '../WordTchr/WordStyle';
import * as D from '../WordCreateTchr/WordDetailStyle';
import * as C from '../CreateLesson/CreateLessonStyle';
import Back from '/src/assets/icon/back.svg';
import placeholderImage from '/src/assets/icon/phimg.svg'; 

const WordDetailTchr = () => {
  const navigate = useNavigate();
  const { setId } = useParams();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalCardIndex, setModalCardIndex] = useState(null);
  const [inputModalValue, setInputModalValue] = useState('');
  const [generatedImageUrl, setGeneratedImageUrl] = useState(null);
  const [titleValue, setTitleValue] = useState('');
  const [wordCards, setWordCards] = useState([]);

  useEffect(() => {
    if (setId) {
      fetchWordSetById(setId);
    }
  }, [setId]);

  const fetchWordSetById = async (id) => {
    try {
      const response = await axios.get(`https://maeummal.com/word/wordSet?wordSetId=${id}`);
      if (response.data.isSuccess) {
        setTitleValue(response.data.data.title);
        setWordCards(response.data.data.wordList);
      }
    } catch (error) {
      console.error("Error fetching word set:", error);
      alert('Failed to load word set.');
    }
  };

  const handleInputChange = (e) => {
    setTitleValue(e.target.value);
  };

  const handleWordCardChange = (wordId, field, value) => {
    const updatedCards = wordCards.map(card =>
      card.wordId === wordId ? { ...card, [field]: value } : card
    );
    setWordCards(updatedCards);
  };

  const toggleModal = (wordId, imageUrl) => {
    setModalCardIndex(wordId);
    setInputModalValue(imageUrl || '');
    setModalOpen(true);
  };

  const handleModalSubmit = async () => {
    if (!inputModalValue) {
      alert('Please provide an image URL.');
      return;
    }
    try {
      const updatedCards = wordCards.map(card =>
        card.wordId === modalCardIndex ? { ...card, imagePreviewUrl: inputModalValue } : card
      );
      setWordCards(updatedCards);
      toggleModal(null);
    } catch (error) {
      console.error("Error updating image:", error);
      alert('Image update failed.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(`https://maeummal.com/word/wordSet/${setId}`, {
        title: titleValue,
        wordList: wordCards
      });
      alert('Word set updated successfully.');
      navigate('/WordTchr'); 
    } catch (error) {
      console.error("Error updating word set:", error);
      alert('Failed to update word set.');
    }
  };

  return (
    <>
      <D.ImageWrap>
        <a href="/WordTchr"><img src={Back} alt="Back to list" /></a>
      </D.ImageWrap>
      <W.LessonWrapper>
        <W.Section style={{ marginTop: '4%' }}>
          <h1>낱말 카드 수정</h1>
        </W.Section>
        <D.TitleLine>
          <div style={{ width: '50%' }}>
            <D.WordTitle>세트 이름</D.WordTitle>
            <D.Title style={{ minWidth: '200px' }}>
              <Form.Control
                type="text"
                placeholder="Enter set name"
                value={titleValue}
                onChange={handleInputChange}
              />
            </D.Title>
          </div>
        </D.TitleLine>
        {wordCards.map((card, index) => (
          <React.Fragment key={card.wordId}>
            <hr style={{ width: '60%', margin: '80px', marginLeft: '20%' }} />
            <D.Line>
              <D.Box>
                <D.SecondTitle>이미지 수정</D.SecondTitle>
              <W.AddImage onClick={() => toggleModal(card.wordId, card.imagePreviewUrl || placeholderImage)}>
                <div>
                <img
                  src={card.imagePreviewUrl || placeholderImage}
                  alt="Edit Image"
                  style={{ cursor: 'pointer', width: '100%'}} 
                />
                </div>
              </W.AddImage>
              {card.imagePreviewUrl && (
                <img
                  src={card.imagePreviewUrl}
                  alt="미리보기"
                  style={{ borderRadius: '7px', border: '4px solid #ACAACC', width: '100%', height: 'auto', marginLeft: '20%' }}
                />
              )}
               </D.Box>
               <D.SecondBox>
               <D.WordTitle>단어</D.WordTitle>
                <D.WordName>
                  <Form.Control
                    type="text"
                    placeholder="Enter word"
                    value={card.meaning}
                    onChange={e => handleWordCardChange(card.wordId, 'meaning', e.target.value)}
                  />
                </D.WordName>
                <D.WordTitle>단어 설명</D.WordTitle>
                <D.AboutWord
                  as="textarea"
                  placeholder="Enter description"
                  value={card.description}
                  onChange={e => handleWordCardChange(card.wordId, 'description', e.target.value)}
                />
              </D.SecondBox>
            </D.Line>
          </React.Fragment>
        ))}
        <ModalComponent
          isOpen={modalOpen}
          toggleModal={() => setModalOpen(false)}
          inputModalValue={inputModalValue}
          handleInputModalChange={(e) => setInputModalValue(e.target.value)}
          handleModalSubmit={handleModalSubmit}
          generatedImageUrl={generatedImageUrl}
        />
        <C.SubmitButton style={{ marginBottom: '15%', marginTop: '5%' }} onClick={handleSubmit}>수정</C.SubmitButton>
      </W.LessonWrapper>
    </>
  );
};

export default WordDetailTchr;
