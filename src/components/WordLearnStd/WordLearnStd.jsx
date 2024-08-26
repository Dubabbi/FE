import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import * as W from "../WordTchr/WordStyle";
import * as D from "../WordCreateTchr/WordDetailStyle";
import arrowback from "../../assets/icon/arrowback.svg";
import arrownext from "../../assets/icon/arrownext.svg";
import Back from "/src/assets/icon/back.svg";

const WordLearnStd = () => {
  const navigate = useNavigate();
  const { wordSetId } = useParams();
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [showImage, setShowImage] = useState(true); // 추가된 상태: 이미지 표시 여부
  const [wordSet, setWordSet] = useState({
    title: "",
    category: "",
    description: "",
    wordCards: [], // Ensure initial state is an empty array
  });
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchWordSet = async () => {
      const accessToken = localStorage.getItem("key");
      if (!accessToken) {
        setError("Authentication required");
        return;
      }

      try {
        const response = await axios.get(
          `https://maeummal.com/word/wordSet?wordSetId=${wordSetId}`,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );

        if (response.data.isSuccess && response.data.data) {
          const { title, category, description, wordList } = response.data.data;
          setWordSet({
            title,
            category,
            description,
            wordCards: wordList || [], // Safe fallback as an empty array
          });
        } else {
          throw new Error(response.data.message || "Failed to fetch word set");
        }
      } catch (error) {
        console.error("Error fetching word set:", error);
        setError(`Failed to fetch word set: ${error.message}`);
      }
    };

    fetchWordSet();
  }, [wordSetId]);

  const toggleImageVisibility = () => {
    setShowImage(!showImage);
  };

  const handlePrev = () => {
    if (currentWordIndex > 0) {
      setCurrentWordIndex(currentWordIndex - 1);
      setShowImage(true); // 이미지를 다시 보여주도록 설정
    }
  };

  const handleNext = () => {
    if (currentWordIndex < wordSet.wordCards.length - 1) {
      setCurrentWordIndex(currentWordIndex + 1);
      setShowImage(true); // 이미지를 다시 보여주도록 설정
    } else {
      alert("마지막 이미지입니다.");
    }
  };

  return (
    <>
      <D.ImageWrap>
        <a href="/WordStd">
          <img src={Back} alt="Back to main" />
        </a>
      </D.ImageWrap>
      <W.LessonWrapper style={{ marginBottom: "5%" }}>
        <D.Section style={{ marginBottom: "3%" }}>
          <h1 style={{ marginTop: "3%", marginBottom: "3%" }}>
            낱말 카드 학습
          </h1>
          <D.CardTitle style={{ fontSize: "1.5rem" }}>
            {wordSet.title}
          </D.CardTitle>
          <D.WordList>
            <D.WordBoard>
              <D.ArrowButton onClick={handlePrev}>
                <img src={arrowback} alt="이전" />
              </D.ArrowButton>
              <D.Word onClick={toggleImageVisibility}>
                {showImage ? (
                  <img
                    src={wordSet.wordCards[currentWordIndex]?.image || ""}
                    alt="단어 이미지"
                  />
                ) : (
                  <div
                    style={{
                      width: "200px",
                      height: "200px",
                      margin: "0 auto",
                      border: "5px solid #FEEAFA",
                      borderRadius: "10px",
                      flexDirection: "column",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "6%",
                      backgroundColor: "#fcfcfc",
                    }}
                  >
                    <h1>
                      {wordSet.wordCards[currentWordIndex]?.meaning ||
                        "No description"}
                    </h1>
                    <p style={{ fontSize: "1.3rem", textAlign: "left" }}>
                      {wordSet.wordCards[currentWordIndex]?.description ||
                        "No description"}
                    </p>
                  </div>
                )}
              </D.Word>
              <D.ArrowButton onClick={handleNext}>
                <img src={arrownext} alt="다음" />
              </D.ArrowButton>
            </D.WordBoard>
          </D.WordList>
        </D.Section>
        <D.BottomButton>
          <a href="/WordNextStd">학습 종료</a>
        </D.BottomButton>
      </W.LessonWrapper>
    </>
  );
};

export default WordLearnStd;
