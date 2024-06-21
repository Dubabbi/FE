//WordDetailTchr.jsx
import React, { useState, useRef } from 'react';
import * as W from '../WordTchr/WordStyle';
import * as D from './WordDetailStyle';
import Back from '/src/assets/image/back.svg';
import Form from 'react-bootstrap/Form';

const WordDetailTchr = () => {
  const selectFile = useRef("");
    const [searchValue, setSearchValue] = useState('');
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log('Search:', searchValue);
      setSearchValue('');
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
    <D.Title onSubmit={handleSubmit}>
          <Form.Control
            type="text"
            placeholder="제목을 입력하세요."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
    </D.Title>
    <input
        type="file"
        style={{ display: "none" }}
        ref={selectFile} //input에 접근 하기위해 useRef사용
      />
      <D.CreateButton onClick={() => selectFile.current.click()}>파일 업로드</D.CreateButton>
    </>
  );
};


export default WordDetailTchr;