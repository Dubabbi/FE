// Template5Std.jsx
import React, { useState } from "react";
import * as C from "../CreateLesson/CreateLessonStyle";
import * as S from "../SelfStudy/SelfStudyStyle";
import * as D from "../WordCreateTchr/WordDetailStyle";
import Back from "/src/assets/icon/back.svg";
import cat from "../../assets/image/word.svg";
import * as O from "./Template1Std";

const Template5Std = () => {
  const [category, setCatergory] = useState(["동물", "식물", "음식"]);
  const [word, setWord] = useState(["비빔밥", "고양이", "꽃"]);
  word.sort(() => Math.random() - 0.5);
  return (
    <>
      <D.ImageWrap>
        <a href="/mainstd">
          <img src={Back} alt="" />
        </a>
      </D.ImageWrap>
      <S.AppContainer>
        <h1>
          {category.map((el) =>
            el === category[category.length - 1] ? `${el} ` : `${el}, `
          )}
          분류하기
        </h1>
        <O.Row>
          <O.Container>
            <O.ImgContainer>
              <O.Circle />
              <img src={cat} />
            </O.ImgContainer>
            <O.ImgContainer>
              <O.Circle />
              <img src={cat} />
            </O.ImgContainer>
            <O.ImgContainer>
              <O.Circle />
              <img src={cat} />
            </O.ImgContainer>
          </O.Container>
          <O.Container>
            {word.map((el) => (
              <O.Text key={el}>
                <O.Circle style={{ left: "-30px" }} />
                {el}
              </O.Text>
            ))}
          </O.Container>
        </O.Row>
        <C.SubmitButton style={{ margin: "0", padding: "0" }}>
          제출
        </C.SubmitButton>
      </S.AppContainer>
    </>
  );
};

export default Template5Std;
