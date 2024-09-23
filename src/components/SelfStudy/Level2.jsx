import React, { useState } from "react";
import axios from "axios";
import * as S from "./SelfStudyStyle";
import * as D from "../WordCreateTchr/WordDetailStyle";
import * as L from "./Level1Style";
import * as T from "./Level2Style";
import Back from "/src/assets/icon/back.svg";
import { useNavigate, useLocation } from "react-router-dom";

export default function Level2() {
  const navigate = useNavigate();
  const data1 = useLocation().state;
  const dataList = [
    data1.savedData.option1,
    data1.savedData.option2,
    data1.savedData.option3,
  ];
  console.log(data1);
  const handleClick = () => {
    if (selectNum) {
      const answerType = selectNum === 1 ? true : false;
      navigate("/level2result", {
        state: [data1, dataList, selectNum, answerType],
      });
    } else {
      alert("답을 선택해주세요!");
    }
  };
  // 질문, 문제 글, 이미지, 답 리스트, 정답 번호, 해설, 힌트
  // const [data, setData] = useState({
  //   question: "비가 오면 무엇을 하나요?",
  //   answer: "비가 오면, 나는",
  //   img: picture,
  //   list: ["우산을 쓴다.", "놀이터를 간다.", "창문을 연다."],
  //   num: 1,
  //   comment: "비가 오면 우산을 써야 해요!",
  //   hint: "비가 오면 우비, 우산, 장화를 챙겨요.",
  // });
  const [selectNum, setSelectNum] = useState(0);

  const numClick = (index) => {
    setSelectNum(index + 1);
  };

  return (
    <>
      <D.ImageWrap>
        <a href="/selfStudy">
          <img src={Back} alt="" />
        </a>
      </D.ImageWrap>
      <S.AppContainer style={{ height: "100%" }}>
        <h1>자율학습 L2</h1>
        <S.SecondTitle style={{ margin: "20px" }}>
          제시된 상황과 이미지를 보고 가장 적합한 단어를 골라 문장을 완성해
          보자!
        </S.SecondTitle>
        {/* 질문 */}
        <L.SentenceContainer style={{ height: "70px" }}>
          <L.SecondTitle style={{ width: "100%" }}>{"??"}</L.SecondTitle>
        </L.SentenceContainer>
        {/* 문제 */}
        <T.rowContainer>
          {/* 임시로 넣은 이미지 */}
          <T.imgContainer src={data1.savedData.imageUrl} />
          <T.questionContainer>
            <S.rowContainer>
              <L.SecondTitle style={{ width: "150px" }}>
                {data1.firstPart}
              </L.SecondTitle>
              <T.blankBox clickstate={selectNum}>
                {dataList[selectNum - 1]}
              </T.blankBox>
            </S.rowContainer>
            {dataList.map((el, index) => (
              <S.rowContainer key={index} onClick={() => numClick(index)}>
                <T.num>{index + 1}</T.num>
                <T.list>{el}</T.list>
              </S.rowContainer>
            ))}
          </T.questionContainer>
        </T.rowContainer>
        <D.BottomButton
          style={{ margin: "20px 0", width: "150px" }}
          onClick={handleClick}
        >
          선택 완료
        </D.BottomButton>
      </S.AppContainer>
    </>
  );
}
