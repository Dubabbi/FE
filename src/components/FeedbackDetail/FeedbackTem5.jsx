import React, { useState, useEffect } from "react";
import * as C from "../CreateLesson/CreateLessonStyle";
import * as D from "../WordCreateTchr/WordDetailStyle";
import * as E from "../CreateLesson/Template3Tchr";
import * as L from "../LessonTchr/LessonStyle";
import * as O from "../CreateLesson/Template1Tchr";
import * as T from "../StudyLesson/Template1Std";
import * as W from "../WordTchr/WordStyle";
import Back from "/src/assets/icon/back.svg";
import correct from "/src/assets/icon/correct.svg";
import wrong from "/src/assets/icon/incorrect.svg";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Answer = ({ title, data, correctList = [true, true, true] }) => (
  <T.Container style={{ alignItems: "center" }}>
    <p>{title}</p>
    <O.Line style={{ justifyContent: "center", marginTop: "10px" }}>
      {data.map((el, index) => (
        <W.Section key={index} style={{ padding: "0" }}>
          <T.ImgContainer>
            <img style={{ height: "80px", margin: "8px" }} src={el.image} />
          </T.ImgContainer>
          <T.Text
            style={{
              width: "80px",
              height: "80px",
              fontSize: "1.5rem",
              margin: "8px",
              border: correctList[index]
                ? "2px solid #969696"
                : "2px solid #ff0000",
            }}
          >
            {el.meaning}
          </T.Text>
        </W.Section>
      ))}
    </O.Line>
  </T.Container>
);

const FeedbackTem5 = () => {
  const [feedbackData, setFeedbackData] = useState();
  const feedbackId = 17;
  useEffect(() => {
    axios
      .get(`https://maeummal.com/feedback/detail?id=${feedbackId}`)
      .then((response) => {
        if (response.data.isSuccess) {
          console.log(response.data.data);
          setFeedbackData(response.data.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  return (
    <>
      <D.ImageWrap>
        <a href="/MainTchr">
          <img src={Back} alt="Back to main" />
        </a>
      </D.ImageWrap>
      {feedbackData && (
        <L.LessonWrapper style={{ marginBottom: "5%" }}>
          <L.Section style={{ padding: "50px 0 10px 0" }}>
            <h1>강의 제목</h1>
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
              src={
                feedbackData.correctnessList.includes(false) ? wrong : correct
              }
            />
            <C.SecondBox style={{ margin: "0 25px", height: "60px" }}>
              {feedbackData.solution || "No description provided."}
            </C.SecondBox>
          </C.FeedbackLine>
          <C.StoryWrap
            style={{
              width: "70%",
              borderRadius: "15px",
              marginLeft: "15%",
              marginTop: "30px",
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "center",
              //padding: "55px 25px 15px 25px",
              fontSize: "18px",
              gap: "40px",
            }}
          >
            <Answer
              title="학생이 입력한 답"
              data={feedbackData.studentFeedbackCards}
              correctList={feedbackData.correctnessList}
            />
            <Answer title="정답" data={feedbackData.correctFeedbackCards} />
          </C.StoryWrap>
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
            {feedbackData.aiFeedback}
          </C.StoryWrap>
        </L.LessonWrapper>
      )}
    </>
  );
};

export default FeedbackTem5;
