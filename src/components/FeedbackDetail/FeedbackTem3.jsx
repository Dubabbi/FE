import React, { useState, useEffect } from "react";
import * as C from "../CreateLesson/CreateLessonStyle";
import * as D from "../WordCreateTchr/WordDetailStyle";
import * as L from "../LessonTchr/LessonStyle";
import * as E from "../CreateLesson/Template3Tchr";
import * as O from "../StudyLesson/Template1Std";
import * as T from "../StudyLesson/Template3Std";
import Back from "/src/assets/icon/back.svg";
import correct from "/src/assets/icon/correct.svg";
import wrong from "/src/assets/icon/incorrect.svg";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Answer = ({ title, data, correctList = [true, true, true, true] }) => (
  <O.Container style={{ alignItems: "center" }}>
    <p>{title}</p>
    <O.Container style={{ flexDirection: "row" }}>
      {data?.map((el, index) => (
        <O.Container key={index} style={{ margin: "0 10px" }}>
          <T.ImageBox
            style={{
              marginBottom: "10px",
              width: "150px",
              height: "150px",
            }}
          >
            <img src={el.image} />
          </T.ImageBox>
          <T.WordBox>
            <T.InputBox
              type="text"
              style={{
                border: correctList[index]
                  ? "2px solid #969696"
                  : "2px solid #ff0000",
              }}
              placeholder="작성하기"
              value={el.adjective}
              disabled
            />
            <T.Box>{el.noun}</T.Box>
          </T.WordBox>
        </O.Container>
      ))}
    </O.Container>
  </O.Container>
);

const FeedbackTem3 = () => {
  const [feedbackData, setFeedbackData] = useState();
  const feedbackId = 15;
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
            <h1>이런 상황에서는 이렇게 표현해요~</h1>
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
              {feedbackData.solution}
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

export default FeedbackTem3;
