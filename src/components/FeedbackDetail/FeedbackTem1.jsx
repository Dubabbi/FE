import React, { useState, useEffect } from "react";
import * as C from "../CreateLesson/CreateLessonStyle";
import * as D from "../WordCreateTchr/WordDetailStyle";
import * as L from "../LessonTchr/LessonStyle";
import * as E from "../CreateLesson/Template3Tchr";
import Back from "/src/assets/icon/back.svg";
import Form from "react-bootstrap/Form";
import axios from "axios";
import correct from "/src/assets/icon/correct.svg";
import wrong from "/src/assets/icon/incorrect.svg";
import { useNavigate, useLocation } from "react-router-dom";
import { Answer } from "./FeedbackTem5"; // FeedbackTem5에서 사용한 Answer 컴포넌트

const FeedbackTem1 = () => {
  const [feedbackData, setFeedbackData] = useState();
  const [userInfo, setUserInfo] = useState({});
  const [error, setError] = useState('');
  const location = useLocation(); // location을 사용하여 feedbackId를 받음
  const feedbackId = location.state?.feedbackId; // 동적으로 feedbackId 받기

  useEffect(() => {
    if (feedbackId) {
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
    }
  }, [feedbackId]); // feedbackId가 변경될 때마다 호출

  useEffect(() => {
    const fetchUserInfo = async () => {
      const accessToken = localStorage.getItem("key");
      if (!accessToken) {
        setError('Authentication required');
        return;
      }
      try {
        const response = await axios.get('https://maeummal.com/user', {
          headers: { Authorization: `Bearer ${accessToken}` }
        });
        if (response.data.isSuccess) {
          setUserInfo(response.data.data);
        } else {
          throw new Error(response.data.message || 'Failed to fetch user info');
        }
      } catch (error) {
        console.error('Error fetching user info:', error);
        setError('Failed to fetch user info: ' + error.message);
      }
    };
    fetchUserInfo();
  }, []);

  const BackLink = userInfo.iq != null ? '/mypagestd' : '/mypagetchr';

  return (
    <>
      <D.ImageWrap>
        <a href={BackLink}>
          <img src={Back} alt="Back to main" />
        </a>
      </D.ImageWrap>
      {feedbackData && (
        <L.LessonWrapper style={{ marginBottom: "5%" }}>
          <L.Section>
            <h1>{feedbackData.templateTitle || "강의 제목"}</h1>
          </L.Section>
          <C.FeedbackLine style={{ marginBottom: "5%" }}>
            <C.FirstBox>
              <img
                src={
                  feedbackData.correctnessList.includes(false) ? wrong : correct
                }
                alt={feedbackData.correctnessList.includes(false) ? 'Incorrect' : 'Correct'}
              />
            </C.FirstBox>
            <C.SecondBox>
              {feedbackData.solution || "No description provided."}
            </C.SecondBox>
          </C.FeedbackLine>
          <C.Result>
            <Answer
              title="학생이 입력한 답"
              data={feedbackData.studentFeedbackCards}
              correctList={feedbackData.correctnessList}
            />
            <Answer title="정답" data={feedbackData.correctFeedbackCards} />
          </C.Result>
          <C.AIWrapper>
            <C.HintGroup2 style={{ flexDirection: 'column', justifyContent: 'flex-start' }}>
              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', width: '100%', marginTop: '2%' }}>
                <C.Label style={{ marginLeft: '-3%' }}>AI 피드백</C.Label>
                <div style={{ width: '70%' }}></div>
              </div>
              <C.HintBox2 style={{ width: '90%', border: 'none', fontSize: '1.2rem', textAlign: 'left' }}>
                {feedbackData.aiFeedback}
              </C.HintBox2>
            </C.HintGroup2>
          </C.AIWrapper>
        </L.LessonWrapper>
      )}
    </>
  );
};

export default FeedbackTem1;
