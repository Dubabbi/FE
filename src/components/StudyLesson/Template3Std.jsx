// Template3Std.jsx
import React, { useState } from "react";
import styled from "styled-components";
import * as C from "../CreateLesson/CreateLessonStyle";
import * as S from "../SelfStudy/SelfStudyStyle";
import * as D from "../WordCreateTchr/WordDetailStyle";
import * as T from "../CreateLesson/Template3Tchr";
import Back from "/src/assets/icon/back.svg";
import * as O from "./Template1Std";
import cat from "../../assets/image/word.svg";
import { BsHandIndexFill } from "react-icons/bs";

export const Box = styled.div`
  width: 75px;
  height: 35px;
  text-align: center;
  line-height: 35px;
  background-color: #969696;
  border-radius: 8px;
  font-size: 1.8rem;
  color: #ffffff;
`;

const InputBox = styled.input`
  width: 75px;
  height: 35px;
  text-align: center;
  line-height: 35px;
  background-color: #ffffff;
  border-radius: 8px;
  font-size: 1.5rem;
  color: #000000;
  border: 2.5px solid #969696;
`;

export const WordBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Example = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2.5px solid #fed7d7;
  border-radius: 10px;
  min-width: 100px;
  font-size: 1.5rem;
  height: 35px;
  margin: 0px 10px;
`;

const Template3Std = () => {
  const [word, setWord] = useState(["친구들", "아기"]);
  const [inputValue, setInputValue] = useState([""]);

  const handleInputChange = (e, index) => {
    const newInputValue = [...inputValue];
    newInputValue[index] = e.target.value;
    setInputValue(newInputValue);
  };
  return (
    <>
      <D.ImageWrap>
        <a href="/mainstd">
          <img src={Back} alt="" />
        </a>
      </D.ImageWrap>
      <S.AppContainer>
        <h1>감정표현</h1>
        <h2 style={{ fontSize: "1.8rem", margin: "40px 0 30px 0" }}>
          빈칸에 들어갈 관형구를 보기에서 골라 봅시다!
        </h2>
        <C.StoryWrap
          style={{
            width: "70%",
            borderRadius: "15px",
            margin: "0 0 10px 0",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
        >
          <T.ExampleBox>보기</T.ExampleBox>
          <T.CardContainer
            style={{ padding: "0px", justifyContent: "space-evenly" }}
          >
            {["행복한", "슬픈", "두려운", "쓸쓸한", "화난"].map((el, index) => (
              <Example key={index}>{el}</Example>
            ))}
          </T.CardContainer>
        </C.StoryWrap>
        <O.Row
          style={{
            margin: "0",
            justifyContent: "space-around",
            overflowX: "auto",
          }}
        >
          {word.map((el, index) => (
            <O.Container key={index} style={{ margin: "0 10px" }}>
              <img
                style={{ height: "170px", borderRadius: "12px" }}
                src={cat}
              />
              <WordBox>
                <InputBox
                  type="text"
                  placeholder="작성하기"
                  value={inputValue[index]}
                  onChange={(e) => handleInputChange(e, index)}
                />
                <Box>{el}</Box>
              </WordBox>
            </O.Container>
          ))}
        </O.Row>
        <C.SubmitButton style={{ margin: "0px 0 40px 0", padding: "0" }}>
          제출
        </C.SubmitButton>
      </S.AppContainer>
    </>
  );
};

export default Template3Std;
