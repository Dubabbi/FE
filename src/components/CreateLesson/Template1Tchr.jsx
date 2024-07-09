// Template1Tchr.jsx
import React, { useState } from "react";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";
import Form from "react-bootstrap/Form";
import * as W from "../WordTchr/WordStyle";
import word from "../../assets/image/word.svg";
import add from "../../assets/icon/add.svg";
import Back from "/src/assets/icon/back.svg";
import close from "/src/assets/icon/close.svg";
import * as D from "../WordCreateTchr/WordDetailStyle";

export const SelectCard = styled.div`
  border-radius: 5px;
  border: 1px solid #acaacc;
  height: 30px;
  width: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2vw;
  margin: 0 10px;
  @media (max-width: 768px) {
    font-size: 2.5vw;
  }
  img {
    margin-left: 5px;
    height: 10px;
  }
`;

export const Word = styled.div`
  flex: 0 0 auto;
  text-align: center;
  padding: 5px;
  margin: 0 10px;
  min-width: 130px;

  img {
    width: 130px;
    height: 130px;
    display: block;
    margin: 0 auto;
    border: ${(props) =>
      props.clickstate ? "5px solid #0029FF" : "5px solid #feeafa"};
    border-radius: 10px;
  }
`;

export const Line = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 40px;
  align-items: center;
`;

const Template1Tchr = () => {
  const [searchValue, setSearchValue] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Search:", searchValue);
    setSearchValue("");
  };
  const [myCardList, setMyCardList] = useState([
    { title: "음식", click: 0 },
    { title: "동물", click: 0 },
    { title: "식물", click: 0 },
    { title: "학교", click: 0 },
  ]);
  const [selectCard, setSelectCard] = useState([]);
  const cardClick = (index) => {
    if (myCardList[index].click) {
      const newMyCardList = [...myCardList];
      newMyCardList[index].click = 0;
      setMyCardList(newMyCardList);
      const filtered = selectCard.filter((el) => el !== index);
      setSelectCard(filtered);
    } else {
      const newMyCardList = [...myCardList];
      newMyCardList[index].click = 1;
      setMyCardList(newMyCardList);
      let addCard = [...selectCard];
      addCard.push(index);
      setSelectCard(addCard);
    }
  };

  return (
    <>
      <D.ImageWrap>
        <a href="/MainTchr">
          <img src={Back} alt="" />
        </a>
      </D.ImageWrap>
      <W.LessonWrapper style={{ padding: "30px 30px 0px 30px" }}>
        <W.Section>
          <h1 style={{ marginBottom: "50px" }}>카테고리 분류하기</h1>
          <W.Line>
            <W.Title>낱말 카드 세트 검색</W.Title>
            <W.StyledForm onSubmit={handleSubmit}>
              <W.StyledButton type="submit" variant="none">
                <FaSearch size={15} />
              </W.StyledButton>
              <Form.Control
                type="text"
                placeholder="Search..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </W.StyledForm>
          </W.Line>
          <W.SecondTitle>나의 낱말 카드 세트</W.SecondTitle>
          <W.WordList>
            <W.ChoiceBox>
              <W.AddWord>
                <div>
                  <a href="/WordCreateTchr">
                    <img src={add} alt="단어" />
                  </a>
                </div>
              </W.AddWord>
              {myCardList.map((el, index) => (
                <Word
                  key={index}
                  onClick={() => cardClick(index)}
                  clickstate={el.click}
                >
                  <img src={word} alt={el} />
                  <W.SecondTitle style={{ justifyContent: "center" }}>
                    {el.title}
                  </W.SecondTitle>
                </Word>
              ))}
            </W.ChoiceBox>
          </W.WordList>
          <Line>
            <W.Title style={{ margin: "0 20px 0 0" }}>선택한 카드 세트</W.Title>
            {selectCard.length
              ? selectCard.map((el) => (
                  <SelectCard key={el}>
                    {myCardList[parseInt(el)].title}
                    <img src={close} alt={el} onClick={() => cardClick(el)} />
                  </SelectCard>
                ))
              : null}
          </Line>
        </W.Section>
      </W.LessonWrapper>
    </>
  );
};

export default Template1Tchr;
