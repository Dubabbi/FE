//WordLearnStd.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import * as W from '../WordTchr/WordStyle';
import * as D from '../WordCreateTchr/WordDetailStyle';
import arrowback from '../../assets/icon/arrowback.svg';
import arrownext from '../../assets/icon/arrownext.svg';
import Back from '/src/assets/icon/back.svg';

const WordLearnStd = () => {
  const navigate = useNavigate();
  const { setId } = useParams();
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [wordSet, setWordSet] = useState({
    title: '',
    category: '',
    description: '',
    wordCards: []
  });

  useEffect(() => {
    const fetchWordSet = async () => {
      try {
        const response = await axios.get(`https://maeummal.com/word/wordSet?wordSetId=${setId}`);
        if (response.data.isSuccess) {
          const { title, category, description, wordList, image} = response.data.data;
          setWordSet({ title, category, description, wordCards: wordList, imagePreviewUrl: image });
        }
      } catch (error) {
        console.error("Error fetching word set:", error);
        alert('Failed to load word set.');
      }
    };
    fetchWordSet();
  }, [setId]);

  const handlePrev = () => {
    if (currentWordIndex > 0) {
      setCurrentWordIndex(currentWordIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentWordIndex < wordSet.wordCards.length - 1) {
      setCurrentWordIndex(currentWordIndex + 1);
    } else {
      alert("마지막 이미지입니다.");
    }
  };

  return (
    <>
      <D.ImageWrap>
        <a href="/WordStd"><img src={Back} alt="Back to main" /></a>
      </D.ImageWrap>
      <W.LessonWrapper>
        <D.Section>
        <D.Section>
              <h1>낱말 카드 학습 </h1>
          </D.Section>          
          <D.CardTitle>{wordSet.title}</D.CardTitle>
          <D.WordList>
            <D.WordBoard>
              <D.ArrowButton onClick={handlePrev}><img src={arrowback} alt="이전" /></D.ArrowButton>
              <D.Word>
                <img src={wordSet.wordCards[currentWordIndex]?.image || ''} alt="단어 이미지" />
              </D.Word>
              <D.ArrowButton onClick={handleNext}><img src={arrownext} alt="다음" /></D.ArrowButton>
            </D.WordBoard>
          </D.WordList>
        </D.Section>
        <D.BottomButton style={{ marginBottom: '4%' }}>
          <a href="/WordStd">학습 종료</a>
        </D.BottomButton>
      </W.LessonWrapper>
    </>
  );
};

export default WordLearnStd;