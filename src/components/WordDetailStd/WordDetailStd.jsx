//WordDetailStd.jsx
import React from 'react';
import * as W from '../WordTchr/WordStyle';
import * as D from '../WordDetailTchr/WordDetailStyle';
import word from '../../assets/image/word.svg';
import arrowback from '../../assets/image/arrowback.svg';
import arrownext from '../../assets/image/arrownext.svg';
import Back from '/src/assets/image/back.svg';

const WordDetailStd = () => {

  return (
    <>
        <D.ImageWrap>
          <a href="/WordStd"><img src={Back} alt="" /></a>
        </D.ImageWrap>
      <W.LessonWrapper>
        <D.Section>
          <D.Section>
              <h1>낱말 카드 학습 </h1>
          </D.Section>
          <D.CardTitle><p>동물</p></D.CardTitle>
          <D.WordList>
            <D.WordBoard>
              <D.ArrowButton><img src={arrowback} alt = "이전"/></D.ArrowButton>
              <D.Word><img src={word} alt = "단어"/></D.Word>
              <D.ArrowButton><img src={arrownext} alt = "다음"/></D.ArrowButton>
            </D.WordBoard>
          </D.WordList>
        </D.Section>
        <D.BottomButton>
          <a href="/MainStd">학습 종료</a>
        </D.BottomButton>
      </W.LessonWrapper>
      </>
  );
};

export default WordDetailStd;