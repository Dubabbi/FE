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
  const [wordSets, setWordSets] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/word/wordSet/all', {
          headers: {
            'Authorization': 'Bearer xfe38sefpESfd39er'
          }
        });
        if (response.data.isSuccess && response.data.data) {
          setWordSets(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching data: ', error.response ? error.response : error);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchValue('');
  };

  const [error, setError] = useState('');

useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axios.get('/api/word/wordSet/all', {
        headers: {
          'Authorization': 'Bearer xfe38sefpESfd39er'
        }
      });
      if (response.data.isSuccess) {
        setWordSets(response.data.data);
        setError(''); 
      } else {
        setError(response.data.message || 'Data fetch failed.'); 
      }
    } catch (error) {
      setError('Network or server error.');  
    }
  };
  fetchData();
}, []);

  return (
    <>
    {error && <div style={{ color: 'red' }}>{error}</div>}
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
          <CommonTable headersName={['ID', 'Title', 'Category', 'Description']}>
            {wordSets.map(set => (
              <CommonTableRow key={set.wordSetId}>
                <CommonTableColumn>{set.wordSetId}</CommonTableColumn>
                <CommonTableColumn>{set.title}</CommonTableColumn>
                <CommonTableColumn>{set.category}</CommonTableColumn>
                <CommonTableColumn>{set.description}</CommonTableColumn>
              </CommonTableRow>
            ))}
          </CommonTable>
        </L.Section>
      </L.LessonWrapper>
    </>
  );
};

export default WordListTchr;
