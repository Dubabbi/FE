//WordDetailTchr.jsx
import React from 'react';
import * as W from '../WordTchr/WordStyle';
import * as D from './WordDetailStyle';
import Back from '/src/assets/image/back.svg';

const WordDetailTchr = () => {
  return (
    <>
    <D.ImageWrap>
    <a href="/WordTchr"><img src={Back} alt="" /></a>
    </D.ImageWrap>
    <W.LessonWrapper>
        <W.Section>
        <W.Section>
            <h1>낱말 카드 학습 </h1>
        </W.Section>
        </W.Section>
    </W.LessonWrapper>
    </>
  );
};


export default WordDetailTchr;