import React from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./SelfStudyStyle";
import * as D from "../WordCreateTchr/WordDetailStyle";
import Back from "/src/assets/icon/back.svg";

export default function SelfStudy() {
  const navigate = useNavigate();
  const btnClick = (level) => {
    navigate("/selfcategory", { state: level });
  };
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
            <S.level onClick={() => btnClick(1)}>Level 1</S.level>
            <S.level
              style={{ backgroundColor: "#C3AED6" }}
              onClick={() => btnClick(2)}
            >
              Level 2
            </S.level>
          </S.rowContainer>
        </S.LevelContainer>
      </S.AppContainer>
    </>
  );
}
