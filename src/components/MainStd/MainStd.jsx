import React, { useState, useEffect } from "react";
import axios from "axios";
import * as M from "../MainTchr/MainTchrStyle";
import * as MS from "./MainStdStyle";
import { IconList, TemplateCard, temList } from "../MainTchr/MainTchr";
import arrowIcon from "/src/assets/icon/arrowright.svg";
import wordCardImg from "/src/assets/image/word.svg";
import badgeIcon from "/src/assets/icon/badge.svg";
import badgeImg from "/src/assets/image/badge.svg";

const ChallengePercent = ({ percent }) => (
  <MS.DonutContainer>
    <MS.StyledSVG viewBox="0 0 200 200">
      {/* cx, cy:  원의 중심의 x,y 좌표 r: 반지름 크기 */}
      <MS.OuterCircle cx="100" cy="100" r="90" />
      <MS.ProgressCircle
        cx="100"
        cy="100"
        r="90"
        data-progress={percent / 100}
      />
      <MS.InnerCircle cx="100" cy="100" r="70" />
    </MS.StyledSVG>
    <MS.Text>{percent}%</MS.Text>
  </MS.DonutContainer>
);

const MainStd = () => {
  const [lesson, setLesson] = useState([]);
  const [cardData, setCardData] = useState([]);
  const [challengeData, setChallengeData] = useState({});
  const [badge, setBadge] = useState();

  useEffect(() => {
    const token = localStorage.getItem("key");

    axios
      .get("https://maeummal.com/auth/userId", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          axios
            .get(`https://maeummal.com/badges/user/${response.data}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .then((response) => {
              if (response.status === 200) {
                setBadge(response.data);
              }
            })
            .catch((error) => {
              console.error("Error fetching data:", error);
            });
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

    axios
      .get("https://maeummal.com/templates/recent", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.data.isSuccess) {
          setLesson(response.data.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

    axios
      .get("https://maeummal.com/word/wordSet/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.data.isSuccess) {
          setCardData(response.data.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

    axios
      .get("https://maeummal.com/challenge/get", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.data.isSuccess) {
          setChallengeData(response.data.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

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
          <M.rowContainer width="98%" style={{ justifyContent: "normal" }}>
            {lesson?.map((item, index) => (
              <TemplateCard
                key={index}
                title={item.title}
                description={item.templateName}
                imgSrc={IconList[temList.indexOf(item.templateName)]}
              />
            ))}
          </M.rowContainer>
        </M.LessonContainer>
        <M.overContainer>
          {/* 나의 낱말 카드 */}
          <M.CardContainer href="/wordstd">
            <M.SectionTitle>낱말 카드 학습하기</M.SectionTitle>
            <M.ImgContainer>
              {cardData.map((el, index) =>
                index === 0 ? (
                  <M.CardImg2 key={index} src={el.wordList[0].image} alt="" />
                ) : index === 1 || index === 2 ? (
                  <M.CardImg1 key={index} src={el.wordList[0].image} alt="" />
                ) : null
              )}
            </M.ImgContainer>
          </M.CardContainer>
          {/*  오늘의 챌린지 */}
          <M.CardContainer style={{ minWidth: "320px" }}>
            <M.SectionTitle>오늘의 챌린지</M.SectionTitle>
            <M.rowContainer>
              <MS.challengeContainer>
                <MS.challenging>진행 중</MS.challenging>
                {challengeData.unCompletedMissions?.map((item, index) => (
                  <MS.challengeText key={index}>{item}</MS.challengeText>
                ))}
                <MS.challengeFinish>완료</MS.challengeFinish>
                {challengeData.completedMissions?.map((item, index) => (
                  <MS.challengeText key={index}>{item}</MS.challengeText>
                ))}
              </MS.challengeContainer>
              <ChallengePercent
                percent={challengeData.percent ? challengeData.percent : 0}
              />
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
              <MS.badgeCount>{`${badge?.length}개`}</MS.badgeCount>
            </M.rowContainer>
          </M.CardContainer>
        </M.overContainer>
      </M.MainContainer>
    </M.AppContainer>
  );
};

export default MainStd;
