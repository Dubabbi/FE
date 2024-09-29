import React, { useState, useEffect } from "react";
import * as C from "../CreateLesson/CreateLessonStyle";
import * as D from "../WordCreateTchr/WordDetailStyle";
import * as L from "../LessonTchr/LessonStyle";
import * as E from "../CreateLesson/Template3Tchr";
import Back from "/src/assets/icon/back.svg";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import correct from "/src/assets/icon/correct.svg";
import wrong from "/src/assets/icon/incorrect.svg";
import { Answer } from "./FeedbackTem5";

const FeedbackTem1 = () => {
  const [feedbackData, setFeedbackData] = useState();
  const feedbackId = 111;
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

export default FeedbackTem1;
