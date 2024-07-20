import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as C from '../CreateLesson/CreateLessonStyle';
import * as L from '../LessonTchr/LessonStyle';
import * as D from '../WordCreateTchr/WordDetailStyle';
import Back from '/src/assets/icon/back.svg';
import up1 from '/src/assets/image/up1.svg';
import up2 from '/src/assets/image/up2.svg';
import up3 from '/src/assets/image/up3.svg';

const Template4Std = () => {
  const navigate = useNavigate();
  const [selectedCard, setSelectedCard] = useState(null);

  const handleSelectCard = (index) => {
    setSelectedCard(index);
  };

  const handleSubmit = () => {
    navigate('/Feedback2');
  };

  return (
    <>
      <D.ImageWrap>
        <a href="/MainTchr"><img src={Back} alt="" /></a>
      </D.ImageWrap>
      <L.LessonWrapper>
        <L.Section>
          <h1>이야기 순서 배열하기</h1>
          <p>Up 이야기 알아보기</p>
        </L.Section>
        <D.Select style={{width: '20%', marginLeft: '7px', marginBottom: '5px'}}>
        </D.Select>
        <C.StoryWrap>
          <C.CardContainer>
            {[up1, up2, up3].map((image, index) => (
              <C.SelectCard
                key={index}
                selected={selectedCard === index}
                onClick={() => handleSelectCard(index)}
              >
                <C.ImageList>
                  <div><img src={image} alt="" /></div>
                </C.ImageList>
                <C.Story><p>이야기</p></C.Story>
              </C.SelectCard>
            ))}
          </C.CardContainer>
        </C.StoryWrap>
      </L.LessonWrapper>
      <C.SubmitButton onClick={handleSubmit}>제출</C.SubmitButton>
    </>
  );
};

export default Template4Std;
