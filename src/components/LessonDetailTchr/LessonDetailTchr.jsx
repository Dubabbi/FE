//LessonDetailTchr.jsx
import React from 'react';
import * as L from '../LessonTchr/LessonStyle';
import * as D from '../WordDetailTchr/WordDetailStyle';
import Back from '/src/assets/image/back.svg';

const LessonDetailTchr = () => {

  return (
    <>
      <D.ImageWrap>
        <a href="/MainTchr"><img src={Back} alt="Back 버튼" /></a>
      </D.ImageWrap>
      <L.LessonWrapper>
        <L.Section>
          <h1>강의 상세</h1>
        </L.Section>
      </L.LessonWrapper>
    </>
  );
};

export default LessonDetailTchr;