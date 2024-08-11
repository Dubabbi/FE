//WordLearnStd.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as W from '../WordTchr/WordStyle';
import * as D from '../WordCreateTchr/WordDetailStyle';
import word from '../../assets/image/word.svg';
import arrowback from '../../assets/icon/arrowback.svg';
import arrownext from '../../assets/icon/arrownext.svg';
import Back from '/src/assets/icon/back.svg'

const WordLearnStd = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [wordSet, setWordSet] = useState([]);

  useEffect(() => {
    const fetchWords = async () => {
        try {
            const response = await axios.get('https://maeummal.com/word/title?title=동물', {
            });
            if (response.data.isSuccess && response.data.data.length > 0) {
                setWordSet(response.data.data[0].wordEntities || []);
            }
        } catch (error) {
            console.error('Error fetching words:', error);
        }
    };
    fetchWords();
}, []);

  const handlePrev = () => {
      if (currentWordIndex > 0) {
          setCurrentWordIndex(currentWordIndex - 1);
      }
  };

  const handleNext = () => {
      if (currentWordIndex < wordSet.length - 1) {
          setCurrentWordIndex(currentWordIndex + 1);
      }
  };

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
            <D.ArrowButton onClick={handlePrev}><img src={arrowback} alt="이전" /></D.ArrowButton>
              <D.Word><img src={wordSet[currentWordIndex]?.image} alt = "단어"/></D.Word>
              <D.ArrowButton onClick={handleNext}><img src={arrownext} alt="다음" /></D.ArrowButton>
            </D.WordBoard>
          </D.WordList>
        </D.Section>
        <D.BottomButton style={{marginBottom: '4%'}}>
          <a href="/MainStd">학습 종료</a>
        </D.BottomButton>
      </W.LessonWrapper>
      </>
  );
};

export default WordLearnStd;