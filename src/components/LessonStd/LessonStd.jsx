import React, { useState, useEffect } from 'react';
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

export default LessonStd;