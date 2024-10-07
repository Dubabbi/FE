import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import * as C from "../CreateLesson/CreateLessonStyle";
import * as L from "../LessonTchr/LessonStyle";
import * as D from "../WordCreateTchr/WordDetailStyle";
import Back from "/src/assets/icon/back.svg";
import styled from "styled-components";
import Correct from "/src/assets/icon/correct.svg";
import Incorrect from "/src/assets/icon/incorrect.svg";

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const Feedback2 = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const feedbackData = location.state?.feedbackData || {};
  const tempTitle = location.state?.title || "강의 제목";

  // 모든 정답 체크를 진행하여 isCorrect 계산
  const isCorrect = feedbackData.correctnessList?.every((val) => val === true);

  const handleStop = () => {
    navigate("/MainStd");
  };

  return (
    <>
      <D.ImageWrap>
        <a href="/MainStd">
          <img src={Back} alt="Back" />
        </a>
      </D.ImageWrap>
      <L.LessonWrapper style={{ marginBottom: "5%" }}>
        <L.Section>
          <h1>{tempTitle}</h1>
          <C.FeedbackContainer>
            <C.HalfLine />
            <C.FeedbackText>최종평가</C.FeedbackText>
            <C.HalfLine />
          </C.FeedbackContainer>
        </L.Section>
        {/* 정답 또는 오답 표시 조건 수정 */}
        {isCorrect !== undefined && (
          <C.FeedbackLine style={{ marginBottom: "5%" }}>
            <C.FirstBox>
              <img
                src={isCorrect ? Correct : Incorrect}
                alt={isCorrect ? "Correct" : "Incorrect"}
              />
            </C.FirstBox>
            <C.SecondBox>
              {feedbackData.solution || "No solution provided"}
            </C.SecondBox>
          </C.FeedbackLine>
        )}
        {/* 정답 카드 이미지와 설명 */}
        <L.Section>
          <C.FeedTitle style={{ fontSize: "1.7rem" }}>정답 이미지</C.FeedTitle>
          <C.FeedbackLine>
            {feedbackData.correctFeedbackCards &&
              feedbackData.correctFeedbackCards.map((card, index) => (
                <C.FeedImage key={index}>
                  <img
                    src={card.image}
                    alt={`Correct Card ${index + 1}`}
                    style={{ maxWidth: "100%" }}
                  />
                </C.FeedImage>
              ))}
          </C.FeedbackLine>
        </L.Section>

        {/*
        <L.Section>
          <C.FeedTitle style={{ fontSize: '1.7rem' }}>학생이 선택한 이미지</C.FeedTitle>
          <C.FeedbackLine>
            {feedbackData.studentFeedbackCards && feedbackData.studentFeedbackCards.map((card, index) => (
              <C.FeedImage key={index}>
                <img src={card.image} alt={`Student Card ${index + 1}`} style={{ maxWidth: '100%' }} />
              </C.FeedImage>
            ))}
          </C.FeedbackLine>
        </L.Section>*/}
        {/* AI 피드백 */}
        <C.HintWrapper2 style={{ width: "70%", padding: "1rem 0" }}>
          <C.HintGroup2
            style={{ flexDirection: "column", justifyContent: "flex-start" }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                width: "100%",
                marginTop: "2%",
              }}
            >
              <C.Label style={{ marginLeft: "-3%" }}>AI 피드백</C.Label>
              <div style={{ width: "70%" }}></div>
            </div>
            <C.HintBox2
              style={{
                width: "90%",
                border: "none",
                fontSize: "1.2rem",
                textAlign: "left",
              }}
            >
              {feedbackData.aiFeedback || "AI 피드백 없음"}
            </C.HintBox2>
          </C.HintGroup2>
        </C.HintWrapper2>
        {/* 버튼 */}
        <C.InLineButton>
          <C.FeedbackButton onClick={handleStop}>그만 할래요</C.FeedbackButton>
          <C.FeedbackButton>다음 학습</C.FeedbackButton>
        </C.InLineButton>
        <C.RecommendText>➡ 추천 학습: 낱말 카드 학습</C.RecommendText>
      </L.LessonWrapper>
    </>
  );
};

export default Feedback2;
