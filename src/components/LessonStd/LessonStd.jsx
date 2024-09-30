import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import Form from "react-bootstrap/Form";
import CommonTable from "../LessonTchr/CommonTable";
import CommonTableColumn from "../LessonTchr/CommonTableColumn";
import CommonTableRow from "../LessonTchr/CommonTableRow";
import * as L from "../LessonTchr/LessonStyle";
import Back from "/src/assets/icon/back.svg";
import * as D from "../WordCreateTchr/WordDetailStyle";
import axios from "axios";

const LessonStd = () => {
  const [searchValue, setSearchValue] = useState("");
  const [lessons, setLessons] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [filteredLessons, setFilteredLessons] = useState([]);

  useEffect(() => {
    axios
      .get("https://maeummal.com/templates/all")
      .then((response) => {
        if (response.data.isSuccess) {
          const sortedData = response.data.data.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt);
          });
  
          setLessons(sortedData); // 저장된 데이터를 상태로 저장
          setFilteredLessons(sortedData); // 초기 상태에서는 모든 강의를 표시
        } else {
          throw new Error("Failed to fetch data");
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(`Failed to load word sets: ${error.message}`);
      });
  }, []);

  useEffect(() => {
    // 검색어가 변경될 때마다 필터링된 강의 목록을 업데이트
    const filtered = lessons.filter(lesson => 
      lesson.title.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredLessons(filtered);
  }, [searchValue, lessons]);

  const navigateToTemplate = (templateName, templateId) => {
    console.log(`Navigating to template: ${templateName}`); // 디버그 메시지 추가
    switch (templateName) {
      case "카테고리 분류하기":
        navigate("/template1std", { state: { templateId: templateId } });
        break;
      case "감정 표현":
        navigate("/template3std", { state: { templateId: templateId } });
        break;
      case "이미지 순서 배열하기":
        navigate("/template2std", { state: { templateId: templateId } });
        break;33
      case "이야기 순서 배열하기":
        navigate("/template4std", { state: { templateId: templateId } });
        break;
      case "어휘 카드 매칭 게임":
        navigate("/template5std", { state: { templateId: templateId } });
        break;
      default:
        console.error("No such template: " + templateName);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Search:', searchValue);
  };

  return (
    <>
      <D.ImageWrap>
        <a href="/MainStd">
          <img src={Back} alt="" />
        </a>
      </D.ImageWrap>
      <L.LessonWrapper>
        <L.Section>
          <h1>수강 중인 강의</h1>
          <L.LineStd>
          <L.StyledForm onSubmit={handleSubmit}>
              <L.StyledButton type="submit" variant="none"><FaSearch size={15} /></L.StyledButton>
              <Form.Control
                type="text"
                placeholder="Search..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </L.StyledForm>
          </L.LineStd>
          <CommonTable>
            {filteredLessons.map((lesson, index) => (
              <CommonTableRow key={`${lesson.id}_${index}`}>
                <CommonTableColumn>{index + 1}</CommonTableColumn>
                <CommonTableColumn style={{ fontWeight: "bold" }}>
                  <a
                    href="#"
                    onClick={() =>
                      navigateToTemplate(lesson.templateName, lesson.templateId)
                    }
                  >
                    {lesson.title}
                  </a>
                </CommonTableColumn>
                <CommonTableColumn>{lesson.templateName}</CommonTableColumn>
                <CommonTableColumn>{lesson.createdAt}</CommonTableColumn>
                <CommonTableColumn>{lesson.level}</CommonTableColumn>
              </CommonTableRow>
            ))}
          </CommonTable>
        </L.Section>
      </L.LessonWrapper>
    </>
  );
};

export default LessonStd;
