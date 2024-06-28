//LessonDetailTchr.jsx
import React from 'react';
import * as L from '../LessonTchr/LessonStyle';
import * as D from '../WordCreateTchr/WordDetailStyle';
import * as S from './LessonDetailStyle';
import Level from '/src/assets/image/level/level1.svg';
import Back from '/src/assets/icon/back.svg'
import Word from '/src/assets/image/word.svg';
import Edit from '/src/assets/icon/edit.svg';
import Delete from '/src/assets/icon/delete.svg';

const LessonDetailTchr = () => {

  return (
    <>
      <D.ImageWrap>
        <a href="/LessonTchr"><img src={Back} alt="Back 버튼" /></a>
      </D.ImageWrap>
      <L.LessonWrapper>
        <S.Section>
          <h1>강의 상세</h1>
          <img src={Edit} />
          <img src={Delete} />
        </S.Section>
      </L.LessonWrapper>
      <S.LessonBox>
        <S.Line>
        <S.Title>강의 제목</S.Title>
          <S.Content style={{marginLeft:'1%'}}>동물에 대해 알아볼까요?</S.Content>
          </S.Line>
        <S.Line>
        <S.Title>템플릿</S.Title>
          <S.Content style={{marginLeft:'1%'}}>낱말 카드 학습</S.Content>
        </S.Line>
        <S.SecondLine>
        <S.Title>난이도</S.Title>
          <S.Content><img src={Level} /></S.Content>
        </S.SecondLine>
        <S.SecondLine>
        <S.Title>낱말카드</S.Title>
          <S.SquareBox>
            <S.CardImage><img src={Word} /></S.CardImage>
            <S.CardImage>동물</S.CardImage>
          </S.SquareBox>
        </S.SecondLine>
      </S.LessonBox>
    </>
  );
};

export default LessonDetailTchr;