// Template3Tchr.jsx
import React, { useState } from "react";
import styled from "styled-components";
import * as C from "./CreateLessonStyle";
import * as L from "../LessonTchr/LessonStyle";
import * as D from "../WordCreateTchr/WordDetailStyle";
import Back from "/src/assets/icon/back.svg";
import add from "../../assets/icon/add.svg";
import createimg from "/src/assets/image/template/createimg.svg";
import send from "/src/assets/icon/send.svg";
import Form from "react-bootstrap/Form";

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
  const [modalOpen, setModalOpen] = useState(false);
  const [inputComment, setInputComment] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    numberOfStories: "1",
  });

  const [values, setValues] = useState({
    abj: [""],
    noun: [""],
    hint: [""],
    option: [""],
  });

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const newValues = { ...values };
    newValues[name][index] = value;
    setValues(newValues);
  };

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const handleSubmit = () => {
    console.log("Input Submitted:", inputValue);
    toggleModal(); // 제출 후 모달 닫기
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
                  <ImageBox>
                    <img src={add} onClick={toggleModal} />
                  </ImageBox>
                  <InputField
                    style={{ marginTop: "10px" }}
                    type="text"
                    name="abj"
                    placeholder="관형구"
                    as="textarea"
                    value={values.abj[index]}
                    onChange={(e) => handleChange(e, index)}
                  />
                  <InputField
                    style={{ marginTop: "10px" }}
                    type="text"
                    name="noun"
                    placeholder="단어"
                    as="textarea"
                    value={values.noun[index]}
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
                    value={values.hint[index]}
                    onChange={(e) => handleChange(e, index)}
                  />
                </Card>
              )
            )}
          </CardContainer>
          {modalOpen && (
            <C.ModalOverlay>
              <C.ModalContent>
                <h1>이미지 생성</h1>
                <C.ModalImg>
                  <div>
                    <img src={createimg} />
                  </div>
                </C.ModalImg>
                <C.InputWrap>
                  <C.InputField
                    type="text"
                    placeholder="텍스트 입력"
                    // value={inputValue}
                    // onChange={handleInputChange}
                  />
                  <C.Send>
                    <img src={send} />
                  </C.Send>
                </C.InputWrap>
                <C.ModalButton onClick={handleSubmit}>제출</C.ModalButton>
              </C.ModalContent>
            </C.ModalOverlay>
          )}
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
                value={values.option[index]}
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
        <C.SubmitButton style={{ marginBottom: "50px", marginTop: "30px" }}>
          제출
        </C.SubmitButton>
      </L.LessonWrapper>
    </>
  );
};

export default Template3Tchr;
