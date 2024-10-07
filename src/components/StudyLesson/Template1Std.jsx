// Template1Std.jsx
import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import * as C from "../CreateLesson/CreateLessonStyle";
import * as S from "../SelfStudy/SelfStudyStyle";
import * as D from "../WordCreateTchr/WordDetailStyle";
import * as F from "./Template5Std";
import Back from "/src/assets/icon/back.svg";
import word from "../../assets/image/word.svg";
import Pink from "/src/assets/icon/heartpink.svg";
import White from "/src/assets/icon/heartwhite.svg";
import reset from "../../assets/icon/reset.svg";
import hint from "../../assets/icon/hint.svg";
import { ModalOverlay } from "./Feedback2";
import Reward from "../Reward/Reward";

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 800px;
  height: 70%;
  margin-top: 15px;
  @media (max-width: 950px) {
    width: 85%;
    min-width: 400px;
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-evenly;
`;

export const Circle = styled.div`
  position: absolute;
  width: 1.4rem;
  height: 1.4rem;
  background-color: #999999;
  border-radius: 50%;
  right: -15px;
`;

export const ImgContainer = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  img {
    height: 110px;
    border-radius: 6px;
    margin: 15px;
    border: ${(props) =>
      props["data-clickstate"] ? "3px solid #4B518F" : "none"};
  }
`;

export const Text = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  width: 110px;
  height: 110px;
  border-radius: 6px;
  margin: 15px;
  font-size: 2rem;
  background-color: #d9d9d9b3;
  border: ${(props) =>
    props["data-clickstate"] ? "3px solid #4B518F" : "none"};
`;

const Template1Std = () => {
  const accessToken = localStorage.getItem("key");
  const [template1Id, setTemplate1Id] = useState(
    useLocation().state?.templateId
  );
  const [userId, setUserId] = useState();
  //const [category, setCatergory] = useState(["동물", "식물", "음식"]);
  //const randomCategory = [...category].sort(() => Math.random() - 0.5);
  const navigate = useNavigate();
  const [feedbackData, setFeedbackData] = useState(null);
  const [showReward, setShowReward] = useState(false);
  const answerRef = useRef(false);
  const [lives, setLives] = useState(2);
  const [correct, setCorrect] = useState([]);
  const [hintShow, setHintShow] = useState([]);
  const [firstTime, setFirstTime] = useState(true);
  const [word, setWord] = useState([]);
  const [wordList, setWordList] = useState([]);
  const [finalAnswer, setfinalAnswer] = useState([]);
  const [line, setLine] = useState([]);
  const [addLine, setAddLine] = useState(["", ""]);
  const [clicked, setClicked] = useState([
    {
      clicked: [0, 0, 0],
      used: [0, 0, 0],
    },
    {
      clicked: [0, 0, 0],
      used: [0, 0, 0],
    },
  ]);

  useEffect(() => {
    axios
      .get(`https://maeummal.com/api/temp1/get?temp1Id=${template1Id}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((response) => {
        if (response.status === 200) {
          const data = response.data.words;
          setTemplate1Id(response.data.id);
          setWordList(data);
          let newWord = [];
          data.map((el, index) => (newWord[index] = el.meaning));
          setWord(newWord.sort(() => Math.random() - 0.5));
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

    axios
      .get("https://maeummal.com/auth/userId", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setUserId(response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const boxClick = (event, index) => {
    const newClicked = [...clicked];
    const newAddLine = [...addLine];
    const type = event.target.id === "word" ? 1 : 0;
    if (!clicked[type].used[index]) {
      newClicked[type].clicked = [0, 0, 0];
      newClicked[type].clicked[index] = 1;
      if (index === 0) newAddLine[type] = "17%";
      else if (index === 1) newAddLine[type] = "50%";
      else newAddLine[type] = "83%";
    }
    if (answerRef.current || answerRef.current === 0) {
      const newAnswer = [...finalAnswer];
      event.target.id === "word"
        ? (newAnswer[answerRef.current] = event.target.innerText)
        : (newAnswer[index] = answerRef.current);
      setfinalAnswer(newAnswer);
      answerRef.current = false;
    } else {
      answerRef.current =
        event.target.id === "word" ? event.target.innerText : index;
    }
    setClicked(newClicked);
    setAddLine(newAddLine);
  };
  useEffect(() => {
    if (addLine[0] != "" && addLine[1] != "") {
      addLine.map((el, index) => {
        const newDataList = [...clicked];
        newDataList[index].clicked = [0, 0, 0];
        if (el === "17%") newDataList[index].used[0] = 1;
        else if (el === "50%") newDataList[index].used[1] = 1;
        else newDataList[index].used[2] = 1;
        setClicked(newDataList);
      });
      const newLine = [...line];
      if (addLine[0] === "17%") newLine[0] = addLine;
      else if (addLine[0] === "50%") newLine[1] = addLine;
      else if (addLine[0] === "83%") newLine[2] = addLine;
      setLine(newLine);
      setAddLine(["", ""]);
    }
  }, [addLine]);

  const handleSubmit = () => {
    if (line.length === 3 && firstTime) {
      const newCorrect = [...correct];
      wordList.map((el, index) => {
        el.meaning === finalAnswer[index]
          ? (newCorrect[index] = true)
          : (newCorrect[index] = false);
      });
      setCorrect(newCorrect);
      setHintShow(newCorrect);
      setLives(lives - 1);
      setFirstTime(false);
    } else if (!firstTime) {
      const count = correct.filter((element) => true === element).length;
      if (count != 3) {
        setLives(lives - 1);
      }
      feedback();
    } else {
      alert("모두 선을 이어주세요!");
    }
  };

  useEffect(() => {
    const count = correct.filter((element) => true === element).length;
    if (count === 3) {
      setLives(2);
      feedback();
    }
  }, [correct]);

  const feedback = () => {
    const payload = {
      templateId: template1Id,
      answerList: finalAnswer,
      studentId: userId,
      templateType: "TEMPLATE1",
    };
    axios
      .post("https://maeummal.com/feedback/create", payload, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setShowReward(true);
          awardBadge();
          setFeedbackData(response.data);
        }
      })
      .catch((error) => {
        console.error("Error while create feedback:", error);
      });
  };

  const handleReset = () => {
    setClicked([
      {
        clicked: [0, 0, 0],
        used: [0, 0, 0],
      },
      {
        clicked: [0, 0, 0],
        used: [0, 0, 0],
      },
    ]);
    setLine([]);
    setfinalAnswer([]);
    setCorrect([]);
  };

  const awardBadge = async () => {
    if (userId !== null) {
      // userId가 null이 아닌지 확인
      const memberId = userId;
      const templateType = "TEMPLATE1";

      try {
        const response = await axios.post(
          `https://maeummal.com/badges/award?memberId=${memberId}&templateType=${templateType}`,
          {},
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );
        if (!response.data.isSuccess) {
          // 응답 성공 여부 확인
          console.log("Badge awarded successfully:", response.data);
        }
      } catch (error) {
        console.error(
          "Error awarding badge:",
          error.response ? error.response.data : error
        ); // 오류 응답 로그 개선
      }
    } else {
      console.error("UserId is null, cannot award badge");
    }
  };

  const handleCloseReward = () => {
    setShowReward(false);
    navigate("/feedback5", { state: [feedbackData, 1] });
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
        <h1>카테고리 분류하기</h1>
        <Row>
          {!firstTime && (
            <Container>
              {hintShow.map((el, index) => (
                <F.HintBox style={{ opacity: el ? "0%" : "100%" }} key={index}>
                  {wordList[index].description}
                  <img src={hint} />
                </F.HintBox>
              ))}
            </Container>
          )}
          <Container>
            {wordList.map((el, index) => (
              <ImgContainer
                key={index}
                data-clickstate={clicked[0].clicked[index]}
              >
                <Circle />
                <img
                  id={el.meaning}
                  src={el.image}
                  onClick={(e) => boxClick(e, index)}
                />
              </ImgContainer>
            ))}
          </Container>
          <svg height="100%" width="62%">
            {line.map(
              (el, index) =>
                el && (
                  <line
                    key={index}
                    x1="0%"
                    y1={el[0]}
                    x2="100%"
                    y2={el[1]}
                    stroke={
                      correct[index] === undefined
                        ? "#969696"
                        : correct[index]
                        ? "#0000ff"
                        : "#ff0000"
                    }
                    strokeWidth="2"
                  />
                )
            )}
          </svg>
          <Container>
            {word.map((el, index) => (
              <Text
                key={index}
                id="word"
                data-clickstate={clicked[1].clicked[index]}
                onClick={(e) => boxClick(e, index)}
              >
                <Circle style={{ left: "-30px" }} />
                {el}
              </Text>
            ))}
          </Container>
        </Row>
        <Row style={{ justifyContent: "center" }}>
          <img
            style={{ height: "30px", marginRight: "10px" }}
            src={reset}
            onClick={handleReset}
          />
          <C.SubmitButton
            style={{ margin: "0", padding: "0" }}
            onClick={handleSubmit}
          >
            제출
          </C.SubmitButton>
        </Row>
      </S.AppContainer>
      {showReward && (
        <ModalOverlay>
          <Reward onClose={handleCloseReward} />
        </ModalOverlay>
      )}
    </>
  );
};

export default Template1Std;
