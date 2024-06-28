// Template2Tchr.jsx
import React, { useState } from 'react';
import * as C from './CreateLessonStyle';
import * as L from '../LessonTchr/LessonStyle';
import * as D from '../WordCreateTchr/WordDetailStyle';
import Back from '/src/assets/icon/back.svg'


const Template2Tchr = () => {
  return (
    <>
    <D.ImageWrap>
      <a href="/MainTchr"><img src={Back} alt="" /></a>
    </D.ImageWrap>
    <L.LessonWrapper>
    <L.Section>
          <h1>이미지 순서 배열하기</h1>
          <p>순서대로 이미지를 생성해 주세요.</p>
        </L.Section>
      </L.LessonWrapper>
      <C.SubmitButton>제출</C.SubmitButton>
    </>
  );
};

export default Template2Tchr;