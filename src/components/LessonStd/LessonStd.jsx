import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // useHistory 훅을 가져옵니다.
import { FaSearch } from 'react-icons/fa';
import Form from 'react-bootstrap/Form';
import CommonTable from '../LessonTchr/CommonTable';
import CommonTableColumn from '../LessonTchr/CommonTableColumn';
import CommonTableRow from '../LessonTchr/CommonTableRow';
import * as L from '../LessonTchr/LessonStyle';
import Back from '/src/assets/icon/back.svg'
import * as D from '../WordCreateTchr/WordDetailStyle';
import axios from 'axios';

const LessonStd = () => {
  const [searchValue, setSearchValue] = useState('');
  const [lessons, setLessons] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate(); 

  useEffect(() => {
    axios.get('https://maeummal.com/templates/all')
      .then(response => {
        if (response.data.isSuccess) {
          const sortedData = response.data.data.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt);
          });
          setLessons(sortedData);
        } else {
          throw new Error('Failed to fetch data');
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError(`Failed to load word sets: ${error.message}`);
      });
  }, []);

  const navigateToTemplate = (templateName) => {
    console.log(`Navigating to template: ${templateName}`); // 디버그 메시지 추가
    switch(templateName) {
      case '카테고리 분류하기': navigate('/template1std'); break;
      case '감정 표현': navigate('/template3std'); break;
      case '이미지 순서 배열하기': navigate('/template2std'); break;
      case '이야기 순서 배열하기': navigate('/template4std'); break;
      case '어휘 카드 매칭 게임': navigate('/template5std'); break;
      default: console.error('No such template: ' + templateName);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Search:', searchValue);
    setSearchValue('');
  };

  return (
    <>
      <D.ImageWrap>
        <a href="/MainStd"><img src={Back} alt="" /></a>
      </D.ImageWrap>
    <L.LessonWrapper>
      <L.Section>
        <h1>수강 중인 강의</h1>
        <L.LineStd>
        <L.StyledForm onSubmit={handleSubmit}>
        <L.StyledButton type="submit" variant="none"><FaSearch size={15} /></L.StyledButton>
          <Form.Control
            type="text"
            placeholder="Search..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </L.StyledForm>
        </L.LineStd>
        <CommonTable>
        {lessons.map((lesson, index) => (
            <CommonTableRow key={`${lesson.id}_${index}`} >
            <CommonTableColumn>{lesson.templateId}</CommonTableColumn>
            <CommonTableColumn style={{fontWeight: 'bold'}}>
              <a onClick={() => navigateToTemplate(lesson.templateName)}>
              {lesson.title}
              </a>
            </CommonTableColumn>
            <CommonTableColumn>{lesson.templateName}</CommonTableColumn>
            <CommonTableColumn>{lesson.createdAt}</CommonTableColumn>
            <CommonTableColumn>{lesson.level}</CommonTableColumn>
            </CommonTableRow>
        ))}
        </CommonTable>
      </L.Section>
    </L.LessonWrapper>
    </>
  );
};

export default LessonStd;
