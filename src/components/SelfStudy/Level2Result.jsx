import React, { useState } from "react";
import * as S from "./SelfStudyStyle";
import * as D from "../WordCreateTchr/WordDetailStyle";
import * as L from "./Level1Style";
import * as T from "./Level2Style";
import Back from "/src/assets/icon/back.svg";
//import picture from "/src/assets/image/word.svg";
import picture from "./6.png";
import hint from "/src/assets/image/hint.svg";
import { useLocation } from "react-router-dom";

export default function Level2Result() {
  const hintClick = (state) => {
    setHintState(state);
  };
  const [data, selectNum, answerType] = useLocation().state;
  const [hintState, setHintState] = useState(false);

  return (
    <>
      <D.ImageWrap>
        <a href="/selfstudy">
          <img src={Back} alt="" />
        </a>
      </D.ImageWrap>
      <S.AppContainer style={{ height: "100%" }}>
        <h1>자율학습 L1</h1>
        {/* 해답 */}
        <S.rowContainer width="90%">
          <T.SentenceContainer
            answerType={answerType}
            style={{ maxWidth: "180px" }}
          >
            {answerType ? "잘했어요!" : "다시 생각해 볼까요?"}
          </T.SentenceContainer>
          <T.SentenceContainer
            onClick={() => hintClick(true)}
            style={{ border: "2px solid #acaacc", maxWidth: "400px" }}
          >
            <img src={hint} />
            {answerType ? "해설 보기" : "힌트 보기"}
          </T.SentenceContainer>
        </S.rowContainer>
        {/* 해설 및 힌트 말풍선 */}
        <T.hintBubble state={hintState}>
          {answerType ? "해설" : "힌트"}
          <T.hint>
            {answerType ? data.comment : data.hint}
            <T.hintClose onClick={() => hintClick(false)}>확인</T.hintClose>
          </T.hint>
        </T.hintBubble>
        {/* 문제 */}
        <T.rowContainer>
          <T.imgContainer src={picture} />
          <T.questionContainer>
            <S.rowContainer>
              <L.SecondTitle style={{ width: "150px" }}>
                {data.answer}
              </L.SecondTitle>
              <T.answerBox clickstate={answerType}>
                {data.list[selectNum - 1]}
              </T.answerBox>
            </S.rowContainer>
            {data.list.map((el, index) => (
              <S.rowContainer onClick={() => numClick(el)}>
                <T.num>{index + 1}</T.num>
                <T.list>{el}</T.list>
              </S.rowContainer>
            ))}
          </T.questionContainer>
        </T.rowContainer>
        {/* 버튼 */}
        <S.rowContainer width="70%" style={{ margin: "25px 0" }}>
          <a href="/mainstd">
            <D.BottomButton style={{ margin: "0 20px", width: "140px" }}>
              그만 할래요.
            </D.BottomButton>
          </a>
          <a href="/selfstudy">
            <D.BottomButton style={{ margin: "0 20px", width: "140px" }}>
              또 할래요!
            </D.BottomButton>
          </a>
        </S.rowContainer>
      </S.AppContainer>
    </>
  );
}
