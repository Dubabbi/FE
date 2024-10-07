// Template5Tchr.jsx
import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import Form from "react-bootstrap/Form";
import * as W from "../WordTchr/WordStyle";
import * as C from "./CreateLessonStyle";
import add from "../../assets/icon/add.svg";
import Back from "/src/assets/icon/back.svg";
import * as D from "../WordCreateTchr/WordDetailStyle";
import * as O from "./Template1Tchr";
import * as T from "../StudyLesson/Template1Std";

const Template5Tchr = () => {
  const data = useLocation().state;
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const [myCardList, setMyCardList] = useState([]);
  const [selectCard, setSelectCard] = useState([]);
  const [successful, setSuccessful] = useState(false);
  const selectRef = useRef(0);

  useEffect(() => {
    fetchWordSets();
  }, []);

  const fetchWordSets = async () => {
    try {
      const response = await axios.get("https://maeummal.com/template5/create");
      if (response.data.isSuccess) {
        let newMordList = response.data.data;
        newMordList.map((el) => (el.clicked = 0));
        setMyCardList(newMordList);
      }
    } catch (error) {
      console.error("Error fetching word sets:", error);
    }
  };

  const cardSetClick = (index, id) => {
    if (myCardList[index].clicked) {
      const newCardList = [...myCardList];
      newCardList[index].clicked = 0;
      setMyCardList(newCardList);
      selectRef.current = 0;
    } else {
      const newCardList = [...myCardList];
      newCardList.map((el) => (el.clicked = 0));
      newCardList[index].clicked = 1;
      setMyCardList(newCardList);
      selectRef.current = id;
    }
  };

  const handleCreate = () => {
    if (successful) {
      navigate("/lessonTchr");
    } else {
      if (selectRef.current != 0) {
        const token = localStorage.getItem("key");
        axios
          .post(
            `https://maeummal.com/template5/create?wordSetId=${selectRef.current}`,
            {
              title: data.title,
              level: data.difficulty,
              wordSetId: selectRef.current,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((response) => {
            if (response.status === 200 && token) {
              setSelectCard(response.data.data.wordCardList);
              setSuccessful(true);
            }
          })
          .catch((error) => {
            console.error("Error while create template5:", error);
          });
      } else {
        alert("낱말카드 세트 1개를 선택해주세요.");
      }
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Search:", searchValue);
    setSearchValue("");
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
          {successful ? (
            <O.Line style={{ justifyContent: "center" }}>
              {selectCard.map((el) => (
                <W.Section key={el.wordId}>
                  <T.Text>{el.meaning}</T.Text>
                  <T.ImgContainer>
                    <img src={el.image} />
                  </T.ImgContainer>
                </W.Section>
              ))}
              ;
            </O.Line>
          ) : (
            <>
              <W.Line>
                <W.Title>낱말 카드 세트 검색</W.Title>
                <W.StyledForm onSubmit={handleSearch}>
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
              <W.WordList style={{ marginBottom: "50px" }}>
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
                      key={el.wordSetId}
                      onClick={() => cardSetClick(index, el.wordSetId)}
                      data-clickstate={el.clicked}
                    >
                      <img src={el.wordList[0].image} alt={el} />
                      <W.SecondTitle style={{ justifyContent: "center" }}>
                        {el.title}
                      </W.SecondTitle>
                    </O.Word>
                  ))}
                </W.ChoiceBox>
              </W.WordList>
            </>
          )}
          <C.SubmitButton style={{ margin: "0 auto" }} onClick={handleCreate}>
            {successful ? "제출" : "문제 생성"}
          </C.SubmitButton>
        </W.Section>
      </W.LessonWrapper>
    </>
  );
};

export default Template5Tchr;
