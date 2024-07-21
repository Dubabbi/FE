// Template1Std.jsx
import React, { useState } from "react";
import styled from "styled-components";
import * as C from "../CreateLesson/CreateLessonStyle";
import * as S from "../SelfStudy/SelfStudyStyle";
import * as D from "../WordCreateTchr/WordDetailStyle";
import Back from "/src/assets/icon/back.svg";
import word from "../../assets/image/word.svg";

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 800px;
  height: 70%;
  margin-top: 15px;
  @media (max-width: 950px) {
    width: 85%;
    min-width: 400px;
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-evenly;
`;

export const Circle = styled.div`
  position: absolute;
  width: 1.4rem;
  height: 1.4rem;
  background-color: #999999;
  border-radius: 50%;
  right: -15px;
`;

export const ImgContainer = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  img {
    height: 110px;
    border-radius: 6px;
    margin: 15px;
  }
`;

export const Text = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  width: 110px;
  height: 110px;
  border-radius: 6px;
  margin: 15px;
  font-size: 2rem;
  background-color: #d9d9d9b3;
`;

const Template1Std = () => {
  const [category, setCatergory] = useState(["동물", "식물", "음식"]);
  const randomCategory = [...category];
  randomCategory.sort(() => Math.random() - 0.5);
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
            el === category[category.length - 1] ? `${el}` : `${el}, `
          )}
          의 차이를 알아봅시다!
        </h1>
        <Row>
          <Container>
            <ImgContainer>
              <Circle />
              <img src={word} />
            </ImgContainer>
            <ImgContainer>
              <Circle />
              <img src={word} />
            </ImgContainer>
            <ImgContainer>
              <Circle />
              <img src={word} />
            </ImgContainer>
          </Container>
          <Container>
            {randomCategory.map((el) => (
              <Text key={el}>
                <Circle style={{ left: "-30px" }} />
                {el}
              </Text>
            ))}
          </Container>
        </Row>
        <C.SubmitButton style={{ margin: "0", padding: "0" }}>
          제출
        </C.SubmitButton>
      </S.AppContainer>
    </>
  );
};

export default Template1Std;
