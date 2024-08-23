import React, { useState } from 'react';
import * as C from './CreateLessonStyle';
import * as D from '../WordCreateTchr/WordDetailStyle';
import * as L from '../LessonTchr/LessonStyle';
import Back from '/src/assets/icon/back.svg';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import template1 from '/src/assets/image/template/template1.svg';
import template2 from '/src/assets/image/template/template2.svg';
import template3 from '/src/assets/image/template/template3.svg';
import template4 from '/src/assets/image/template/template4.svg';
import template5 from '/src/assets/image/template/template5.svg';

import level1 from '/src/assets/image/level/level1.svg';
import level2 from '/src/assets/image/level/level2.svg';
import level3 from '/src/assets/image/level/level3.svg';
import level4 from '/src/assets/image/level/level4.svg';
import level5 from '/src/assets/image/level/level5.svg';

const templates = [
    template1, template2, template3, template4, template5
];

const levels = [
    level1, level2, level3, level4, level5
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                title: titleValue,
                content: `TEMPLATE${selectedTemplate + 1}`,
                difficulty: selectedLevel + 1,
                created_at: new Date().toISOString(),
                view: 0,
                category: 'One'
            };
            navigate(`/Template${selectedTemplate + 1}Tchr`, { state: payload }); 
        } catch (error) {
            console.error('강의 생성 중 에러 발생:', error);
            alert('강의 생성에 실패했습니다: ' + error.message);
        }
    };

    return (
        <>
            <D.ImageWrap>
                <a href="/MainTchr"><img src={Back} alt="Back to main" /></a>
            </D.ImageWrap>
            <L.LessonWrapper>
                <L.Section>
                    <h1>강의 생성</h1>
                </L.Section>
            </L.LessonWrapper>
            <C.LessonBox>
                <C.Title>강의 제목</C.Title>
                <C.Input>
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
                            style={{ outline: selectedLevel === index ? '3px solid #ACAACC' : 'none', borderRadius: '5px', cursor: 'pointer' }}
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
                            style={{ outline: selectedTemplate === index ? '3px solid #ACAACC' : 'none', borderRadius: '15px', cursor: 'pointer' }}
                        />
                    ))}
                </C.TemplateList>
            </C.LessonBox>
            <C.SubmitButton onClick={handleSubmit} style={{ marginTop: '2%', marginBottom: '3%' }}>제출</C.SubmitButton>
        </>
    );
};

export default CreateLesson;
