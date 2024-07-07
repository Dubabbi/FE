import React from "react";
import * as S from "./SelfStudyStyle";
import * as D from "../WordCreateTchr/WordDetailStyle";
import Back from "/src/assets/icon/back.svg";

export default function SelfStudy() {
  return (
    <>
      <D.ImageWrap>
        <a href="/mainstd">
          <img src={Back} alt="" />
        </a>
      </D.ImageWrap>
      <S.AppContainer>
        <h1>자율학습</h1>
        <S.LevelContainer>
          <S.SecondTitle>학습할 레벨을 선택해 주세요.</S.SecondTitle>
          <S.rowContainer>
            <a href="/selfcategory">
              <S.level>Level 1</S.level>
            </a>
            <a href="/level2">
              <S.level style={{ backgroundColor: "#C3AED6" }}>Level 2</S.level>
            </a>
          </S.rowContainer>
        </S.LevelContainer>
      </S.AppContainer>
    </>
  );
}
