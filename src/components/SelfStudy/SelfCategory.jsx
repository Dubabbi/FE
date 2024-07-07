import React, { useState } from "react";
import * as S from "./SelfStudyStyle";
import * as D from "../WordCreateTchr/WordDetailStyle";
import Back from "/src/assets/icon/back.svg";
import school from "/src/assets/image/selfCategory/school.svg";
import food from "/src/assets/image/selfCategory/food.svg";
import animal from "/src/assets/image/selfCategory/animal.svg";
import weather from "/src/assets/image/selfCategory/weather.svg";

export default function SelfCategory() {
  const [CategoryList, setCategoryList] = useState([
    { category: "학교", src: school },
    { category: "음식", src: food },
    { category: "동물", src: animal },
    { category: "날씨", src: weather },
  ]);

  return (
    <>
      <D.ImageWrap>
        <a href="/selfstudy">
          <img src={Back} alt="" />
        </a>
      </D.ImageWrap>
      <S.AppContainer>
        <h1>자율학습</h1>
        <S.CategoryContainer>
          <S.SecondTitle>학습할 카테고리를 선택해 주세요.</S.SecondTitle>
          <S.rowContainer>
            <S.overContainer>
              {CategoryList.map((item, index) => (
                <S.Category key={index}>
                  <a href="/level1">
                    <S.level style={{ width: "130px", height: "125px" }}>
                      <img src={item.src} alt="" />
                    </S.level>
                    <p>{item.category}</p>
                  </a>
                </S.Category>
              ))}
            </S.overContainer>
          </S.rowContainer>
        </S.CategoryContainer>
      </S.AppContainer>
    </>
  );
}
