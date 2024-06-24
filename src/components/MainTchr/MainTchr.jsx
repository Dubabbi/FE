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
    title: "낱말 카드 학습하기",
    description: "새로운 낱말 카드를 학습합니다.",
    src: tem1Icon,
  },
  {
    title: "이미지 순서 배열하기",
    description: "이미지를 순서대로 배열합니다.",
    src: tem2Icon,
  },
  {
    title: "카테고리 분류하기",
    description: "이미지 카테고리 분류 학습.",
    src: tem3Icon,
  },
  {
    title: "이야기 순서 배열하기",
    description: "이야기의 순서를 배열합니다.",
    src: tem4Icon,
  },
  {
    title: "감정 표현",
    description: "감정 표현을 학습합니다.",
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
    <M.AppContainer>
      <M.MainContainer>
        {/* 나의 강의 */}
        <M.LessonContainer width="85%" height="46%">
          <M.rowContainer width="92%">
            <M.SectionTitle>나의 강의</M.SectionTitle>
            <M.arrowContainer>
              <img src={arrowIcon} />
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
            <M.SectionTitle>나의 낱말 카드</M.SectionTitle>
            <M.ImgContainer>
              <M.CardImg1 src={wordCardImg} alt="" />
              <M.CardImg1 src={wordCardImg} alt="" />
              <M.CardImg2 src={wordCardImg} alt="" />
            </M.ImgContainer>
          </M.LessonContainer>
          {/* 매칭된 학생 */}
          <M.LessonContainer width="65%">
            <M.SectionTitle>
              매칭된 학생
              <M.addStd src={addStd} />
            </M.SectionTitle>
            <M.rowContainer width="90%">
              {StdList.map((item) => (
                <M.MatchingStdContainer>
                  <img src={item.src} alt="" />
                  {item.stdName}
                </M.MatchingStdContainer>
              ))}
              <M.arrowContainer>
                <img src={arrowIcon} />
              </M.arrowContainer>
            </M.rowContainer>
          </M.LessonContainer>
        </M.rowContainer>
      </M.MainContainer>
    </M.AppContainer>
  );
}
