import React, { useState } from "react";
import * as M from "../MainTchr/MainTchrStyle";
import arrowIcon from "/src/assets/icon/arrowright.svg";
import tem1Icon from "/src/assets/icon/template/template1icon.svg";
import tem2Icon from "/src/assets/icon/template/template2icon.svg";
import tem3Icon from "/src/assets/icon/template/template3icon.svg";
import tem4Icon from "/src/assets/icon/template/template4icon.svg";
import tem5Icon from "/src/assets/icon/template/template5icon.svg";
import profileImg from "/src/assets/image/tchr.svg";
import wordCardImg from "/src/assets/image/word.svg";
import addStd from "/src/assets/icon/stdAdd.svg";

export const TemplateCard = ({ title, description, imgSrc }) => (
  <M.TemplateCard>
    <img src={imgSrc} alt="" />
    <M.TemplateTitle>{title}</M.TemplateTitle>
    <M.TemplateDescription>{description}</M.TemplateDescription>
  </M.TemplateCard>
);

export const TemplateList = [
  {
    title: "강의 제목",
    description: "어휘 카드 매칭",
    src: tem1Icon,
  },
  {
    title: "강의 제목",
    description: "이미지 순서 배열하기",
    src: tem2Icon,
  },
  {
    title: "강의 제목",
    description: "카테고리 분류하기",
    src: tem3Icon,
  },
  {
    title: "강의 제목",
    description: "이야기 순서 배열하기",
    src: tem4Icon,
  },
  {
    title: "강의 제목",
    description: "감정 표현",
    src: tem5Icon,
  },
];

export default function MainTchr() {
  const [StdList, setStdList] = useState([
    { stdName: "김망곰", src: profileImg },
    { stdName: "홍감자", src: profileImg },
    { stdName: "루돌프", src: profileImg },
    { stdName: "고구마", src: profileImg },
  ]);

  return (
    <>
      <M.AppContainer>
        <M.MainContainer>
          {/* 나의 강의 */}
          <M.LessonContainer width="85%">
            <M.rowContainer width="92%">
              <M.SectionTitle>나의 강의</M.SectionTitle>
              <M.arrowContainer>
                <a href="/lessontchr">
                  <img src={arrowIcon} />
                </a>
              </M.arrowContainer>
            </M.rowContainer>
            <M.rowContainer width="96%">
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
            <M.CardContainer href="/wordtchr">
              <M.SectionTitle>나의 낱말 카드</M.SectionTitle>
              <M.ImgContainer>
                <M.CardImg1 src={wordCardImg} alt="" />
                <M.CardImg1 src={wordCardImg} alt="" />
                <M.CardImg2 src={wordCardImg} alt="" />
              </M.ImgContainer>
            </M.CardContainer>
            {/* 매칭된 학생 */}
            <M.StdListContainer width="65%">
              <M.SectionTitle>
                매칭된 학생
                <M.addStd src={addStd} />
              </M.SectionTitle>
              <M.rowContainer width="90%">
                {StdList.map((item) => (
                  <M.MatchingStdContainer key={item.stdName}>
                    <img src={item.src} alt="" />
                    {item.stdName}
                  </M.MatchingStdContainer>
                ))}
                <M.arrowContainer>
                  <img src={arrowIcon} />
                </M.arrowContainer>
              </M.rowContainer>
            </M.StdListContainer>
          </M.overContainer>
        </M.MainContainer>
      </M.AppContainer>
    </>
  );
}
