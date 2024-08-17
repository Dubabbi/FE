// Template5Tchr.jsx
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import _ from "lodash";
import { FaSearch } from "react-icons/fa";
import Form from "react-bootstrap/Form";
import * as W from "../WordTchr/WordStyle";
import * as C from "./CreateLessonStyle";
import add from "../../assets/icon/add.svg";
import Back from "/src/assets/icon/back.svg";
import * as D from "../WordCreateTchr/WordDetailStyle";
import * as O from "./Template1Tchr";
import * as T from "../StudyLesson/Template1Std";
import placeholderImage from "/src/assets/icon/phimg.svg";
import wordsave from "/src/assets/icon/wordsave.svg";

const Template5Tchr = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const [wordSets, setWordSets] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [dropdownWordSets, setDropdownWordSets] = useState([]);
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
      //console.log(response.data.data);
      if (response.data.isSuccess) {
        setWordSets(response.data.data);
        setDropdownWordSets(response.data.data);
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
            {},
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
            } else {
              throw new Error("Failed to fetch data");
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

  const debouncedSearch = _.debounce(async (search) => {
    if (search) {
      try {
        const response = await axios.get(
          `https://maeummal.com/word/title?title=${encodeURIComponent(search)}`
        );
        if (response.data.isSuccess) {
          setDropdownWordSets(response.data.data);
        } else {
          setDropdownWordSets([]);
        }
      } catch (error) {
        console.error("Error during search:", error);
        setDropdownWordSets([]);
      }
    } else {
      setDropdownWordSets(wordSets);
    }
  }, 300);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    debouncedSearch(value);
    setShowDropdown(true);
  };

  const handleWordClick = (wordSetId) => {
    navigate(`/WordTchr/${wordSetId}`);
    setShowDropdown(false);
  };

  const handleSave = (wordSetId, e) => {
    e.stopPropagation();
    console.log("Saved:", wordSetId);
  };

  return (
    <>
      <D.ImageWrap>
        <a href="/CreateLesson">
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
                <W.StyledForm onSubmit={(e) => e.preventDefault()}>
                  <W.StyledButton type="submit" variant="none">
                    <FaSearch size={15} />
                  </W.StyledButton>
                  <Form.Control
                    type="text"
                    placeholder="Search..."
                    value={searchValue}
                    onChange={handleSearchChange}
                    onFocus={() => setShowDropdown(true)}
                    onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
                  />
                </W.StyledForm>
              </W.Line>
              {showDropdown && (
                <W.Dropdown>
                  {dropdownWordSets.map((wordSet) => (
                    <div
                      key={wordSet.wordSetId}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "10px",
                        cursor: "pointer",
                      }}
                      onClick={() => handleWordClick(wordSet.wordSetId)}
                    >
                      <img
                        src={
                          wordSet.wordList && wordSet.wordList.length > 0
                            ? wordSet.wordList[0].image
                            : placeholderImage
                        }
                        style={{ width: "50px", marginRight: "10px" }}
                      />
                      <span>{wordSet.title}</span>
                      <img
                        src={wordsave}
                        alt="Save"
                        style={{ width: "20px" }}
                        onClick={(e) => handleSave(wordSet.wordSetId, e)}
                      />
                    </div>
                  ))}
                </W.Dropdown>
              )}
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
                      clickstate={el.clicked}
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
