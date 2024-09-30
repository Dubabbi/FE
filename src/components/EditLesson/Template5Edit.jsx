import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import Form from "react-bootstrap/Form";
import * as W from "../WordTchr/WordStyle";
import * as C from "../CreateLesson/CreateLessonStyle";
import add from "../../assets/icon/add.svg";
import Back from "/src/assets/icon/back.svg";
import * as D from "../WordCreateTchr/WordDetailStyle";
import * as O from "../CreateLesson/Template1Tchr";
import * as T from "../StudyLesson/Template1Std";
import { AiFillDelete } from "react-icons/ai";

export default function Template5Edit() {
  const template5Id = useLocation().state.templateId;
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const [myCardList, setMyCardList] = useState([]);
  const [selectCard, setSelectCard] = useState([]);
  const [successful, setSuccessful] = useState(false);
  const [data, setData] = useState();
  const selectRef = useRef(0);

  useEffect(() => {
    fetchWordSets();
    fetchTemplateData();
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

  const fetchTemplateData = async () => {
    try {
      const response = await axios.get(
        `https://maeummal.com/template5/get?temp5Id=${template5Id}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("key")}` },
        }
      );
      if (response.data.isSuccess) {
        const fetchedData = response.data.data;
        console.log(fetchedData);
        setData(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
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
      alert("템플릿이 성공적으로 수정되었습니다.");
      navigate("/lessonTchr");
    } else {
      if (selectRef.current != 0) {
        const token = localStorage.getItem("key");
        axios
          .patch(
            `https://thingproxy.freeboard.io/fetch/https://maeummal.com/template5/update?temp5Id=${template5Id}`,
            {
              title: data.title,
              level: parseInt(data.level),
              wordSetId: selectRef.current,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((response) => {
            if (response.status === 200) {
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

  const handleDeleteTemplate = async () => {
    const confirmDelete = window.confirm("정말 템플릿을 삭제하시겠습니까?");
    if (confirmDelete) {
      try {
        const response = await axios.delete(
          `https://maeummal.com/template5/delete?temp5Id=${template5Id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("key")}`,
            },
          }
        );
        // 상태 코드에 따라 다른 메시지를 출력
        if (response.status === 200) {
          alert("템플릿이 성공적으로 삭제되었습니다.");
          navigate("/lessontchr");
        }
      } catch (error) {
        if (error.response) {
          if (error.response.status === 404) {
            alert("템플릿을 찾을 수 없습니다.");
          } else if (error.response.status === 403) {
            alert("자신의 템플릿만 삭제할 수 있습니다.");
          } else {
            alert(`삭제 실패: ${error.response.data.message}`);
          }
        } else {
          alert(`템플릿 삭제 중 오류가 발생했습니다: ${error.message}`);
        }
      }
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
              <W.Line
                style={{
                  alignItems: "center",
                  width: "100%",
                  justifyContent: "center",
                }}
              >
                <C.HintWrapper style={{ margin: "40px" }}>
                  <C.HintGroup>
                    <C.Label>제목</C.Label>
                    <C.HintBox style={{ minWidth: "200px" }}>
                      <Form.Control
                        type="text"
                        placeholder="타이틀을 입력하세요"
                        value={data?.title}
                        onChange={(e) =>
                          setData({ ...data, title: e.target.value })
                        }
                      />
                    </C.HintBox>
                  </C.HintGroup>
                  <C.HintGroup>
                    <C.Label>난이도</C.Label>
                    <C.HintBox style={{ minWidth: "200px" }}>
                      <Form.Control
                        type="number"
                        placeholder="레벨을 입력하세요"
                        value={data?.level}
                        min={1}
                        max={5}
                        onChange={(e) =>
                          setData({ ...data, level: e.target.value })
                        }
                      />
                    </C.HintBox>
                  </C.HintGroup>
                </C.HintWrapper>
                <C.SubmitButton
                  style={{ minWidth: "100px", margin: "0" }}
                  onClick={handleDeleteTemplate}
                >
                  <AiFillDelete style={{ marginRight: "8px" }} />
                  템플릿 삭제
                </C.SubmitButton>
              </W.Line>
              <W.SecondTitle style={{ marginTop: "10px" }}>
                나의 낱말 카드 세트
              </W.SecondTitle>
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
}
