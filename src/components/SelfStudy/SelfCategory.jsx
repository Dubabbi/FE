import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import * as S from "./SelfStudyStyle";
import * as D from "../WordCreateTchr/WordDetailStyle";
import Back from "/src/assets/icon/back.svg";
import school from "/src/assets/image/selfCategory/school.svg";
import food from "/src/assets/image/selfCategory/food.svg";
import animal from "/src/assets/image/selfCategory/animal.svg";
import weather from "/src/assets/image/selfCategory/weather.svg";
import { Loading } from "./Loading";

export default function SelfCategory() {
  const navigate = useNavigate();
  const level = useLocation().state;
  const onClickCategory = (selectCategory) => {
    setLoading(true);
    const token = localStorage.getItem("key");
    if (level === 1) {
      axios
        .post(
          "https://maeummal.com/prep2/",
          {
            category: CategoryList[selectCategory].eng,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          if (response.status === 200 && token) {
            const wordData = response.data.data;
            const wordList = [wordData.nouns, wordData.adverbs, wordData.verbs];
            navigate("/level1", { state: wordList });
          }
        })
        .catch((error) => {
          console.error("Error while create picture:", error);
        });
    }
    if (level === 2) {
      axios
        .post(
          `https://maeummal.com/prep1/generate?category=${CategoryList[selectCategory].category}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          if (response.status === 200) {
            navigate("/level2", { state: response.data });
          }
        })
        .catch((error) => {
          console.error("Error while create template1:", error);
        });
    }
  };
  const [CategoryList, setCategoryList] = useState([
    { category: "학교", src: school, eng: "SCHOOL" },
    { category: "음식", src: food, eng: "FOOD" },
    { category: "동물", src: animal, eng: "ANIMAL" },
    { category: "날씨", src: weather, eng: "WEATHER" },
  ]);
  const [loading, setLoading] = useState(false);

  return (
    <>
      <D.ImageWrap>
        <a href="/selfstudy">
          <img src={Back} alt="" />
        </a>
      </D.ImageWrap>
      {loading ? (
        <S.AppContainer>
          <Loading title="문제" subtitle="문제를" />
        </S.AppContainer>
      ) : (
        <S.AppContainer>
          <h1>자율학습</h1>
          <S.CategoryContainer>
            <S.SecondTitle>학습할 카테고리를 선택해 주세요.</S.SecondTitle>
            <S.rowContainer>
              <S.overContainer>
                {CategoryList.map((item, index) => (
                  <S.Category
                    key={index}
                    onClick={() => onClickCategory(index)}
                  >
                    <S.level style={{ width: "130px", height: "125px" }}>
                      <img src={item.src} alt="" />
                    </S.level>
                    <p>{item.category}</p>
                  </S.Category>
                ))}
              </S.overContainer>
            </S.rowContainer>
          </S.CategoryContainer>
        </S.AppContainer>
      )}
    </>
  );
}
