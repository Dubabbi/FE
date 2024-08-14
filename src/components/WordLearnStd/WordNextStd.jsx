//WordNextStd.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as W from '../WordTchr/WordStyle';
import * as D from '../WordCreateTchr/WordDetailStyle';
import Back from '/src/assets/icon/back.svg'

const WordNextStd = () => {

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
          <D.CardTitle><p>학습 추천</p></D.CardTitle>
          <D.WordSecondList>
            <D.WordBoard style={{fontSize: '1.1vw', marginTop: '2%'}}>
                낱말 카드 세트로 제작한 수업
            </D.WordBoard>
            
            <D.NextLesson style={{marginTop:'8%', backgroundColor: '#FED7D7'}}><a href ='/Template1Std'><p>동물, 식물, 음식을 구분해요!</p></a></D.NextLesson>
            
            <D.NextLesson style={{marginTop:'1%', backgroundColor: 'rgba(195, 174, 214, 0.5)'}}><a href ='/Template5Std'><p>동물 카드 매칭 게임</p></a></D.NextLesson>
          </D.WordSecondList>
        </D.Section>
        <D.BottomButton style={{marginBottom: '4%'}}>
          <a href="/MainStd">학습 종료</a>
        </D.BottomButton>
      </W.LessonWrapper>
      </>
  );
};

export default WordNextStd;