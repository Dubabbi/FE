import React, { useState } from "react";
import * as S from "./SelfStudyStyle";
import * as D from "../WordCreateTchr/WordDetailStyle";
import * as L from "./Level1Style";
import Back from "/src/assets/icon/back.svg";
import { useNavigate } from "react-router-dom";

export default function Level1() {
  const navigate = useNavigate();
  const handleClick = () => {
    if (selectList.length === 3) {
      navigate("/level1result", { state: selectList });
    } else {
      alert("단어를 모두 선택해주세요!");
    }
  };
  const [wordList, setwordList] = useState([
    {
      color: "#feeafa",
      word: ["친구들", "짝궁", "선생님", "동생"],
      clicked: [0, 0, 0, 0],
    },
    {
      color: "#FED7D7",
      word: ["기쁘게", "즐겁게", "화나게", "슬프게"],
      clicked: [0, 0, 0, 0],
    },
    {
      color: "#C3AED6",
      word: ["혼나다", "논다", "뛴다", "운다"],
      clicked: [0, 0, 0, 0],
    },
  ]);

  const [selectList, setSelectList] = useState([""]);

  const wordClick = (event, index) => {
    const newWordList = [...wordList];
    newWordList[event.target.id].clicked = [0, 0, 0, 0];
    newWordList[event.target.id].clicked[index] = 1;
    setwordList(newWordList);
    const newSelectList = [...selectList];
    newSelectList[event.target.id] = event.target.innerText;
    setSelectList(newSelectList);
  };

  return (
    <>
      <D.ImageWrap>
        <a href="/selfCategory">
          <img src={Back} alt="" />
        </a>
      </D.ImageWrap>
      <S.AppContainer>
        <h1>자율학습 L1</h1>
        <S.SecondTitle style={{ margin: "20px 0px" }}>
          단어를 골라 문장을 완성해 보자!
        </S.SecondTitle>
        {/* 선택한 문장 */}
        <L.SentenceContainer>
          <L.WordBox>{selectList[0]}</L.WordBox>
          <L.SecondTitle>이/가</L.SecondTitle>
          <L.WordBox style={{ backgroundColor: "#FED7D7" }}>
            {selectList[1]}
          </L.WordBox>
          <L.WordBox style={{ backgroundColor: "#C3AED6" }}>
            {selectList[2]}
          </L.WordBox>
        </L.SentenceContainer>
        {/* 단어 목록 */}
        <L.wordContainer>
          {wordList.map((el, listIndex) => (
            <S.rowContainer
              key={listIndex}
              style={{ justifyContent: "space-evenly" }}
            >
              {el.word.map((word, wordIndex) => (
                <L.WordBox
                  id={listIndex}
                  key={wordIndex}
                  style={{ backgroundColor: el.color }}
                  onClick={(e) => wordClick(e, wordIndex)}
                  clickstate={el.clicked[wordIndex]}
                >
                  {word}
                </L.WordBox>
              ))}
            </S.rowContainer>
          ))}
        </L.wordContainer>
        {/* 버튼 */}
        <D.BottomButton
          style={{ margin: "20px 0", width: "150px" }}
          onClick={handleClick}
        >
          그림 만들기
        </D.BottomButton>
      </S.AppContainer>
    </>
  );
}
