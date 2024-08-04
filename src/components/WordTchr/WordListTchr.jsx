import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import CommonTable from './WordTable';
import CommonTableColumn from './WordTableColumn';
import CommonTableRow from './WordTableRow';
import * as L from '../LessonTchr/LessonStyle';
import Back from '/src/assets/icon/back.svg';
import * as D from '../WordCreateTchr/WordDetailStyle';

const WordListTchr = () => {
  const [words, setWords] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('/api/word/wordSet/all')
      .then(response => {
        if (response.data.isSuccess) {
          setWords(response.data.data);
          console.log('Data fetched successfully.');
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
    setSearchValue('');
  };

  return (
    <>
      <D.ImageWrap>
        <a href="/MainTchr"><img src={Back} alt="Back" /></a>
      </D.ImageWrap>
      <L.LessonWrapper>
        <L.Section>
          <h1>나의 낱말세트</h1>
          <L.Line>
            <L.Add><a href="/WordCreateTchr">✚ 낱말세트 추가</a></L.Add>
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
          {error && <div style={{ color: 'red' }}>{error}</div>}
          <CommonTable headersName={['ID', 'Title', 'Category', 'Description']}>
            {words.map((word) => (
              <CommonTableRow key={word.wordSetId}>
                <CommonTableColumn>{word.wordSetId}</CommonTableColumn>
                <CommonTableColumn>{word.title}</CommonTableColumn>
                <CommonTableColumn>{word.category}</CommonTableColumn>
                <CommonTableColumn>{word.description}</CommonTableColumn>
              </CommonTableRow>
            ))}
          </CommonTable>
        </L.Section>
      </L.LessonWrapper>
    </>
  );
};

export default WordListTchr;