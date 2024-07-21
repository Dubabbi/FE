import React, { useState, useRef } from 'react';
import * as W from '../WordTchr/WordStyle';
import * as D from './WordDetailStyle';
import * as C from '../CreateLesson/CreateLessonStyle';
import Back from '/src/assets/icon/back.svg';
import Form from 'react-bootstrap/Form';
import add from '../../assets/icon/add.svg';
import axios from 'axios';
import ModalComponent from '../ImageModal/ImageModal';

const WordCreateTchr = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalCardIndex, setModalCardIndex] = useState(null);
  const [inputModalValue, setInputModalValue] = useState('');
  const [generatedImageUrl, setGeneratedImageUrl] = useState(null);
  const [titleValue, setTitleValue] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    numberOfWords: '1',
  });
  const [wordCards, setWordCards] = useState([{
    wordName: '',
    wordDescription: '',
    file: null,
    imagePreviewUrl: null
  }]);

  const fileInputRefs = useRef([]);

  const toggleModal = (index) => {
    setModalOpen(!modalOpen);
    setModalCardIndex(index);
  };

  const handleInputModalChange = (e) => {
    setInputModalValue(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleModalSubmit();
    }
  };

  const handleModalSubmit = async () => {
    try {
      const response = await axios.post('/api/ai/generateImage', {
        prompt: inputModalValue,
      });
      setGeneratedImageUrl(response.data.imageUrl);
    } catch (error) {
      console.error('Error generating image:', error);
      alert('이미지 생성에 실패했습니다.');
    }
  };

  const handleAddImage = () => {
    if (generatedImageUrl && modalCardIndex !== null) {
      const newWordCards = [...wordCards];
      newWordCards[modalCardIndex].imagePreviewUrl = generatedImageUrl;
      setWordCards(newWordCards);
      setGeneratedImageUrl(null);
      toggleModal(null);
    }
  };

  const handleRegenerateImage = async () => {
    try {
      const response = await axios.post('/api/ai/generateImage', {
        prompt: inputModalValue,
      });
      setGeneratedImageUrl(response.data.imageUrl);
    } catch (error) {
      console.error('Error regenerating image:', error);
      alert('이미지 다시 생성에 실패했습니다.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      title: titleValue,
      words: wordCards.map(card => ({
        wordName: card.wordName,
        wordDescription: card.wordDescription,
        file: card.file,
      })),
    };

    try {
      const response = await axios.post('/api/word/wordSet', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('Response:', response.data);
      alert('낱말 카드 세트가 성공적으로 생성되었습니다.');
    } catch (error) {
      console.error('Error:', error);
      alert('낱말 카드 세트 생성에 실패했습니다.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    if (name === 'numberOfWords') {
      adjustWordCards(parseInt(value, 10));
    }
  };

  const adjustWordCards = (number) => {
    const currentLength = wordCards.length;
    const newWordCards = wordCards.slice(0, number);
    while (newWordCards.length < number) {
      newWordCards.push({ wordName: '', wordDescription: '', file: null, imagePreviewUrl: null });
    }
    setWordCards(newWordCards);
    fileInputRefs.current = fileInputRefs.current.slice(0, number);
  };

  const handleWordCardChange = (index, name, value) => {
    const newWordCards = [...wordCards];
    newWordCards[index] = { ...newWordCards[index], [name]: value };
    setWordCards(newWordCards);
  };

  const handleFileChange = (index, event) => {
    const file = event.target.files[0];
    if (file) {
      const newWordCards = [...wordCards];
      const reader = new FileReader();
      reader.onloadend = () => {
        newWordCards[index].imagePreviewUrl = reader.result;
        newWordCards[index].file = file.name;
        setWordCards(newWordCards);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileUploadClick = (index) => {
    fileInputRefs.current[index].click();
  };

  return (
    <>
      <D.ImageWrap>
        <a href="/WordTchr"><img src={Back} alt="" /></a>
      </D.ImageWrap>
      <W.LessonWrapper>
        <W.Section style={{ marginTop: '4%' }}>
          <h1>낱말 카드 제작</h1>
        </W.Section>
      </W.LessonWrapper>
      <D.TitleLine>
        <div style={{ width: '50%' }}>
          <D.WordTitle style={{}}>세트 이름</D.WordTitle>
          <D.Title style={{ minWidth: '200px' }} onSubmit={handleSubmit}>
            <Form.Control
              type="text"
              placeholder="제목을 입력하세요."
              value={titleValue}
              onChange={(e) => setTitleValue(e.target.value)}
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
        <React.Fragment key={index}>
          <hr style={{ width: '60%', margin: '80px', marginLeft: '20%' }} />
          <D.Line >
            <D.Box>
              <D.SecondTitle>이미지 추가</D.SecondTitle>
              <W.AddImage>
                <div>
                  <button onClick={() => toggleModal(index)} style={{ background: 'none', border: 'none' }}>
                    <img src={add} alt="단어" />
                  </button>
                </div>
              </W.AddImage>
              {card.imagePreviewUrl && (
                <img
                  src={card.imagePreviewUrl}
                  alt="Preview"
                  style={{ borderRadius: '7px', border: '4px solid #ACAACC', width: '100%', height: 'auto', marginLeft: '20%' }}
                />
              )}
            </D.Box>
            <D.SecondBox>
              <D.WordTitle>단어</D.WordTitle>
              <D.WordName>
                <Form.Control
                  type="text"
                  placeholder="단어 이름"
                  name="wordName"
                  value={card.wordName}
                  onChange={(e) => handleWordCardChange(index, 'wordName', e.target.value)}
                />
              </D.WordName>
              <D.WordTitle>단어 설명</D.WordTitle>
              <D.AboutWord
                as="textarea"
                placeholder="단어 설명"
                name="wordDescription"
                value={card.wordDescription}
                onChange={(e) => handleWordCardChange(index, 'wordDescription', e.target.value)}
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
        handleKeyPress={handleKeyPress}
        handleModalSubmit={handleModalSubmit}
        handleRegenerateImage={handleRegenerateImage}
        handleAddImage={handleAddImage}
        generatedImageUrl={generatedImageUrl}
      />
      <hr style={{ width: '60%', margin: '80px', marginLeft: '20%' }} />
      <C.SubmitButton style={{ marginBottom: '6%' }} onClick={handleSubmit}>제출</C.SubmitButton>
    </>
  );
};

export default WordCreateTchr;
