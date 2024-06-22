//WordDetailTchr.jsx
import React, { useState, useRef } from 'react';
import * as W from '../WordTchr/WordStyle';
import * as D from './WordDetailStyle';
import * as C from '../CreateLesson/CreateLessonStyle';
import Back from '/src/assets/image/back.svg';
import Form from 'react-bootstrap/Form';

const WordDetailTchr = () => {
  const selectFileRef = useRef(null);
  const [file, setFile] = useState(null);
  
  const [formData, setFormData] = useState({
    title: '',
    wordName: '',
    wordDescription: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
  };

  const handleFileUpload = () => {
    selectFile.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFile(file.name); 
    }
  };

  const handleFileUploadClick = () => {
    selectFileRef.current.click();
  };

  return (
    <>
    <D.ImageWrap>
    <a href="/WordTchr"><img src={Back} alt="" /></a>
    </D.ImageWrap>
    <W.LessonWrapper>
        <W.Section style={{marginTop: '4%'}}>
            <h1>낱말 카드 학습 </h1>
        </W.Section>
    </W.LessonWrapper>
    <D.SecondTitle>세트 이름</D.SecondTitle>
    <D.Title onSubmit={handleSubmit}>
          <Form.Control
          type="text"
          placeholder="제목을 입력하세요."
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          />
    </D.Title>
    <hr style={{width: '60%', margin: '80px', marginLeft: '20%'}}/>
      <D.Line>
        <D.Box>
          <D.SecondTitle>이미지 업로드</D.SecondTitle>
          <input
              type="file"
              style={{ display: "none" }}
              ref={selectFileRef}
              onChange={handleFileChange}
            />
            <D.FileButton onClick={handleFileUploadClick}>파일 업로드</D.FileButton>
              {file && <div style={{
                fontFamily: "Arial",
                padding: "10px",
                marginLeft: '70px'}}>선택된 파일: {file} </div>}
        </D.Box>
        <D.SecondBox>
          <D.SecondTitle>단어</D.SecondTitle>
          <D.WordName>
            <Form.Control
              type="text"
              placeholder="단어 이름"
              name="wordName"
              style={{width: '1000px'}}
              value={formData.wordName}
              onChange={handleInputChange}
            />
          </D.WordName>
          <D.SecondTitle>단어 설명</D.SecondTitle>
          <D.AboutWord placeholder="단어 설명">
          </D.AboutWord>
        </D.SecondBox>
      </D.Line>
      <hr style={{width: '60%', margin: '80px', marginLeft: '20%'}}/>
      <D.Line>
        <D.Box>
          <D.SecondTitle>이미지 업로드</D.SecondTitle>
          <input
              type="file"
              style={{ display: "none" }}
              ref={selectFileRef}
              onChange={handleFileChange}
            />
            <D.FileButton onClick={handleFileUploadClick}>파일 업로드</D.FileButton>
              {file && <div style={{
                fontFamily: "Arial",
                padding: "10px",
                marginLeft: '70px'}}>선택된 파일: {file} </div>}
        </D.Box>
        <D.SecondBox>
          <D.SecondTitle>단어</D.SecondTitle>
          <D.WordName>
            <Form.Control
              type="text"
              placeholder="단어 이름"
              name="wordName"
              value={formData.wordName}
              onChange={handleInputChange}
            />
          </D.WordName>
          <D.SecondTitle>단어 설명</D.SecondTitle>
          <D.AboutWord 
          as="textarea"
          placeholder="단어 설명"
          name="wordDescription"
          value={formData.wordDescription}
          onChange={handleInputChange}>
          </D.AboutWord>
        </D.SecondBox>
      </D.Line>
      <hr style={{width: '60%', marginTop: '80px', marginLeft: '20%'}}/>
      <C.SubmitButton style={{marginBottom: '6%'}}>제출</C.SubmitButton>
    </>
  );
};


export default WordDetailTchr;