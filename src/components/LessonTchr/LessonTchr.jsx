import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';
import CommonTable from './CommonTable';
import CommonTableColumn from './CommonTableColumn';
import CommonTableRow from './CommonTableRow';
import * as L from './LessonStyle';
import Back from '/src/assets/icon/back.svg'
import * as D from '../WordCreateTchr/WordDetailStyle';
import axios from 'axios';

const LessonTchr = () => {
  const [searchValue, setSearchValue] = useState('');
  const [lessons, setLessons] = useState([]);
  const [error, setError] = useState('');
  useEffect(() => {
    axios.get('https://maeummal.com/templates/all')
      .then(response => {
        if (response.data.isSuccess) {
          const sortedData = response.data.data.sort((a, b) => {
            // 날짜를 Date 객체로 변환하여 비교
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
        <h1>나의 강의</h1>
        <L.Line>
        <L.Add><a href="/CreateLesson">✚ 강의 추가</a></L.Add>
        <L.StyledForm onSubmit={handleSubmit}>
        <L.StyledButton type="submit" variant="none"><FaSearch size={15} /></L.StyledButton>
          <Form.Control
            type="text"
            placeholder="Search..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </L.StyledForm>
        </L.Line>
        <CommonTable>
        {lessons.map((lesson, index) => (
            <CommonTableRow key={`${lesson.id}_${index}`}>
            <CommonTableColumn>{lesson.templateId}</CommonTableColumn>
            <CommonTableColumn>
            <a href='/LessonDetailTchr'>
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

export default LessonTchr;