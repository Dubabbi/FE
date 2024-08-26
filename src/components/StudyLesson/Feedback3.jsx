// Feedback2.jsx
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import * as C from "../CreateLesson/CreateLessonStyle";
import * as L from "../LessonTchr/LessonStyle";
import * as D from "../WordCreateTchr/WordDetailStyle";
import * as O from "./Template1Std";
import * as T from "./Template3Std";
import * as E from "../CreateLesson/Template3Tchr";
import Back from "/src/assets/icon/back.svg";
import correct from "/src/assets/icon/correct.svg";
import wrong from "/src/assets/icon/incorrect.svg";

const Feedback3 = () => {
  const data = useLocation().state;
  console.log(data);
  const navigate = useNavigate();
  const handleStop = () => {
    navigate("/MainStd");
  };

  return (
    <>
      <D.ImageWrap>
        <a href="/MainStd">
          <img src={Back} alt="" />
        </a>
      </D.ImageWrap>
      <L.LessonWrapper style={{ marginBottom: "5%" }}>
        <L.Section style={{ padding: "50px 0 10px 0" }}>
          <h1>감정표현</h1>
          <C.FeedbackContainer style={{ margin: "30px 0 0 100px" }}>
            <C.HalfLine />
            <C.FeedbackText>최종평가</C.FeedbackText>
            <C.HalfLine />
          </C.FeedbackContainer>
        </L.Section>
        <C.FeedbackLine
          style={{
            marginBottom: "5%",
            justifyContent: "center",
            margin: "20px 20px 40px 100px",
          }}
        >
          <img
            style={{ height: "60px" }}
            src={data.correctnessList.includes(false) ? wrong : correct}
          />
          <C.SecondBox style={{ margin: "0 25px", height: "60px" }}>
            {data.solution}
          </C.SecondBox>
        </C.FeedbackLine>
        <C.FeedbackLine style={{ justifyContent: "center" }}>
          {data.studentFeedbackCards?.map((el, index) => (
            <O.Container key={index} style={{ margin: "0 20px" }}>
              <T.ImageBox style={{ marginBottom: "10px" }}>
                <img src={el.image} />
              </T.ImageBox>
              <T.WordBox>
                <T.InputBox
                  type="text"
                  style={{
                    border: data.correctnessList[index]
                      ? "2.5px solid #969696"
                      : "2.5px solid #ff0000",
                  }}
                  placeholder="작성하기"
                  value={el.adjective}
                  disabled
                />
                <T.Box>{el.noun}</T.Box>
              </T.WordBox>
            </O.Container>
          ))}
        </C.FeedbackLine>
        <C.StoryWrap
          style={{
            width: "70%",
            borderRadius: "15px",
            marginLeft: "15%",
            marginTop: "30px",
            alignItems: "center",
            justifyContent: "left",
            padding: "55px 25px 15px 25px",
            fontSize: "18px",
          }}
        >
          <E.ExampleBox style={{ top: "12px", left: "25px" }}>
            AI 피드백
          </E.ExampleBox>
          {data.aiFeedback}
        </C.StoryWrap>
        <C.InLineButton>
          <C.FeedbackButton onClick={handleStop}>그만 할래요</C.FeedbackButton>
          <C.FeedbackButton>다음 학습</C.FeedbackButton>
        </C.InLineButton>
        <h1
          style={{
            width: "100%",
            marginLeft: "60%",
            fontSize: "1vw",
            color: "#777",
          }}
        >
          ➡ 추천 학습: 낱말 카드 학습
        </h1>
      </L.LessonWrapper>
    </>
  );
};

export default Feedback3;
