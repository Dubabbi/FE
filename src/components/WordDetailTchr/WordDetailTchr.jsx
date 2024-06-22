import React, { useState, useEffect, useRef } from 'react';
import * as W from '../WordTchr/WordStyle';
import * as D from './WordDetailStyle';
import * as C from '../CreateLesson/CreateLessonStyle';
import Back from '/src/assets/image/back.svg';
import Form from 'react-bootstrap/Form';

const WordDetailTchr = () => {
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    console.log('Word Cards:', wordCards);
  };

  const fileInputRefs = useRef([]);

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
    newWordCards[index] = {...newWordCards[index], [name]: value};
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
        setImagePreviewUrl(reader.result);
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
          <h1>낱말 카드 학습 </h1>
        </W.Section>
      </W.LessonWrapper>
      <D.Line style={{width: '60%', marginLeft: '12%'}}>
      <div style={{width: '70%'}}>
        <D.SecondTitle>세트 이름</D.SecondTitle>
        <D.Title style={{minWidth: '200px'}} onSubmit={handleSubmit}>
          <Form.Control
            type="text"
            placeholder="제목을 입력하세요."
            name="title"
            value={formData.title}
            onChange={handleInputChange}
          />
        </D.Title>
      </div>
      <D.Select style={{width: '20%'}}>
        <D.SecondTitle style={{minWidth: '80px'}}>낱말 개수</D.SecondTitle>
        <Form.Select
          name="numberOfWords"
          value={formData.numberOfWords}
          onChange={handleInputChange}
          style={{paddingLeft: '10px', paddingRight: '10px', fontSize: '1.5rem', borderRadius: '7px',  border: '1px solid #ACAACC', width: '200px', height: '36px',  marginLeft: '22%' }}
        >
      {Array.from({ length: 30 }, (_, i) => i + 1).map((number) => (
        <option key={number} value={number}>{number}개</option>
      ))}
        </Form.Select>
      </D.Select>
      </D.Line>
      {wordCards.map((card, index) => (
        <React.Fragment key={index}>
      <hr style={{ width: '60%', margin: '80px', marginLeft: '20%' }} />
      <D.Line>
        <D.Box>
          <D.SecondTitle>이미지 업로드</D.SecondTitle>
              <input
                type="file"
                style={{ display: "none" }}
                ref={el => fileInputRefs.current[index] = el}
                onChange={(event) => handleFileChange(index, event)}
              />
          <D.FileButton onClick={() => handleFileUploadClick(index)}>파일 업로드</D.FileButton>
              {card.file && 
              <div style={{ fontFamily: "Arial", padding: "10px", marginLeft: '70px' }}>
                선택된 파일: {card.file}</div>}
              {card.imagePreviewUrl && <img src={card.imagePreviewUrl} alt="Preview" 
                style={{ borderRadius: '7px', border: '4px solid #ACAACC', width: '100%', 
                height: 'auto', marginLeft: '20%' }} />}
        </D.Box>
        <D.SecondBox>
          <D.SecondTitle>단어</D.SecondTitle>
          <D.WordName>
            <Form.Control
              type="text"
              placeholder="단어 이름"
              name="wordName"
              value={card.wordName}
              onChange={(e) => handleWordCardChange(index, 'wordName', e.target.value)}
            />
          </D.WordName>
          <D.SecondTitle>단어 설명</D.SecondTitle>
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
      <C.SubmitButton style={{ marginBottom: '6%' }}>제출</C.SubmitButton>
    </>
  );
};

export default WordDetailTchr;