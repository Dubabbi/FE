import React from "react";
import * as S from "./SelfStudyStyle";
import * as D from "../WordCreateTchr/WordDetailStyle";
import * as L from "./Level1Style";
import Back from "/src/assets/icon/back.svg";
import picture from "/src/assets/image/word.svg";
import { useLocation } from "react-router-dom";

export default function Level1Result() {
  const [first, second, third] = useLocation().state;

  return (
    <>
      <D.ImageWrap>
        <a href="/level1">
          <img src={Back} alt="" />
        </a>
      </D.ImageWrap>
      <S.AppContainer>
        <h1>자율학습 L1</h1>
        {/* 임시로 넣은 이미지 */}
        <L.imgContainer src={picture} />
        <L.SentenceContainer style={{ height: "70px" }}>
          <L.SecondTitle
            style={{ width: "100%" }}
          >{`${first}이/가 ${second} ${third}`}</L.SecondTitle>
        </L.SentenceContainer>
        <S.rowContainer width="30%">
          <a href="/mainstd">
            <D.BottomButton style={{ margin: "0 20px", width: "140px" }}>
              그만 할래요.
            </D.BottomButton>
          </a>
          <a href="/selfCategory">
            <D.BottomButton style={{ margin: "0 20px", width: "140px" }}>
              또 할래요!
            </D.BottomButton>
          </a>
        </S.rowContainer>
      </S.AppContainer>
    </>
  );
}
