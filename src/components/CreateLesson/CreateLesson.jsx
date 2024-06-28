// CreateLesson.jsx
import React, { useState } from 'react';
import * as C from './CreateLessonStyle';
import * as D from '../WordCreateTchr/WordDetailStyle';
import * as L from '../LessonTchr/LessonStyle';
import Back from '/src/assets/icon/back.svg'
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom'; 

const templates = [
  '/src/assets/image/template/template1.svg',
  '/src/assets/image/template/template2.svg',
  '/src/assets/image/template/template3.svg',
  '/src/assets/image/template/template4.svg',
  '/src/assets/image/template/template5.svg'
];

const levels = [
  '/src/assets/image/level/level1.svg',
  '/src/assets/image/level/level2.svg',
  '/src/assets/image/level/level3.svg',
  '/src/assets/image/level/level4.svg',
  '/src/assets/image/level/level5.svg'
];



    const CreateLesson = () => {
      const [titleValue, setTitleValue] = useState(''); 
      const [selectedTemplate, setSelectedTemplate] = useState(null);
      const [selectedLevel, setSelectedLevel] = useState(null);
      const navigate = useNavigate();
      
      const handleLevelSelect = (index) => {
        setSelectedLevel(index);
      };

      const handleTemplateSelect = (index) => {
        setSelectedTemplate(index);
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Title:', titleValue);
        switch (selectedTemplate) {
          case 0:
            navigate('/TemplateTchr1');
            break;
          case 1:
            navigate('/TemplateTchr2');
            break;
          case 2:
            navigate('/TemplateTchr3');
            break;
          case 3:
            navigate('/TemplateTchr4');
            break;
          case 4:
            navigate('/TemplateTchr5');
            break;
          default:
            alert('템플릿을 선택해주세요!');
            break;
        }
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
            value={titleValue}
            onChange={(e) => setTitleValue(e.target.value)}
          />
        </C.Input>
        <C.Title>난이도 설정</C.Title>
        <C.TemplateList>
        {levels.map((level, index) => (
            <img
              key={index}
              src={level}
              onClick={() => handleLevelSelect(index)}
              style={{ outline: selectedLevel === index ? '3px solid #ACAACC' : 'none', borderRadius: '5px'}}
            />
          ))}

        </C.TemplateList>
        <C.Title>템플릿 선택</C.Title>
        <C.TemplateList>
        {templates.map((template, index) => (
            <img
              key={index}
              src={template}
              onClick={() => handleTemplateSelect(index)}
              style={{ outline: selectedTemplate === index ? '3px solid #ACAACC' : 'none' , borderRadius: '15px'}}
            />
          ))}

        </C.TemplateList>
        </C.LessonBox>
        <C.SubmitButton onClick={handleSubmit} style={{marginTop: '2%', marginBottom: '3%'}}>제출</C.SubmitButton>
    </>
  );
};

export default CreateLesson;