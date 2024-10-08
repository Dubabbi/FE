// Feedback2.jsx
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import * as C from "../CreateLesson/CreateLessonStyle";
import * as L from "../LessonTchr/LessonStyle";
import * as D from "../WordCreateTchr/WordDetailStyle";
import * as T from "./Template3Std";
import * as E from "../CreateLesson/Template3Tchr";
import Back from "/src/assets/icon/back.svg";

const Feedback5 = () => {
  const [data, tempNum] = useLocation().state;
  const [hint, setHint] = useState([false, false, false]);
  const count = data.correctnessList.filter(
    (element) => true === element
  ).length;
  const navigate = useNavigate();
  const handleStop = () => {
    navigate("/MainStd");
  };

  const handleHint = (index) => {
    const newHint = [...hint];
    newHint[index] ? (newHint[index] = false) : (newHint[index] = true);
    setHint(newHint);
  };

  return (
    <>
      <D.ImageWrap>
        <a href="/lessonstd">
          <img src={Back} alt="" />
        </a>
      </D.ImageWrap>
      <L.LessonWrapper style={{ marginBottom: "5%" }}>
        <L.Section style={{ padding: "50px 0 10px 0" }}>
          <h1>{tempNum === 1 ? "카테고리 분류하기" : "어휘카드 매칭 게임"}</h1>
          <C.FeedbackContainer>
            <C.HalfLine />
            <C.FeedbackText>최종평가</C.FeedbackText>
            <C.HalfLine />
          </C.FeedbackContainer>
        </L.Section>
        <C.FeedbackLine
          style={{ justifyContent: "center", alignItems: "center" }}
        >
          <C.FirstBox
            style={{
              boxShadow: "none",
              backgroundColor: "#d9d9d94d",
              margin: "0 15px",
              height: "120px",
              width: "140px",
              fontSize: "25px",
              borderRadius: "1rem",
            }}
          >
            {count === 3 ? "정답" : `${count}/3`}
          </C.FirstBox>
          {data.correctFeedbackCards.map((el, index) => (
            <T.ImageBox
              key={index}
              style={{ width: "120px", height: "120px", margin: "0 15px" }}
              onClick={() => handleHint(index)}
            >
              <img
                src={el.image}
                style={{
                  border: data.correctnessList[index]
                    ? "3px solid #0000ff"
                    : "3px solid #ff0000",
                }}
              />
              {hint[index] ? <p>{el.description}</p> : ""}
            </T.ImageBox>
          ))}
        </C.FeedbackLine>
        <T.AiWrap>
          <E.ExampleBox style={{ top: "12px", left: "25px" }}>
            AI 피드백
          </E.ExampleBox>
          {data.aiFeedback}
        </T.AiWrap>
        <C.InLineButton>
          <C.FeedbackButton onClick={handleStop}>그만 할래요</C.FeedbackButton>
          <C.FeedbackButton>다음 학습</C.FeedbackButton>
        </C.InLineButton>
        <C.RecommendText>➡ 추천 학습: 낱말 카드 학습</C.RecommendText>
      </L.LessonWrapper>
    </>
  );
};

export default Feedback5;
