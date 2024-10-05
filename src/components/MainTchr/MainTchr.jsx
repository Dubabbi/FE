import React, { useState, useEffect } from "react";
import axios from "axios";
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
import StdModal from "../MypageTchr/MatchingModal";

export const TemplateCard = ({ title, description, imgSrc }) => (
  <M.TemplateCard>
    <img src={imgSrc} alt="" />
    <M.TemplateTitle>{title}</M.TemplateTitle>
    <M.TemplateDescription>{description}</M.TemplateDescription>
  </M.TemplateCard>
);

export const temList = [
  "카테고리 분류하기",
  "이미지 순서 배열하기",
  "감정 표현",
  "이야기 순서 배열하기",
  "어휘 카드 매칭 게임",
];

export const IconList = [tem1Icon, tem2Icon, tem3Icon, tem4Icon, tem5Icon];

export default function MainTchr() {
  const [lesson, setLesson] = useState([]);
  const [cardData, setCardData] = useState([]);
  const [isMatchingModalOpen, setIsMatchingModalOpen] = useState(false);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios
      .get("https://maeummal.com/templates/recent")
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
          Authorization: `Bearer ${localStorage.getItem("key")}`,
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
      .get("https://maeummal.com/api/match/fiveStudents", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("key")}`,
        },
      })
      .then((response) => {
        if (response.data.isSuccess) {
          setStudents(response.data.data);
          console.log("Fetched students:", response.data.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const toggleMatchingModal = () => {
    setIsMatchingModalOpen(!isMatchingModalOpen);
  };
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
            <M.rowContainer width="96%" style={{ justifyContent: "normal" }}>
              {lesson.map((item, index) => (
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
            <M.CardContainer href="/wordtchr">
              <M.SectionTitle>나의 낱말 카드</M.SectionTitle>
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
            {/* 매칭된 학생 */}
            <M.StdListContainer width="65%">
              <M.SectionTitle>
                매칭된 학생
                <M.addStd src={addStd} onClick={toggleMatchingModal} />
                <StdModal
                  isOpen={isMatchingModalOpen}
                  toggleModal={toggleMatchingModal}
                />
              </M.SectionTitle>
              <M.rowContainer width="90%" style={{ minHeight: "162px" }}>
                {students.map((student) => (
                  <M.MatchingStdContainer key={student.studentId}>
                    <img
                      src={student.profileImage || profileImg}
                      alt={student.stdName}
                    />
                    <div>{student.name}</div>
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
