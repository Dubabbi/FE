// Template5Std.jsx
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import * as C from "../CreateLesson/CreateLessonStyle";
import * as S from "../SelfStudy/SelfStudyStyle";
import * as D from "../WordCreateTchr/WordDetailStyle";
import Back from "/src/assets/icon/back.svg";
import reset from "../../assets/icon/reset.svg";
import hint from "../../assets/icon/hint.svg";
import * as O from "./Template1Std";
import Pink from "/src/assets/icon/heartpink.svg";
import White from "/src/assets/icon/heartwhite.svg";
import Reward from "../Reward/Reward";
import { ModalOverlay } from "./Feedback2";

export const HintBox = styled.div`
  position: relative;
  border-radius: 4px;
  border: 2px solid #ff0000;
  padding: 10px 30px 8px 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 120px;
  max-height: 90px;
  margin: 15px 0;
  font-size: 13px;
  img {
    position: absolute;
    height: 17px;
    right: 8px;
    top: 8px;
  }
`;

const Template5Std = () => {
  const navigate = useNavigate();
  const [feedbackData, setFeedbackData] = useState(null);
  const [showReward, setShowReward] = useState(false);
  const answerRef = useRef(false);
  const [lives, setLives] = useState(2);
  const [correct, setCorrect] = useState([]);
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
  const template5Id = 1;

  useEffect(() => {
    axios
      .get(`https://maeummal.com/template5/get?temp5Id=${template5Id}`)
      .then((response) => {
        if (response.data.isSuccess) {
          const data = response.data.data.wordCardList;
          setWordList(data);
          let newWord = [];
          data.map((el, index) => (newWord[index] = el.meaning));
          setWord(newWord.sort(() => Math.random() - 0.5));
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
      setLives(lives - 1);
      setFirstTime(false);
    } else if (!firstTime) {
      const count = correct.filter((element) => true === element).length;
      if (count != 3) {
        setLives(lives - 1);
      }
      feedback();
    } else {
      alert("빈칸을 모두 작성해주세요!");
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
      templateId: 1,
      answerList: finalAnswer,
      studentId: 25,
      templateType: "TEMPLATE5",
    };
    axios
      .post("https://maeummal.com/feedback/create", payload, {
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

  const handleCloseReward = () => {
    setShowReward(false);
    navigate("/feedback5", { state: feedbackData });
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
        <h1>어휘 카드 매칭 게임</h1>
        <O.Row>
          {!firstTime && (
            <O.Container>
              {correct.map((el, index) => (
                <HintBox style={{ opacity: el ? "0%" : "100%" }} key={index}>
                  {wordList[index].description}
                  <img src={hint} />
                </HintBox>
              ))}
            </O.Container>
          )}
          <O.Container>
            {wordList.map((el, index) => (
              <O.ImgContainer
                key={index}
                clickstate={clicked[0].clicked[index]}
              >
                <O.Circle />
                <img
                  id={el.meaning}
                  src={el.image}
                  onClick={(e) => boxClick(e, index)}
                />
              </O.ImgContainer>
            ))}
          </O.Container>
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
          <O.Container>
            {word.map((el, index) => (
              <O.Text
                key={index}
                id="word"
                clickstate={clicked[1].clicked[index]}
                onClick={(e) => boxClick(e, index)}
              >
                <O.Circle style={{ left: "-30px" }} />
                {el}
              </O.Text>
            ))}
          </O.Container>
        </O.Row>
        <O.Row style={{ justifyContent: "center" }}>
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
        </O.Row>
      </S.AppContainer>
      {showReward && (
        <ModalOverlay>
          <Reward onClose={handleCloseReward} />
        </ModalOverlay>
      )}
    </>
  );
};

export default Template5Std;
