import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import Form from 'react-bootstrap/Form';
import CommonTable from '../LessonTchr/CommonTable';
import CommonTableColumn from '../LessonTchr/CommonTableColumn';
import CommonTableRow from '../LessonTchr/CommonTableRow';
import * as L from '../LessonTchr/LessonStyle';
import Back from '/src/assets/icon/back.svg'
import * as D from '../WordCreateTchr/WordDetailStyle';

const LessonStd = () => {
  const [lessons, setLessons] = useState([
    { id: 1, title: "동물에 대해서 알아볼까요?", template: "어휘 카드 매칭 게임", date: "2023-05-01", level: 1 },
    { id: 2, title: "동물, 식물, 사물 구분하기", template: "카테고리 분류하기", date: "2023-05-09", level: 2 },
    { id: 3, title: "학교에서는 이렇게 감정을 표현해요!", template: "감정표현", date: "2023-05-10", level: 2 },
    { id: 4, title: "우리 주변에서 볼 수 있는 것들", template: "이미지 순서 배열", date: "2023-05-14", level: 1 },
    { id: 5, title: "애니메이션 up 이야기 알아보기", template: "이야기 순서 배열", date: "2023-05-21", level: 2 },
    { id: 6, title: "식물에 대해 알아볼까요?", template: "어휘 카드 매칭 게임", date: "2023-06-01", level: 2 },
    { id: 7, title: "일상에서는...", template: "감정 표현", date: "2023-06-02", level: 3 },
    { id: 8, title: "자주 사용하는 물건들", template: "어휘 카드 매칭 게임", date: "2023-06-04", level: 3 },
    { id: 9, title: "먹을 수 있는 것과 먹을 수 없는 것", template: "카테고리 분류하기", date: "2023-06-10", level: 3 },
    { id: 10, title: "엘리멘탈 이야기 알아보기", template: "이야기 순서 배열", date: "2023-06-13", level: 3 },
    { id: 11, title: "식당에서 주문하는 순서", template: "이미지 순서 배열", date: "2023-06-18", level: 4 },
    { id: 12, title: "영화 인물에 공감하기", template: "감정표현", date: "2023-06-21", level: 4 },
    { id: 13, title: "전래동화 이야기 알아보기", template: "이야기 순서 배열", date: "2023-06-22", level: 5 },
    { id: 14, title: "한국 전통 음식", template: "어휘 카드 매칭 게임", date: "2023-06-30", level: 5 },
    { id: 15, title: "과목에 대해 알아보자!", template: "카테고리 분류하기", date: "2023-07-01", level: 5 },
  ]);

  const [searchValue, setSearchValue] = useState('');

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
        {lessons.map(lesson => (
            <CommonTableRow key={lesson.id}>
            <CommonTableColumn>{lesson.id}</CommonTableColumn>
            <CommonTableColumn>
              <a href='/LessonDetailTchr'>
              {lesson.title}
              </a>
              </CommonTableColumn>
            <CommonTableColumn>{lesson.template}</CommonTableColumn>
            <CommonTableColumn>{lesson.date}</CommonTableColumn>
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