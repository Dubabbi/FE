import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import * as C from "../CreateLesson/CreateLessonStyle";
import * as L from "../LessonTchr/LessonStyle";
import * as D from "../WordCreateTchr/WordDetailStyle";
import Back from "/src/assets/icon/back.svg";
import Pink from "/src/assets/icon/heartpink.svg";
import White from "/src/assets/icon/heartwhite.svg";
import { ModalOverlay } from "./Feedback2";
import Reward from "../Reward/Reward2";
import Toast from "/src/assets/icon/errortoast.svg";
import LoadingModal from "../ImageModal/LoadingModal";

const Template2Std = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userId, setUserId] = useState(null);
  const [templateId, setTemplateId] = useState(
    location.state?.templateId || null
  );
  const [showReward, setShowReward] = useState(false);
  const [feedbackData, setFeedbackData] = useState(null);
  const [templateData, setTemplateData] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);
  const [lives, setLives] = useState(2);
  const [showHint, setShowHint] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [imageSelectionOrder, setImageSelectionOrder] = useState({});
  const [isCreatingFeedback, setIsCreatingFeedback] = useState(false);

  useEffect(() => {
    const fetchUserId = async () => {
      const accessToken = localStorage.getItem("key");
      if (!accessToken) {
        console.error("Authentication token is missing");
        return;
      }
      try {
        const response = await axios.get("https://maeummal.com/auth/userId", {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        if (response.status === 200) {
          console.log("Fetched user ID:", response.data);
          setUserId(response.data);
        } else {
          throw new Error("Failed to fetch user ID");
        }
      } catch (error) {
        console.error(
          "Error fetching user ID:",
          error.message || "Unknown error"
        );
      }
    };
    fetchUserId();
  }, []);

  useEffect(() => {
    if (!templateId) {
      console.error("Template ID is missing");
      return;
    }

    setIsLoading(true); // Set loading true before the API call
    const fetchTemplateData = async () => {
      const accessToken = localStorage.getItem("key");
      if (!accessToken) {
        console.error("Authentication required");
        return;
      }
      try {
        const response = await axios.get(
          `https://maeummal.com/template2/get?template2Id=${templateId}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        if (response.data.isSuccess && response.data.data) {
          setTemplateData(response.data.data);
          setSelectedImages([]);
        } else {
          throw new Error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false); // Set loading false after the API call
      }
    };
    fetchTemplateData();
  }, [templateId]);

  if (isLoading || isCreatingFeedback) {
    return (
      <LoadingModal isOpen={isLoading || isCreatingFeedback} text={"피드백"} />
    );
  }

  const toggleSelectImage = (id) => {
    const index = selectedImages.findIndex((item) => item.id === id);
    if (index === -1) {
      // 이미지가 선택되지 않았다면 추가
      const newImages = [
        ...selectedImages,
        { id, originalIndex: selectedImages.length + 1 },
      ];
      setSelectedImages(newImages);
      setImageSelectionOrder(
        newImages.reduce((acc, item, idx) => {
          acc[item.id] = idx + 1;
          return acc;
        }, {})
      );
    } else {
      // 이미지가 이미 선택되었다면 제거
      const newImages = selectedImages.filter((item) => item.id !== id);
      setSelectedImages(newImages);
      setImageSelectionOrder(
        newImages.reduce((acc, item, idx) => {
          acc[item.id] = idx + 1;
          return acc;
        }, {})
      );
    }
  };

  const handleSubmit = async () => {
    if (!templateData || !templateData.templateId) {
      console.error("Template data is missing, please try again.");
      return;
    }

    // 이미지가 모든 카드를 선택했는지 확인
    if (selectedImages.length !== templateData.storyCardEntityList.length) {
      alert("모든 카드를 선택해야 합니다.");
      return;
    }

    setIsCreatingFeedback(true); // 피드백 생성 시작
    // 사용자 응답 순서 생성 및 정답 확인 로직...
    const userAnswerOrder = selectedImages
      .sort((a, b) => a.originalIndex - b.originalIndex)
      .map((item) => {
        const card = templateData.storyCardEntityList.find(
          (card) => card.storyCardId === item.id
        );
        return card.answerNumber.toString();
      });

    const correctOrder = templateData.storyCardEntityList
      .map((card) => card.answerNumber.toString())
      .sort((a, b) => a - b);

    const isCorrect =
      JSON.stringify(userAnswerOrder) === JSON.stringify(correctOrder);

    if (isCorrect) {
      await submitFeedback(userAnswerOrder);
      setShowReward(true);
      awardBadge();
      setIsCreatingFeedback(false); // 피드백 생성 종료
    } else {
      if (lives > 1) {
        setLives(lives - 1);
        setShowHint(true);
        // 오답 선택 시 선택과 넘버링 초기화
        setSelectedImages([]);
        setImageSelectionOrder({});
        setIsCreatingFeedback(false); // 피드백 생성 종료
      } else {
        setLives(0);
        setShowHint(false);
        await submitFeedback(userAnswerOrder);
        // 게임 오버 시 선택과 넘버링 초기화
        setSelectedImages([]);
        setImageSelectionOrder({});
        setIsCreatingFeedback(false); // 피드백 생성 종료
      }
    }
  };

  const submitFeedback = async (userAnswerOrder) => {
    try {
      const accessToken = localStorage.getItem("key");
      const response = await axios.post(
        "https://maeummal.com/feedback/create",
        {
          templateId: templateData.templateId,
          answerList: userAnswerOrder.map(String),
          studentId: userId,
          templateType: "TEMPLATE2",
          title: templateData.title,
        },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      if (response.data && response.data.id) {
        setFeedbackData(response.data);
        handleShowReward(true);
      } else {
        console.error(
          "Failed to submit feedback:",
          response.data.message || "Unknown error"
        );
      }
    } catch (error) {
      console.error("Error during feedback submission:", error);
    }
  };

  const awardBadge = async () => {
    if (userId !== null) {
      const accessToken = localStorage.getItem("key");
      const memberId = userId;
      const templateType = "TEMPLATE2";

      try {
        const response = await axios.post(
          `https://maeummal.com/badges/award?memberId=${memberId}&templateType=${templateType}`,
          {},
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );

        if (!response.data.isSuccess) {
          // 응답 성공 여부 확인

          console.log("Badge awarded successfully:", response.data);
        }
      } catch (error) {
        console.error(
          "Error awarding badge:",
          error.response ? error.response.data : error
        ); // 오류 응답 로그 개선
      }
    } else {
      console.error("UserId is null, cannot award badge");
    }
  };

  const handleShowReward = (show) => {
    setShowReward(show);
  };

  const handleCloseReward = () => {
    setShowReward(false);
    navigate("/Feedback2", {
      state: {
        feedbackData,
        description: templateData.description,
        templateTitle: templateData.title,
      },
    });
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <D.ImageWrap>
        <a href="/lessonstd">
          <img src={Back} alt="Back" />
        </a>
      </D.ImageWrap>
      <D.HeartWrap>
        {Array.from({ length: 2 }).map((_, index) => (
          <img key={index} src={index < 2 - lives ? White : Pink} alt="Heart" />
        ))}
      </D.HeartWrap>
      <L.LessonWrapper>
        <L.Section>
          <h1>{templateData ? templateData.title : "Loading..."}</h1>
          <p>{templateData ? templateData.description : "Loading..."}</p>
        </L.Section>
        <C.Line>
          {/* templateData.storyCardEntityList가 존재할 때만 map 호출 */}
          {templateData && templateData.storyCardEntityList ? (
            templateData.storyCardEntityList.map((card) => (
              <C.TemplateBox
                key={card.storyCardId}
                onClick={() => toggleSelectImage(card.storyCardId)}
                style={{ position: "relative" }}
              >
                <img
                  src={card.image}
                  alt={`Story card ${card.storyCardId}`}
                  style={{
                    border: selectedImages.some(
                      (item) => item.id === card.storyCardId
                    )
                      ? "4px solid #ACAACC"
                      : "4px solid #eee",
                  }}
                />
                {imageSelectionOrder[card.storyCardId] && (
                  <div
                    style={{
                      position: "absolute",
                      top: "5px",
                      right: "5px",
                      color: "white",
                      fontWeight: "bold",
                      background: "rgba(0, 0, 0, 0.5)",
                      padding: "2px 6px",
                      borderRadius: "50%",
                    }}
                  >
                    {imageSelectionOrder[card.storyCardId]}
                  </div>
                )}
              </C.TemplateBox>
            ))
          ) : (
            <p>Loading cards...</p>
          )}
        </C.Line>
      </L.LessonWrapper>
      {showHint && (
        <C.HintWrapper
          style={{
            border: "none",
            position: "fixed",
            width: "60%",
            marginLeft: "20%",
            marginTop: "-4%",
          }}
        >
          <C.HintToast style={{ minWidth: "200px", backgroundColor: "#fff" }}>
            <img src={Toast} alt="Hint" />
            {templateData ? templateData.hint : "Loading..."}
          </C.HintToast>
        </C.HintWrapper>
      )}
      <C.SubmitButton onClick={handleSubmit}>제출</C.SubmitButton>
      {showReward && (
        <ModalOverlay>
          <Reward onClose={handleCloseReward} />
        </ModalOverlay>
      )}
    </>
  );
};

export default Template2Std;
