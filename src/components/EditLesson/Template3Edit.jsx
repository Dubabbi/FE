import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import * as D from "../WordCreateTchr/WordDetailStyle";
import * as L from "../LessonTchr/LessonStyle";
import * as C from "../CreateLesson/CreateLessonStyle";
import * as T from "../CreateLesson/Template3Tchr";
import Back from "/src/assets/icon/back.svg";
import add from "../../assets/icon/add.svg";
import Form from "react-bootstrap/Form";
import ModalComponent from "../ImageModal/ImageModal";
import { AiFillDelete } from "react-icons/ai";

export default function Template3Edit() {
  // location.state를 안전하게 처리
  const template3Id = useLocation().state.templateId;
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalCardIndex, setModalCardIndex] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState([""]);
  const [inputComment, setInputComment] = useState("");
  const [data, setData] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    numberOfStories: "1",
  });

  // 템플릿 데이터 로드
  useEffect(() => {
    const fetchTemplateData = async () => {
      try {
        const response = await axios.get(
          `https://maeummal.com/template3/get?template3Id=${template3Id}`,
          {
            headers: { Authorization: `Bearer ${localStorage.getItem("key")}` },
          }
        );
        if (response.data.isSuccess) {
          const fetchedData = response.data.data;
          setData(response.data.data);
          setFormData({
            ...formData,
            numberOfStories: fetchedData.imageNum,
          });
          setValues(fetchedData.imageCardList);
          setOptions(fetchedData.options);
          setInputComment(fetchedData.description);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchTemplateData();
  }, [template3Id]);

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
        title: data.title,
        level: data.level,
        description: inputComment,
        imageNum: values.length,
        templateType: "TEMPLATE3",
        options: options,
      },
      imageCardDTOList: values,
    };
    if (values.length == formData.numberOfStories) {
      axios
        .put(`https://maeummal.com/template3/update/${template3Id}`, payload, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("key")}`,
          },
        })
        .then((response) => {
          if (response.status === 200) {
            alert("템플릿이 성공적으로 수정되었습니다.");
            navigate("/lessontchr");
          }
        })
        .catch((error) => {
          console.error("Error while create template3:", error);
          alert("템플릿 수정에 실패했습니다.");
        });
    } else {
      alert("모두 작성해주세요.");
    }
  };

  const handleDeleteTemplate = async () => {
    const confirmDelete = window.confirm("정말 템플릿을 삭제하시겠습니까?");
    if (confirmDelete) {
      try {
        const response = await axios.delete(
          `https://maeummal.com/template3/${template3Id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("key")}`,
            },
          }
        );
        // 상태 코드에 따라 다른 메시지를 출력
        if (response.status === 204) {
          alert("템플릿이 성공적으로 삭제되었습니다.");
          navigate("/lessontchr");
        }
      } catch (error) {
        if (error.response) {
          if (error.response.status === 404) {
            alert("템플릿을 찾을 수 없습니다.");
          } else if (error.response.status === 403) {
            alert("자신의 템플릿만 삭제할 수 있습니다.");
          } else {
            alert(`삭제 실패: ${error.response.data.message}`);
          }
        } else {
          alert(`템플릿 삭제 중 오류가 발생했습니다: ${error.message}`);
        }
      }
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
          <T.CardContainer>
            {Array.from({ length: parseInt(formData.numberOfStories) }).map(
              (_, index) => (
                <T.Card key={index}>
                  <T.ImageBox
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
                  </T.ImageBox>
                  <T.InputField
                    style={{ marginTop: "10px" }}
                    type="text"
                    name="adjective"
                    placeholder="관형구"
                    value={values[index].adjective}
                    onChange={(e) => handleChange(e, index)}
                  />
                  <T.InputField
                    style={{ marginTop: "10px" }}
                    type="text"
                    name="noun"
                    placeholder="단어"
                    value={values[index].noun}
                    onChange={(e) => handleChange(e, index)}
                  />
                  <T.ExampleBox style={{ top: "324px" }}>힌트</T.ExampleBox>
                  <T.InputField
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
                </T.Card>
              )
            )}
          </T.CardContainer>
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
          <T.ExampleBox>보기</T.ExampleBox>
          <T.CardContainer
            style={{ padding: "0px", justifyContent: "space-evenly" }}
          >
            {Array.from({ length: 5 }).map((_, index) => (
              <T.InputField
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
                value={options[index]}
                onChange={(e) => handleChange(e, index)}
              />
            ))}
          </T.CardContainer>
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
          <T.CardContainer
            style={{
              padding: "0px",
              justifyContent: "space-around",
              margin: "10px 0",
            }}
          >
            <T.ExampleBox style={{ position: "static", marginTop: "5px" }}>
              제목
            </T.ExampleBox>
            <T.InputField
              style={{
                borderRadius: "10px",
                width: "70%",
                minWidth: "200px",
                fontSize: "1rem",
                margin: "0px 10px",
              }}
              type="text"
              placeholder="제목을 입력해주세요."
              value={data.title}
              onChange={(e) => setData({ ...data, title: e.target.value })}
            />
          </T.CardContainer>
          <T.CardContainer
            style={{
              padding: "0px",
              justifyContent: "space-around",
              margin: "10px 0",
            }}
          >
            <T.ExampleBox style={{ position: "static", marginTop: "5px" }}>
              난이도
            </T.ExampleBox>
            <T.InputField
              style={{
                borderRadius: "10px",
                width: "70%",
                minWidth: "200px",
                fontSize: "1rem",
                margin: "0px 10px",
              }}
              type="number"
              placeholder="난이도를 입력해주세요."
              value={data.level}
              min={1}
              max={5}
              onChange={(e) => setData({ ...data, level: e.target.value })}
            />
          </T.CardContainer>
          <T.CardContainer
            style={{
              padding: "0px",
              justifyContent: "space-around",
              margin: "10px 0",
            }}
          >
            <T.ExampleBox style={{ position: "static", marginTop: "5px" }}>
              해설
            </T.ExampleBox>
            <T.InputField
              style={{
                borderRadius: "10px",
                width: "70%",
                minWidth: "200px",
                fontSize: "1rem",
                margin: "0px 10px",
              }}
              type="text"
              placeholder="해설을 입력해주세요."
              value={inputComment}
              onChange={(e) => setInputComment(e.target.value)}
            />
          </T.CardContainer>
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
          <C.ButtonContainer>
          <C.DeleteButton onClick={handleDeleteTemplate}>
            삭제
            <AiFillDelete style={{ marginLeft: '5px' }} />
          </C.DeleteButton>
          <C.EditButton onClick={handleCreate}>수정</C.EditButton>
          </C.ButtonContainer>
      </L.LessonWrapper>
    </>
  );
}
