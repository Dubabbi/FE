// Template1Std.jsx
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
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
    border: ${(props) => (props.clickstate ? "3px solid #4B518F" : "none")};
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
  border: ${(props) => (props.clickstate ? "3px solid #4B518F" : "none")};
`;

const Template1Std = () => {
  const template1Id = useLocation().state;
  const [category, setCatergory] = useState(["동물", "식물", "음식"]);
  const [line, setLine] = useState([]);
  const [addLine, setAddLine] = useState(["", ""]);
  const randomCategory = [...category].sort(() => Math.random() - 0.5);
  const [dataList, setdataList] = useState([
    {
      img: [word, word, word],
      clicked: [0, 0, 0],
      used: [0, 0, 0],
    },
    {
      category: [...randomCategory],
      clicked: [0, 0, 0],
      used: [0, 0, 0],
    },
  ]);

  useEffect(() => {
    axios
      .get(`https://maeummal.com/api/temp1/get?temp1Id=${template1Id}`)
      .then((response) => {
        if (response.data.isSuccess) {
          console.log(response.data);
          // const data = response.data.data.wordCardList;
          // setWordList(data);
          // let newWord = [];
          // data.map((el, index) => (newWord[index] = el.meaning));
          // setWord(newWord.sort(() => Math.random() - 0.5));
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const boxClick = (event, index) => {
    const newDataList = [...dataList];
    const newAddLine = [...addLine];
    const type = event.target.id === "card" ? 0 : 1;
    if (!dataList[type].used[index]) {
      newDataList[type].clicked = [0, 0, 0];
      newDataList[type].clicked[index] = 1;
      if (index === 0) newAddLine[type] = "18%";
      else if (index === 1) newAddLine[type] = "50%";
      else newAddLine[type] = "82%";
    }
    setdataList(newDataList);
    setAddLine(newAddLine);
  };
  useEffect(() => {
    if (addLine[0] != "" && addLine[1] != "") {
      setLine([...line, addLine]);
      addLine.map((el, index) => {
        const newDataList = [...dataList];
        newDataList[index].clicked = [0, 0, 0];
        if (el === "18%") newDataList[index].used[0] = 1;
        else if (el === "50%") newDataList[index].used[1] = 1;
        else newDataList[index].used[2] = 1;
        setdataList(newDataList);
      });
      setAddLine(["", ""]);
    }
  }, [addLine]);

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
          <Container style={{ width: "18%", minWidth: "144px" }}>
            {dataList[0].img.map((el, index) => (
              <ImgContainer key={index} clickstate={dataList[0].clicked[index]}>
                <Circle />
                <img id="card" src={el} onClick={(e) => boxClick(e, index)} />
              </ImgContainer>
            ))}
          </Container>
          <svg height="100%" width="62%">
            {line.map((el, index) => (
              <line
                key={index}
                x1="0"
                y1={el[0]}
                x2="100%"
                y2={el[1]}
                stroke="gray"
                strokeWidth="2"
              />
            ))}
          </svg>
          <Container style={{ width: "18%" }}>
            {dataList[1].category.map((el, index) => (
              <Text
                key={index}
                id="category"
                clickstate={dataList[1].clicked[index]}
                onClick={(e) => boxClick(e, index)}
              >
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
