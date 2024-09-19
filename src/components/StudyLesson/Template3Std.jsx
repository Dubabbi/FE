// Template3Std.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import * as C from "../CreateLesson/CreateLessonStyle";
import * as S from "../SelfStudy/SelfStudyStyle";
import * as D from "../WordCreateTchr/WordDetailStyle";
import * as T from "../CreateLesson/Template3Tchr";
import Back from "/src/assets/icon/back.svg";
import Pink from "/src/assets/icon/heartpink.svg";
import White from "/src/assets/icon/heartwhite.svg";
import * as O from "./Template1Std";
import Reward from "../Reward/Reward";
import { ModalOverlay } from "./Feedback2";

export const Box = styled.div`
  width: 75px;
  height: 35px;
  text-align: center;
  line-height: 35px;
  background-color: #969696;
  border-radius: 8px;
  font-size: 1.8rem;
  color: #ffffff;
`;

export const InputBox = styled.input`
  width: 75px;
  height: 35px;
  text-align: center;
  line-height: 35px;
  background-color: #ffffff;
  border-radius: 8px;
  font-size: 1.5rem;
  color: #000000;
  border: 2.5px solid #969696;
`;

export const WordBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Example = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2.5px solid #fed7d7;
  border-radius: 10px;
  min-width: 100px;
  font-size: 1.5rem;
  height: 35px;
  margin: 0px 10px;
`;

export const ImageBox = styled.div`
  position: relative;
  width: 170px;
  height: 170px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 1rem;
  img {
    height: 100%;
    border-radius: 12px;
  }
  p {
    position: absolute;
    font-size: 16px;
    background-color: #ffffffbf;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 6px;
  }
`;

const Template3Std = () => {
  const template3Id = useLocation().state;
  const navigate = useNavigate();
  const [feedbackData, setFeedbackData] = useState(null);
  const [showReward, setShowReward] = useState(false);
  const [lives, setLives] = useState(2);
  const [correct, setCorrect] = useState([]);
  const [firstTime, setFirstTime] = useState(true);
  const [inputValue, setInputValue] = useState([]);
  const [data, setData] = useState({});
  //const template3Id = 1;

  useEffect(() => {
    axios
      .get(`https://maeummal.com/template3/get?template3Id=${template3Id}`)
      .then((response) => {
        if (response.data.isSuccess) {
          setData(response.data.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleInputChange = (e, index) => {
    const newInputValue = [...inputValue];
    newInputValue[index] = e.target.value;
    setInputValue(newInputValue);
  };

  const handleSubmit = () => {
    if (inputValue.length === data.imageNum && firstTime) {
      const newCorrect = [...correct];
      inputValue.map((el, index) =>
        el === data.imageCardList[index].adjective
          ? (newCorrect[index] = true)
          : (newCorrect[index] = false)
      );
      setCorrect(newCorrect);
      setFirstTime(false);
      setLives(lives - 1);
    } else if (!firstTime) {
      const count = correct.filter((element) => true === element).length;
      if (count != data.imageNum) {
        setLives(lives - 1);
      }
      feedback();
    } else {
      alert("빈칸을 모두 작성해주세요!");
    }
  };

  useEffect(() => {
    const count = correct.filter((element) => true === element).length;
    if (count === data.imageNum) {
      setLives(2);
      feedback();
    }
  }, [correct]);

  const feedback = () => {
    const payload = {
      templateId: template3Id,
      answerList: inputValue,
      studentId: 25,
      templateType: "TEMPLATE3",
    };
    axios
      .post(`https://maeummal.com/feedback/create`, payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("key")}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setShowReward(true);
          setFeedbackData(response.data);
        }
      })
      .catch((error) => {
        console.error("Error while create feedback:", error);
      });
  };

  const handleCloseReward = () => {
    setShowReward(false);
    navigate("/feedback3", { state: feedbackData });
  };

  return (
    <>
      <D.ImageWrap>
        <a href="/mainstd">
          <img src={Back} alt="" />
        </a>
      </D.ImageWrap>
      <D.HeartWrap>
        {Array.from({ length: 2 }).map((_, index) => (
          <img key={index} src={index < 2 - lives ? White : Pink} alt="Heart" />
        ))}
      </D.HeartWrap>
      <S.AppContainer>
        <h1>감정표현</h1>
        <h2 style={{ fontSize: "1.8rem", margin: "40px 0 30px 0" }}>
          빈칸에 들어갈 관형구를 보기에서 골라 봅시다!
        </h2>
        <C.StoryWrap
          style={{
            width: "70%",
            borderRadius: "15px",
            margin: "0 0 10px 0",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
        >
          <T.ExampleBox>보기</T.ExampleBox>
          <T.CardContainer
            style={{ padding: "0px", justifyContent: "space-evenly" }}
          >
            {data.options?.map((el, index) => (
              <Example key={index}>{el}</Example>
            ))}
          </T.CardContainer>
        </C.StoryWrap>
        <O.Row
          style={{
            margin: "0",
            justifyContent: "space-around",
            overflowX: "auto",
          }}
        >
          {data.imageCardList?.map((el, index) => (
            <O.Container key={index} style={{ margin: "0 10px" }}>
              <ImageBox>
                <img src={el.image} />
                {firstTime ? "" : correct[index] ? "" : <p>{el.hint}</p>}
              </ImageBox>
              <WordBox>
                <InputBox
                  type="text"
                  style={{
                    border: firstTime
                      ? "2.5px solid #969696"
                      : correct[index]
                      ? "2.5px solid #0000ff"
                      : "2.5px solid #ff0000",
                  }}
                  placeholder="작성하기"
                  value={inputValue[index] || ""}
                  onChange={(e) => handleInputChange(e, index)}
                />
                <Box>{el.noun}</Box>
              </WordBox>
            </O.Container>
          ))}
        </O.Row>
        <C.SubmitButton
          style={{ margin: "0px 0 40px 0", padding: "0" }}
          onClick={handleSubmit}
        >
          제출
        </C.SubmitButton>
      </S.AppContainer>
      {showReward && (
        <ModalOverlay>
          <Reward onClose={handleCloseReward} />
        </ModalOverlay>
      )}
    </>
  );
};

export default Template3Std;
