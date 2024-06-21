// CreateLesson.jsx
import React, { useState } from 'react';
import * as C from './CreateLessonStyle';
import * as D from '../WordDetailTchr/WordDetailStyle';
import * as L from '../LessonTchr/LessonStyle';
import Back from '/src/assets/image/back.svg';
import Form from 'react-bootstrap/Form';
import Template1 from '/src/assets/image/template/template1.svg';
import Template2 from '/src/assets/image/template/template2.svg';
import Template3 from '/src/assets/image/template/template3.svg';
import Template4 from '/src/assets/image/template/template4.svg';
import Template5 from '/src/assets/image/template/template5.svg';
import Level1 from '/src/assets/image/level/level1.svg';
import Level2 from '/src/assets/image/level/level2.svg';
import Level3 from '/src/assets/image/level/level3.svg';
import Level4 from '/src/assets/image/level/level4.svg';
import Level5 from '/src/assets/image/level/level5.svg';

const CreateLesson = () => {
    const [searchValue, setSearchValue] = useState('');

    const handleSubmit = (e) => {
      e.preventDefault();
      console.log('Search:', searchValue);
      setSearchValue('');
    };
  return (
    <>
      <D.ImageWrap>
        <a href="/MainTchr"><img src={Back} alt="" /></a>
      </D.ImageWrap>
      <L.LessonWrapper>
        <L.Section>
          <h1>강의 생성</h1>
        </L.Section>
      </L.LessonWrapper>
      <C.LessonBox>
      <C.Title>강의 제목</C.Title>
      <C.Input onSubmit={handleSubmit}>
          <Form.Control
            type="text"
            placeholder="제목을 입력하세요."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </C.Input>
        <C.Title>난이도 설정</C.Title>
        <C.TemplateList>
          <img src={Level1} />
          <img src={Level2} />
          <img src={Level3} />
          <img src={Level4} />
          <img src={Level5} />
        </C.TemplateList>
        <C.Title>템플릿 선택</C.Title>
        <C.TemplateList>
          <img src={Template1} />
          <img src={Template2} />
          <img src={Template3} />
          <img src={Template4} />
          <img src={Template5} />
        </C.TemplateList>
        </C.LessonBox>
        <C.SubmitButton>제출</C.SubmitButton>
    </>
  );
};

export default CreateLesson;