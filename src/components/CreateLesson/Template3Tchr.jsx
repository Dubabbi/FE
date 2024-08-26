// Template3Tchr.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import * as C from "./CreateLessonStyle";
import * as L from "../LessonTchr/LessonStyle";
import * as D from "../WordCreateTchr/WordDetailStyle";
import Back from "/src/assets/icon/back.svg";
import add from "../../assets/icon/add.svg";
import Form from "react-bootstrap/Form";
import ModalComponent from "../ImageModal/ImageModal";

// 전체 카드 컨테이너 스타일
export const CardContainer = styled.div`
  display: flex;
  width: 100%;
  padding: 20px 0;
  overflow-x: auto;
  margin: 0 15px;
`;

// 개별 카드 스타일
const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 20px;
`;

// 이미지 박스
const ImageBox = styled.div`
  width: 170px;
  height: 170px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid #f6f6f6;
  border-radius: 1rem;
  img {
    cursor: pointer;
    width: 40px;
    max-height: 100%;
  }
`;

// 입력 필드
const InputField = styled.input`
  width: 170px;
  resize: none;
  font-size: 1.3rem;
  font-weight: 600;
  border: 2px solid #acaacc;
  border-radius: 5px;
  color: #000000;
  text-align: center;
  height: 38px;
  line-height: 30px;
  outline: none;
  &:focus {
    border: 2px solid #777777;
  }

  &::placeholder {
    color: #777777;
  }
`;

export const ExampleBox = styled.div`
  min-width: 80px;
  height: 26px;
  position: absolute;
  background-color: #fed7d7;
  border-radius: 13px;
  top: -13px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
`;

const Template3Tchr = () => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalCardIndex, setModalCardIndex] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState([""]);
  const [inputComment, setInputComment] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    numberOfStories: "1",
  });

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleModalSubmit();
    }
  };

  const handleModalSubmit = async () => {
    try {
      const response = await axios.post("https://maeummal.com/ai/image", {
        prompt: inputValue,
      });
      if (response.status === 200 && response.data) {
        const newValue = [...values];
        newValue[modalCardIndex].image = response.data;
        setValues(newValue);
        setModalOpen(false);
      }
    } catch (error) {
      console.error("Error generating image or creating Template2:", error);
      alert("이미지 생성 또는 템플릿 생성에 실패했습니다.");
    }
  };

  const [values, setValues] = useState([
    {
      image: "",
      adjective: "",
      noun: "",
      hint: "",
    },
  ]);

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    if (name === "option") {
      const newOption = [...options];
      newOption[index] = value;
      setOptions(newOption);
    } else {
      const newValues = [...values];
      newValues[index][name] = value;
      setValues(newValues);
    }
  };

  const toggleModal = (index) => {
    setModalCardIndex(index);
    setModalOpen(!modalOpen);
  };

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === "numberOfWords") {
      adjustWordCards(parseInt(value, 10));
    }
    let newData = [];
    Array.from({ length: value }).map(
      (_, index) =>
        (newData[index] = {
          image: "",
          adjective: "",
          noun: "",
          hint: "",
        })
    );
    setValues(newData);
  };

  const handleCreate = () => {
    const payload = {
      template3DTO: {
        //title: "",
        description: inputComment,
        imageNum: values.length,
        templateType: "TEMPLATE3",
        options: options,
      },
      //type: data.difficulty,
      imageCardDTOList: values,
    };
    if (values.length == formData.numberOfStories) {
      axios
        .post(`https://maeummal.com/template3/create`, payload, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("key")}`,
          },
        })
        .then((response) => {
          if (response.status === 200) {
            navigate("/lessonTchr");
          }
        })
        .catch((error) => {
          console.error("Error while create template5:", error);
        });
    } else {
      alert("모두 작성해주세요.");
    }
  };

  return (
    <>
      <D.ImageWrap>
        <a href="/MainTchr">
          <img src={Back} alt="" />
        </a>
      </D.ImageWrap>
      <L.LessonWrapper style={{ padding: "30px 0px 0px 0px" }}>
        <L.Section style={{ paddingBottom: "10px" }}>
          <h1>감정 표현</h1>
        </L.Section>
        <D.Select
          style={{
            width: "20%",
            marginLeft: "7px",
            marginBottom: "5px",
          }}
        >
          <C.Line>
            <D.SecondTitle style={{ minWidth: "80px" }}>
              사진 개수
            </D.SecondTitle>
            <Form.Select
              name="numberOfStories"
              value={formData.numberOfStories}
              onChange={handleSelectChange}
              style={{
                paddingLeft: "10px",
                paddingRight: "130px",
                fontSize: "1.5rem",
                borderRadius: "7px",
                border: "1px solid #ACAACC",
                width: "200px",
                height: "36px",
                marginLeft: "22%",
                marginBottom: "10px",
              }}
            >
              {Array.from({ length: 4 }, (_, i) => i + 1).map((number) => (
                <option key={number} value={number}>
                  {number}개
                </option>
              ))}
            </Form.Select>
          </C.Line>
        </D.Select>
        <C.StoryWrap>
          <CardContainer>
            {Array.from({ length: parseInt(formData.numberOfStories) }).map(
              (_, index) => (
                <Card key={index}>
                  <ImageBox
                    style={{
                      border: values[index].image
                        ? "none"
                        : "3px solid #f6f6f6",
                    }}
                  >
                    <img
                      style={{
                        width: values[index].image ? "100%" : "40px",
                        height: "auto",
                        borderRadius: "1rem",
                        display: "inline-block",
                      }}
                      src={values[index].image || add}
                      onClick={() => toggleModal(index)}
                    />
                  </ImageBox>
                  <InputField
                    style={{ marginTop: "10px" }}
                    type="text"
                    name="adjective"
                    placeholder="관형구"
                    as="textarea"
                    value={values[index].adj}
                    onChange={(e) => handleChange(e, index)}
                  />
                  <InputField
                    style={{ marginTop: "10px" }}
                    type="text"
                    name="noun"
                    placeholder="단어"
                    as="textarea"
                    value={values[index].noun}
                    onChange={(e) => handleChange(e, index)}
                  />
                  <ExampleBox style={{ top: "324px" }}>힌트</ExampleBox>
                  <InputField
                    style={{
                      marginTop: "20px",
                      height: "100px",
                      paddingTop: "15px",
                      borderRadius: "10px",
                    }}
                    type="text"
                    name="hint"
                    placeholder="힌트를 입력해주세요."
                    as="textarea"
                    value={values[index].hint}
                    onChange={(e) => handleChange(e, index)}
                  />
                </Card>
              )
            )}
          </CardContainer>
        </C.StoryWrap>
        {/* 보기 */}
        <C.StoryWrap
          style={{
            width: "70%",
            borderRadius: "15px",
            marginLeft: "15%",
            marginTop: "40px",
            alignItems: "center",
            justifyContent: "center",
            padding: "25px",
          }}
        >
          <ExampleBox>보기</ExampleBox>
          <CardContainer
            style={{ padding: "0px", justifyContent: "space-evenly" }}
          >
            {Array.from({ length: 5 }).map((_, index) => (
              <InputField
                key={index}
                style={{
                  border: "2.5px solid #fed7d7",
                  borderRadius: "10px",
                  width: "100px",
                  minWidth: "100px",
                  fontSize: "1rem",
                  height: "35px",
                  lineHeight: "26px",
                  margin: "0px 10px",
                }}
                type="text"
                name="option"
                placeholder="관형구"
                as="textarea"
                value={options[index]}
                onChange={(e) => handleChange(e, index)}
              />
            ))}
          </CardContainer>
        </C.StoryWrap>
        <C.StoryWrap
          style={{
            width: "70%",
            borderRadius: "15px",
            marginLeft: "15%",
            marginTop: "30px",
            alignItems: "center",
            justifyContent: "center",
            padding: "10px",
          }}
        >
          <CardContainer
            style={{
              padding: "0px",
              justifyContent: "space-around",
              margin: "10px 0",
            }}
          >
            <ExampleBox style={{ position: "static", marginTop: "5px" }}>
              해설
            </ExampleBox>
            <InputField
              style={{
                borderRadius: "10px",
                width: "70%",
                minWidth: "200px",
                fontSize: "1rem",
                margin: "0px 10px",
              }}
              type="text"
              placeholder="해설을 입력해주세요."
              as="textarea"
              value={inputComment}
              onChange={(e) => setInputComment(e.target.value)}
            />
          </CardContainer>
        </C.StoryWrap>
        {modalOpen && (
          <ModalComponent
            isOpen={modalOpen}
            toggleModal={() => setModalOpen(false)}
            inputModalValue={inputValue}
            handleInputModalChange={handleInputChange}
            handleKeyPress={handleKeyPress}
            handleModalSubmit={handleModalSubmit}
            generatedImageUrl={values[modalCardIndex].image}
          />
        )}
        <C.SubmitButton onClick={handleCreate}>제출</C.SubmitButton>
      </L.LessonWrapper>
    </>
  );
};

export default Template3Tchr;
