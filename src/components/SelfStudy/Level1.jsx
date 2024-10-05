import React, { useState, useEffect } from "react";
import axios from "axios";
import * as S from "./SelfStudyStyle";
import * as D from "../WordCreateTchr/WordDetailStyle";
import * as L from "./Level1Style";
import Back from "/src/assets/icon/back.svg";
import { Loading } from "./Loading";
import { useNavigate, useLocation } from "react-router-dom";

export default function Level1() {
  const data = useLocation().state;
  useEffect(() => {
    const newWordList = [...wordList];
    newWordList.map((el, index) => (el.word = data[index]));
    setwordList(newWordList);
  }, [data]);
  const navigate = useNavigate();
  const handleClick = () => {
    if (selectList.length === 3) {
      setLoading(true);
      const token = localStorage.getItem("key");
      axios
        .post(
          "https://maeummal.com/prep2/result",
          {
            noun: selectList[0],
            verb: selectList[2],
            adv: selectList[1],
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          if (response.status === 200 && token) {
            console.log("successful");
            const imgData = response.data.data;
            navigate("/level1result", { state: imgData });
          } else {
            throw new Error("Failed to fetch data");
          }
        })
        .catch((error) => {
          console.error("Error while create picture:", error);
        });
    } else {
      alert("단어를 모두 선택해주세요!");
    }
  };

  const [wordList, setwordList] = useState([
    {
      color: "#feeafa",
      word: ["", "", "", ""],
      clicked: [0, 0, 0, 0],
    },
    {
      color: "#FED7D7",
      word: ["", "", "", ""],
      clicked: [0, 0, 0, 0],
    },
    {
      color: "#C3AED6",
      word: ["", "", "", ""],
      clicked: [0, 0, 0, 0],
    },
  ]);

  const [selectList, setSelectList] = useState([""]);
  const [loading, setLoading] = useState(false);

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
      {loading ? (
        <S.AppContainer>
          <Loading title="그림" subtitle="그림을" />
        </S.AppContainer>
      ) : (
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
                    data-clickstate={el.clicked[wordIndex]}
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
      )}
    </>
  );
}
