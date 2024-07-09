// Template5Tchr.jsx
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import Form from "react-bootstrap/Form";
import * as W from "../WordTchr/WordStyle";
import word from "../../assets/image/word.svg";
import add from "../../assets/icon/add.svg";
import Back from "/src/assets/icon/back.svg";
import close from "/src/assets/icon/close.svg";
import * as D from "../WordCreateTchr/WordDetailStyle";
import * as O from "./Template1Tchr";

const Template5Tchr = () => {
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
          <h1 style={{ marginBottom: "50px" }}>어휘카드 매칭 게임</h1>
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
                <O.Word
                  key={index}
                  onClick={() => cardClick(index)}
                  clickstate={el.click}
                >
                  <img src={word} alt={el} />
                  <W.SecondTitle style={{ justifyContent: "center" }}>
                    {el.title}
                  </W.SecondTitle>
                </O.Word>
              ))}
            </W.ChoiceBox>
          </W.WordList>
          <O.Line>
            <W.Title style={{ margin: "0 20px 0 0" }}>선택한 카드 세트</W.Title>
            {selectCard.length
              ? selectCard.map((el) => (
                  <O.SelectCard key={el}>
                    {myCardList[parseInt(el)].title}
                    <img src={close} alt={el} onClick={() => cardClick(el)} />
                  </O.SelectCard>
                ))
              : null}
          </O.Line>
        </W.Section>
      </W.LessonWrapper>
    </>
  );
};

export default Template5Tchr;
