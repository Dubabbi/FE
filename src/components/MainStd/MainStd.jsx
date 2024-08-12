import React, { useState } from "react";
import * as M from "../MainTchr/MainTchrStyle";
import * as MS from "./MainStdStyle";
import { TemplateList, TemplateCard } from "../MainTchr/MainTchr";
import arrowIcon from "/src/assets/icon/arrowright.svg";
import wordCardImg from "/src/assets/image/word.svg";
import badgeIcon from "/src/assets/icon/badge.svg";
import badgeImg from "/src/assets/image/badge.svg";

const ChallengePercent = ({ percent }) => (
  <MS.DonutContainer>
    <MS.StyledSVG viewBox="0 0 200 200">
      {/* cx, cy:  원의 중심의 x,y 좌표 r: 반지름 크기 */}
      <MS.OuterCircle cx="100" cy="100" r="90" />
      <MS.ProgressCircle cx="100" cy="100" r="90" progress={percent / 100} />
      <MS.InnerCircle cx="100" cy="100" r="70" />
    </MS.StyledSVG>
    <MS.Text>{percent}%</MS.Text>
  </MS.DonutContainer>
);

const MainStd = () => {
  const [challengeList, setchallengeList] = useState([
    { state: "ing", text: "낱말 카드 학습하기" },
    { state: "ing", text: "강의 1개 이상 수강하기" },
    { state: "finish", text: "자율 학습" },
  ]);

  return (
    <M.AppContainer>
      <M.MainContainer>
        {/* 나의 강의 */}
        <M.LessonContainer width="85%" height="45%">
          <M.rowContainer width="92%">
            <M.SectionTitle>강의 수강하러 가기</M.SectionTitle>
            <M.arrowContainer>
              <a href="/lessonstd">
                <img src={arrowIcon} />
              </a>
            </M.arrowContainer>
          </M.rowContainer>
          <M.rowContainer width="98%">
            {TemplateList.map((item, index) => (
              <TemplateCard
                key={index}
                title={item.title}
                description={item.description}
                imgSrc={item.src}
              />
            ))}
          </M.rowContainer>
        </M.LessonContainer>
        <M.overContainer>
          {/* 나의 낱말 카드 */}
          <M.CardContainer href="/wordstd">
            <M.SectionTitle>낱말 카드 학습하기</M.SectionTitle>
            <M.ImgContainer>
              <M.CardImg1 src={wordCardImg} alt="" />
              <M.CardImg1 src={wordCardImg} alt="" />
              <M.CardImg2 src={wordCardImg} alt="" />
            </M.ImgContainer>
          </M.CardContainer>
          {/*  오늘의 챌린지 */}
          <M.CardContainer style={{ minWidth: "320px" }}>
            <M.SectionTitle>오늘의 챌린지</M.SectionTitle>
            <M.rowContainer>
              <MS.challengeContainer>
                <MS.challenging>진행 중</MS.challenging>
                {challengeList.map((item, index) => {
                  if (item.state == "ing")
                    return (
                      <MS.challengeText key={index}>
                        {item.text}
                      </MS.challengeText>
                    );
                })}
                <MS.challengeFinish>완료</MS.challengeFinish>
                {challengeList.map((item, index) => {
                  if (item.state == "finish")
                    return (
                      <MS.challengeText key={index}>
                        {item.text}
                      </MS.challengeText>
                    );
                })}
              </MS.challengeContainer>
              <ChallengePercent percent={33} />
            </M.rowContainer>
          </M.CardContainer>
          {/* 획득한 배지 */}
          <M.CardContainer>
            <M.SectionTitle>
              <MS.BadgeIcon src={badgeIcon} />
              획득한 배지
            </M.SectionTitle>
            <M.rowContainer width="200px">
              <MS.Badge src={badgeImg} />
              <MS.badgeCount>11개</MS.badgeCount>
            </M.rowContainer>
          </M.CardContainer>
        </M.overContainer>
      </M.MainContainer>
    </M.AppContainer>
  );
};

export default MainStd;
