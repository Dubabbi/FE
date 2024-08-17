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
  const [category, setCategory] = useState('');
  const [wordSet, setWordSet] = useState({
    title: '',
    category: '',
    description: '',
    wordCards: []
  });

  const categoryOptions = {
    FOOD: '음식',
    ANIMAL: '동물',
    SCHOOL: '학교',
    WEATHER: '날씨'
  };
  
  const [formData, setFormData] = useState({
    numberOfWords: 1 // 초기 낱말 개수를 설정
  });

  useEffect(() => {
    const fetchWordSet = async () => {
      try {
        const response = await axios.get(`https://maeummal.com/word/wordSet?wordSetId=${setId}`);
        if (response.data.isSuccess) {
          const { title, category, description, wordList, image} = response.data.data;
          setWordSet({ title, category, description, wordCards: wordList, imagePreviewUrl: image });
          setFormData({ ...formData, numberOfWords: wordList.length });
        }
      } catch (error) {
        console.error("Error fetching word set:", error);
        alert('Failed to load word set.');
      }
    };
    fetchWordSet();
  }, [setId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setWordSet({ ...wordSet, [name]: value });
    if (name === "numberOfWords") {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleWordCardChange = (wordId, field, value) => {
    const updatedCards = wordSet.wordCards.map(card =>
      card.wordId === wordId ? { ...card, [field]: value } : card
    );
    setWordSet({ ...wordSet, wordCards: updatedCards });
  };

  const toggleModal = (wordId, imagePreviewUrl) => {
    setModalCardIndex(wordId);
    setInputModalValue(imagePreviewUrl || '');
    setModalOpen(!modalOpen);
  };

  const handleModalSubmit = () => {
    const updatedCards = wordSet.wordCards.map(card =>
      card.wordId === modalCardIndex ? { ...card, imagePreviewUrl: inputModalValue } : card
    );
    setWordSet({ ...wordSet, wordCards: updatedCards });
    toggleModal(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { title, category, description, wordCards } = wordSet;
      const response = await axios.patch(`https://maeummal.com/word/wordSet/${setId}`, {
        title, category, description,
        wordList: wordCards.map(card => ({
          wordId: card.wordId,
          meaning: card.meaning,
          description: card.description,
          image: card.imagePreviewUrl,
          prompt: card.prompt
        }))
      });
      if (response.data.isSuccess) {
        alert('Word set updated successfully.');
        navigate('/WordTchr');
      } else {
        throw new Error(response.data.message);
      }
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
        </W.LessonWrapper>
        <D.TitleLine>
          <div style={{ width: '50%' }}>
            <D.WordTitle>세트 이름</D.WordTitle>
            <D.Title>
              <Form.Control
                type="text"
                name="title"
                value={wordSet.title}
                onChange={handleInputChange}
                placeholder="Enter set name"
              />
            </D.Title>
          </div>
          <D.Select style={{ width: '20%' }}>
            <D.WordTitle>낱말 개수</D.WordTitle>
            <Form.Select
              name="numberOfWords"
              value={formData.numberOfWords}
              onChange={handleInputChange}
              style={{ paddingLeft: '10px', paddingRight: '0px', fontSize: '1.5rem', borderRadius: '7px', border: '1px solid #ACAACC', width: '100%', height: '38px', marginLeft: '22%' }}
            >
              {Array.from({ length: 30 }, (_, i) => i + 1).map((number) => (
                <option key={number} value={number}>{number}개</option>
              ))}
            </Form.Select>
          </D.Select>
        </D.TitleLine>
        <D.TitleLine>
          <div style={{ width: '50%' }}>
            <D.WordTitle>설명</D.WordTitle>
            <D.Title style={{ minWidth: '200px' }}>
              <Form.Control
                type="text"
                name="description"
                value={wordSet.description}
                onChange={handleInputChange}
                placeholder="Enter description"
              />
            </D.Title>
          </div>
        <D.Select style={{ width: '20%' }}>
          <D.WordTitle>카테고리</D.WordTitle>
          <Form.Select
            name="category"
            value={wordSet.category}
            onChange={handleInputChange}
            style={{ paddingLeft: '10px', paddingRight: '0px', fontSize: '1.5rem', borderRadius: '7px', border: '1px solid #ACAACC', width: '100%', height: '38px', marginLeft: '22%' }}
          >
            <option value="">카테고리 선택</option>
            {Object.entries(categoryOptions).map(([key, value]) => (
              <option key={key} value={key}>{value}</option>
            ))}
          </Form.Select>
          </D.Select>
          </D.TitleLine>
        {wordSet.wordCards.map((card, index) => (
          <React.Fragment key={card.wordId}>
            <hr style={{ width: '60%', margin: '80px', marginLeft: '20%' }} />
            <D.Line>
              <D.Box>
                <D.SecondTitle>이미지 수정</D.SecondTitle>
                <W.AddImage onClick={() => toggleModal(card.wordId, card.imagePreviewUrl || placeholderImage)}>
                  <img
                    src={card.imagePreviewUrl || placeholderImage}
                    alt="Edit Image"
                    style={{ maxWidth: '200px' ,borderRadius: '7px', border: '4px solid #ACAACC', width: '100%', height: 'auto', marginLeft: '0px' }} 
                  />
                </W.AddImage>
              </D.Box>
              <D.SecondBox>
                <D.WordTitle>단어</D.WordTitle>
                <D.WordName>
                  <Form.Control
                    type="text"
                    name="meaning"
                    value={card.meaning}
                    onChange={(e) => handleWordCardChange(card.wordId, 'meaning', e.target.value)}
                  />
                </D.WordName>
                <D.WordTitle>단어 설명</D.WordTitle>
                <D.AboutWord
                  as="textarea"
                  name="description"
                  value={card.description}
                  onChange={(e) => handleWordCardChange(card.wordId, 'description', e.target.value)}
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
        <C.SubmitButton onClick={handleSubmit}>수정</C.SubmitButton>
    </>
  );
};

export default WordDetailTchr;
