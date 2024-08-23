//LessonDetailTchr.jsx
import React, { useEffect, useState } from 'react';
import * as L from '../LessonTchr/LessonStyle';
import * as D from '../WordCreateTchr/WordDetailStyle';
import * as S from './LessonDetailStyle';
import Level from '/src/assets/image/level/level1.svg';
import Back from '/src/assets/icon/back.svg'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Word from '/src/assets/image/word.svg';
import Edit from '/src/assets/icon/edit.svg';
import Delete from '/src/assets/icon/delete.svg';
import template1 from '/src/assets/image/template/template1.svg';
import template2 from '/src/assets/image/template/template2.svg';
import template3 from '/src/assets/image/template/template3.svg';
import template4 from '/src/assets/image/template/template4.svg';
import template5 from '/src/assets/image/template/template5.svg';

const LessonDetailTchr = () => {
  /*
  const { lessonId } = useParams();
  const [lessonDetails, setLessonDetails] = useState(null);

  useEffect(() => {
    axios.get(`https://maeummal.com/template2/get?template2Id=${lessonId}`)
        .then(response => {
            if (response.data.isSuccess) {
                setLessonDetails(response.data.data);
            } else {
                console.error('Failed to fetch lesson details');
            }
        })
        .catch(error => {
            console.error('Error fetching lesson details:', error);
        });
}, [lessonId]);

if (!lessonDetails) return <div>Loading...</div>;
*/
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
      <S.LessonBox style={{marginBottom:'3%'}}>
        <S.Line>
        <S.Title>강의 제목</S.Title>
          <S.Content style={{marginLeft:'1%'}}>강의 제목</S.Content>
          </S.Line>
        <S.Line>
        <S.Title>템플릿</S.Title>
          <S.Content style={{marginTop:'10%'}}><img src={template2} /></S.Content>
        </S.Line>
        <S.SecondLine style={{marginTop:'10%'}}>
        <S.Title>난이도</S.Title>
          <S.Content style={{marginTop:'1%'}}><img src={Level} /></S.Content>
        </S.SecondLine>
        <S.SecondLine style={{marginBottom:'2%'}}>
          <S.Title>해설</S.Title>
          <S.Content style={{marginLeft:'1%', marginTop:'0.5%'}}>해설~~</S.Content>
        </S.SecondLine>
        <S.SecondLine style={{marginBottom:'2%'}}>
          <S.Title>힌트</S.Title>
          <S.Content style={{marginLeft:'1%', marginTop:'0.5%'}}>힌트~~</S.Content>
        </S.SecondLine>
      </S.LessonBox>
    </>
  );
};

export default LessonDetailTchr;