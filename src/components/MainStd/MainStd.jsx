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
            <M.SectionTitle>수강 중인 강의</M.SectionTitle>
            <M.arrowContainer>
            <a href="/lessontchr"><img src={arrowIcon} /></a>
            </M.arrowContainer>
          </M.rowContainer>
          <M.rowContainer width="98%">
            {TemplateList.map((item) => (
              <TemplateCard
                title={item.title}
                description={item.description}
                imgSrc={item.src}
              />
            ))}
          </M.rowContainer>
        </M.LessonContainer>
        <M.rowContainer width="85%">
          {/* 나의 낱말 카드 */}
          <M.LessonContainer width="30%">
            <M.SectionTitle>저장된 낱말 카드</M.SectionTitle>
            <M.ImgContainer>
              <M.CardImg1 src={wordCardImg} alt="" />
              <M.CardImg1 src={wordCardImg} alt="" />
              <M.CardImg2 src={wordCardImg} alt="" />
            </M.ImgContainer>
          </M.LessonContainer>
          {/*  오늘의 챌린지 */}
          <M.LessonContainer width="30%">
            <M.SectionTitle>오늘의 챌린지</M.SectionTitle>
            <M.rowContainer>
              <MS.challengeContainer>
                <MS.challenging>진행 중</MS.challenging>
                {challengeList.map((item) => {
                  if (item.state == "ing")
                    return <MS.challengeText>{item.text}</MS.challengeText>;
                })}
                <MS.challengeFinish>완료</MS.challengeFinish>
                {challengeList.map((item) => {
                  if (item.state == "finish")
                    return <MS.challengeText>{item.text}</MS.challengeText>;
                })}
              </MS.challengeContainer>
              <ChallengePercent percent={33} />
            </M.rowContainer>
          </M.LessonContainer>
          {/* 획득한 배지 */}
          <M.LessonContainer width="30%">
            <M.SectionTitle>
              <MS.BadgeIcon src={badgeIcon} />
              획득한 배지
            </M.SectionTitle>
            <M.rowContainer width="70%">
              <MS.Badge src={badgeImg} />
              <MS.badgeCount>11개</MS.badgeCount>
            </M.rowContainer>
          </M.LessonContainer>
        </M.rowContainer>
      </M.MainContainer>
    </M.AppContainer>
  );
};

export default MainStd;
