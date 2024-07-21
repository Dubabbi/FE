import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';
import CommonTable from './WordTable';
import CommonTableColumn from './WordTableColumn';
import CommonTableRow from './WordTableRow';
import * as L from '../LessonTchr/LessonStyle';
import Back from '/src/assets/icon/back.svg';
import * as D from '../WordCreateTchr/WordDetailStyle';

const WordListTchr = () => {
  const [words, setWords] = useState([]); // 상태 변수를 복수형으로 변경
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    fetch('http://ec2-3-34-149-148.ap-northeast-2.compute.amazonaws.com:8080/api/word/wordSet/all', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer <Your Access Token Here>' // 실제 토큰으로 교체 필요
      }
    })
    .then(response => response.json())
    .then(data => {
      if (data && data.data) {
        setWords(data.data.map(item => ({
          id: item.wordSetId,
          title: item.title,
          category: item.category,
          description: item.description
        })));
      }
    })
    .catch(error => console.error('Error fetching data: ', error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Search:', searchValue);
    setSearchValue('');
  };

  const items = words.map((word) => (
    <CommonTableRow key={word.id}>
      <CommonTableColumn>{word.id}</CommonTableColumn>
      <CommonTableColumn>
        <Link to={`/word/${word.id}`}>{word.title}</Link> // 경로 수정
      </CommonTableColumn>
      <CommonTableColumn>{word.category}</CommonTableColumn> // 카테고리 정보 표시
      <CommonTableColumn>{word.description}</CommonTableColumn> // 설명 표시
    </CommonTableRow>
  ));

  return (
    <>
      <D.ImageWrap>
        <a href="/MainTchr"><img src={Back} alt="" /></a>
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
          <CommonTable headersName={['No', '제목', '카테고리', '설명']}>{items}</CommonTable>
        </L.Section>
      </L.LessonWrapper>
    </>
  );
};

export default WordListTchr;
