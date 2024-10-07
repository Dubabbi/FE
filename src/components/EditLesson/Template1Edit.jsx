import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Form from "react-bootstrap/Form";
import * as W from "../WordTchr/WordStyle";
import Back from "/src/assets/icon/back.svg";
import * as D from "../WordCreateTchr/WordDetailStyle";
import * as C from "../CreateLesson/CreateLessonStyle";
import * as T from "../StudyLesson/Template1Std";
import * as O from "../CreateLesson/Template1Tchr";
import { AiFillDelete } from "react-icons/ai";

export default function Template1Edit() {
  const template1Id = useLocation().state.templateId;
  const navigate = useNavigate();
  const [data, setData] = useState();
  const [myCardList, setMyCardList] = useState([]);

  useEffect(() => {
    fetchTemplateData();
  }, []);

  const fetchTemplateData = async () => {
    try {
      const response = await axios.get(
        `https://maeummal.com/api/temp1/get?temp1Id=${template1Id}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("key")}` },
        }
      );
      if (response.status === 200) {
        const fetchedData = response.data;
        console.log(fetchedData);
        setData(fetchedData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const [selectCard, setSelectCard] = useState([]);

  const handleCreate = () => {
    if (data) {
      const token = localStorage.getItem("key");
      axios
        .put(
          `https://maeummal.com/api/temp1/${template1Id}?templateId=${template1Id}&newTitle=${data.title}&newLevel=${data.level}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          if (response.status === 200) {
            alert("템플릿이 성공적으로 수정되었습니다.");
            navigate("/lessontchr");
          }
        })
        .catch((error) => {
          console.error("Error while create template3:", error);
          alert("템플릿 수정에 실패했습니다.");
        });
    } else {
      alert("낱말카드 세트 1개를 선택해주세요.");
    }
  };

  const handleDeleteTemplate = async () => {
    const confirmDelete = window.confirm("정말 템플릿을 삭제하시겠습니까?");
    if (confirmDelete) {
      try {
        const response = await axios.delete(
          `https://maeummal.com/api/temp1/${template1Id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("key")}`,
            },
          }
        );
        // 상태 코드에 따라 다른 메시지를 출력
        if (response.status === 204) {
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
          <h1 style={{ marginBottom: "50px" }}>카테고리 분류하기</h1>
          <O.Line style={{ justifyContent: "center" }}>
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
          </O.Line>
          <O.Line style={{ justifyContent: "center", margin: "0" }}>
            {data?.words.map((el, index) => (
              <W.Section key={index} style={{ padding: "0" }}>
                <T.Text>{el.meaning}</T.Text>
                <T.ImgContainer>
                  <img src={el.image} />
                </T.ImgContainer>
              </W.Section>
            ))}
          </O.Line>
          <C.ButtonContainer>
          <C.DeleteButton onClick={handleDeleteTemplate}>
            삭제
            <AiFillDelete style={{ marginLeft: '5px' }} />
          </C.DeleteButton>
          <C.EditButton onClick={handleCreate}>수정</C.EditButton>
          </C.ButtonContainer>
        </W.Section>
      </W.LessonWrapper>
    </>
  );
}
