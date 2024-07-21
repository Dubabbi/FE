// Template3Std.jsx
import React, { useState } from "react";
import styled from "styled-components";
import * as C from "../CreateLesson/CreateLessonStyle";
import * as S from "../SelfStudy/SelfStudyStyle";
import * as D from "../WordCreateTchr/WordDetailStyle";
import Back from "/src/assets/icon/back.svg";
import * as O from "./Template1Std";
import cat from "../../assets/image/word.svg";

export const Box = styled.div`
  width: 85px;
  height: 35px;
  text-align: center;
  line-height: 35px;
  background-color: #969696;
  border-radius: 8px;
  font-size: 2rem;
  color: #ffffff;
`;

export const WordBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 15px;
`;

const Template3Std = () => {
  const [word, setWord] = useState(["친구들", "아기"]);
  return (
    <>
      <D.ImageWrap>
        <a href="/mainstd">
          <img src={Back} alt="" />
        </a>
      </D.ImageWrap>
      <S.AppContainer>
        <h1>분류하기</h1>
        <h2 style={{ fontSize: "1.8rem", margin: "50px 0 70px 0" }}>
          빈칸에 관형구를 입력해 주세요. (예시: 웃는, 슬픈, 화난)
        </h2>
        <O.Row style={{ height: "auto", justifyContent: "space-around" }}>
          {word.map((el) => (
            <O.Container>
              <img
                style={{ height: "180px", borderRadius: "12px" }}
                src={cat}
              />
              <WordBox>
                <Box />
                <Box>{el}</Box>
              </WordBox>
            </O.Container>
          ))}
        </O.Row>
        <C.SubmitButton style={{ margin: "100px 0 0 0", padding: "0" }}>
          제출
        </C.SubmitButton>
      </S.AppContainer>
    </>
  );
};

export default Template3Std;
