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
      const url = `https://maeummal.com/word/wordSet?wordSetId=${setId}`;
      console.log(`Attempting to fetch word set from URL: ${url}`); // URL 로깅

      try {
        const response = await axios.get(url);
        if (response.data.isSuccess && response.data.data) {
          const { title, category, description, wordList, wordSetId } = response.data.data;
          setWordSet({
            title,
            category,
            description,
            setId: wordSetId,
            wordCards: wordList.map(word => ({
              id: word.wordId,
              meaning: word.meaning,
              description: word.description,
              image: word.image
            }))
          });
        } else {
          console.error('Failed to fetch word set:', response.data.message);
          throw new Error(`Failed to fetch word set: ${response.data.message}`);
        }
      } catch (error) {
        console.error('Error fetching word set:', error);
        alert(`Error fetching data: ${error.toString()}`);
      }
    };

    fetchWordSet();
  }, [setId]);
  

  const handlePrev = () => {
    if (currentWordIndex > 0) {
      setCurrentWordIndex(currentWordIndex - 1);
    } else {
      console.log('Already at the first word.');
    }
  };

  const handleNext = () => {
    if (currentWordIndex < wordSet.wordCards.length - 1) {
      setCurrentWordIndex(currentWordIndex + 1);
      console.log(`Moved to next word: Index ${currentWordIndex + 1}`);
    } else {
      console.log('Reached the last word.');
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
          <h1>낱말 카드 학습 - {wordSet.title}</h1>
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
