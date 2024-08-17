import React, { useState } from 'react';
import * as W from '../WordTchr/WordStyle';
import * as D from './WordDetailStyle';
import * as C from '../CreateLesson/CreateLessonStyle';
import Back from '/src/assets/icon/back.svg';
import Form from 'react-bootstrap/Form';
import add from '../../assets/icon/add.svg';
import axios from 'axios';
import ModalComponent from '../ImageModal/ImageModal';
import { useNavigate } from 'react-router-dom';

const WordCreateTchr = () => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalCardIndex, setModalCardIndex] = useState(null);
  const [inputModalValue, setInputModalValue] = useState('');
  const [generatedImageUrl, setGeneratedImageUrl] = useState(null);
  const [titleValue, setTitleValue] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    numberOfWords: 1,
  });
  const [wordCards, setWordCards] = useState([{
    wordId: 1,
    meaning: '',
    prompt: '',
    description: '',
    imagePreviewUrl: ''
  }]);

  const adjustWordCards = (number) => {
    const updatedCards = wordCards.slice(0, number);
    while (updatedCards.length < number) {
      const lastId = updatedCards.length > 0 ? updatedCards[updatedCards.length - 1].wordId + 1 : 1;
      updatedCards.push({
        wordId: lastId,
        meaning: '',
        prompt: '',
        description: '',
        imagePreviewUrl: ''
      });
    }
    setWordCards(updatedCards);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: name === 'numberOfWords' ? parseInt(value, 10) : value
    }));

    if (name === 'numberOfWords') {
      adjustWordCards(parseInt(value, 10));
    } else if (name === 'title') {
      setTitleValue(value); 
    }
  };

  const toggleModal = (wordId, event) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    setModalOpen(!modalOpen);
    setModalCardIndex(wordId);
  };

  const handleInputModalChange = (e) => {
    setInputModalValue(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleModalSubmit();
    }
  };

  const handleModalSubmit = async () => {
    try {
      const response = await axios.post('https://maeummal.com/ai/image', { prompt: inputModalValue });
      if (response.status === 200 && response.data) {
        const updatedCards = [...wordCards];
        const index = updatedCards.findIndex(card => card.wordId === modalCardIndex);
        if (index !== -1) {
          updatedCards[index].imagePreviewUrl = response.data;
          setWordCards(updatedCards);
          toggleModal(null);  
        }
      } else {
        throw new Error('Failed to fetch image URL from the server');
      }
    } catch (error) {
      console.error("Error while fetching image:", error);
      alert('이미지 생성에 실패했습니다.: ' + error.message);
    }
  };

  const handleRegenerateImage = async () => {
    try {
      const response = await axios.post('https://maeummal.com/ai/image', 
        { prompt: inputModalValue }, 
        { headers: { 'Content-Type': 'bearer' } }
      );
      if (response.status === 200 && response.data) {
        setGeneratedImageUrl(response.data);
      } else {
        throw new Error('Failed to regenerate image URL');
      }
    } catch (error) {
      console.error('Error regenerating image:', error.response ? error.response.data : error.message);
      alert('이미지 다시 생성에 실패했습니다.');
    }
};

  const handleAddImage = () => {
    if (generatedImageUrl && modalCardIndex !== null) {
      const updatedCards = [...wordCards];
      const index = updatedCards.findIndex(card => card.wordId === modalCardIndex);
      if (index !== -1) {
        updatedCards[index].imagePreviewUrl = generatedImageUrl;
        setWordCards(updatedCards);
      }
      setGeneratedImageUrl(null);
      toggleModal(null);
    }
  };

  const handleWordCardChange = (wordId, name, e) => {
    const value = e.target.value;
    const updatedCards = [...wordCards];
    const index = updatedCards.findIndex(card => card.wordId === wordId);
    if (index !== -1) {
      updatedCards[index][name] = value;
      setWordCards(updatedCards);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      title: titleValue,
      words: wordCards.map(card => ({
        meaning: card.meaning,
        description: card.description,
        image: card.imagePreviewUrl,
        prompt: inputModalValue
      })),
    };
  
    try {
      const response = await axios.post('https://maeummal.com/word/wordSet', data, {
        headers: { 'Content-Type': 'application/json' }
      });
      console.log('Response:', response.data);
      alert('낱말 카드 세트가 성공적으로 생성되었습니다.');
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
      alert('낱말 카드 세트 생성에 실패했습니다.');
    }
  };

  return (
    <>
      <D.ImageWrap>
        <a href="/WordTchr"><img src={Back} alt="뒤로 가기" /></a>
      </D.ImageWrap>
      <W.LessonWrapper>
        <W.Section style={{ marginTop: '4%' }}>
          <h1>낱말 카드 제작</h1>
        </W.Section>
      </W.LessonWrapper>
        <D.TitleLine>
          <div style={{ width: '50%' }}>
            <D.WordTitle>세트 이름</D.WordTitle>
            <D.Title style={{ minWidth: '200px' }}>
              <Form.Control
                type="text"
                placeholder="세트 이름을 입력하세요"
                name="title"
                value={titleValue}
                onChange={handleInputChange}
              />
            </D.Title>
          </div>
          <D.Select style={{ width: '20%' }}>
            <D.WordTitle style={{ minWidth: '80px' }}>낱말 개수</D.WordTitle>
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
        {wordCards.map((card, index) => (
        <React.Fragment key={card.wordId}>
          <hr style={{ width: '60%', margin: '80px', marginLeft: '20%' }} />
          <D.Line>
            <D.Box>
              <D.SecondTitle>이미지 추가</D.SecondTitle>
              <W.AddImage>
                {card.imagePreviewUrl ? (
                  <img
                    src={card.imagePreviewUrl}
                    alt="미리보기"
                    style={{ borderRadius: '7px', border: '4px solid #ACAACC', width: '100%', height: 'auto', marginLeft: '20%' }}
                  />
                ) : (
                  <div>
                    <button type="button" onClick={(e) => toggleModal(card.wordId, e)} style={{ background: 'none', border: 'none' }}>
                      <img src={add} alt="단어 추가" />
                    </button>
                  </div>
                )}
              </W.AddImage>
            </D.Box>
            <D.SecondBox>
              <D.WordTitle>단어</D.WordTitle>
              <D.WordName>
                <Form.Control
                  type="text"
                  placeholder="단어 이름"
                  name="wordName"
                  value={card.meaning}
                  onChange={(e) => handleWordCardChange(card.wordId, 'meaning', e)}
                />
              </D.WordName>
              <D.WordTitle>단어 설명</D.WordTitle>
              <D.AboutWord
                as="textarea"
                placeholder="단어 설명"
                name="wordDescription"
                value={card.description}
                onChange={(e) => handleWordCardChange(card.wordId, 'description', e)}
              />
            </D.SecondBox>
          </D.Line>
        </React.Fragment>
      ))}
        <ModalComponent
          isOpen={modalOpen}
          toggleModal={() => toggleModal(null)}
          inputModalValue={inputModalValue}
          handleInputModalChange={handleInputModalChange}
          handleKeyDown={handleKeyDown}
          handleModalSubmit={handleModalSubmit}
          handleRegenerateImage={handleRegenerateImage}
          handleAddImage={handleAddImage}
          generatedImageUrl={generatedImageUrl}
        />
        <hr style={{ width: '60%', margin: '80px', marginLeft: '20%' }} />
        <C.SubmitButton style={{ marginBottom: '15%', marginTop: '5%' }} onClick={handleSubmit}>제출</C.SubmitButton>
    </>
  );
};

export default WordCreateTchr;
