import styled from "styled-components";
import Form from 'react-bootstrap/Form';

export const Input = styled(Form)`
    margin-left: 5%;
    width: 40%;
    min-width: 200px;
    height: 37px; 
    font-size: 16px; 
    border-radius: 7px;
    border: 1px solid #bbbbbb;
    display: flex;
    align-items: center;
    position: relative;
    margin-bottom: 5%;
    
    .form-control {
        margin-left: 10px;
        height: 35px; 
        font-size: 1.5rem; 
        border-radius: 5px;
        padding-right: 80px; 
        padding-left: 10px;
    }
`;

export const Line = styled.div`
    margin: 8%;
    width: 80%;
    margin-left: 10%;
    display: flex;
    gap: 10%;
    flex-direction: row;
    justify-content: space-between;
    @media (max-width: 768px) {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
`

export const Title = styled(Form)`
    margin-left: 5%;
    width: 40%;;
    height: 37px; 
    font-size: 16px; 
    display: flex;
    position: relative;
`;
export const LessonBox = styled.div`
  width: 70%;
  margin-left: 15%;
  padding: 3%;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  @media (max-width: 768px) {
    width: 90%;
    margin-left: 5%;
    padding: 5%;
  }
`;

export const TemplateList = styled.div`
  display: flex;
  position: relative;
  justify-content: flex-start; // 각 요소들을 시작 지점부터 나열
  gap: 3%;
  max-width: 90%;
  margin-left: 5%;
  padding-bottom: 2%;
  flex-wrap: nowrap; // 줄바꿈 방지
  overflow-x: auto; // 가로 스크롤 허용
  -webkit-overflow-scrolling: touch; // 모바일에서 부드러운 스크롤 경험 제공
  img{
    max-width: 17%;
  }
  @media (max-width: 1024px) {
    gap: 2%;
    margin-bottom: 5%;
    img{
      max-width: 25%;
      width: 25%;
    }
  }
  @media (max-width: 768px) {
    gap: 1%;
    margin-bottom: 5%;
    img{
      max-width: 40%;
      width: 40%;
    }
  }
`;

export const TemHintBox = styled.div`
  min-width: 80px;
  height: 26px;
  position: absolute;
  background-color: #fed7d7;
  border-radius: 13px;
  top: 5px; 
  left: 50%; // 가로 중앙
  transform: translateX(-50%); // 중앙 정렬
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
`;

export const ExampleContainer = styled.div`
  display: flex;
  width: 100%;
  padding: 0px;
  overflow-x: auto;
  margin: 0 15px;
  justify-content: space-evenly;
  @media(max-width: 780px){
    padding-left: 0px;
    padding-right: 0px;
    padding-top: 0px;
    padding-bottom: 10px;
  }
`;

export const InputContainer = styled.div`
  position: relative;
  width: 170px;
  margin-top: 20px; 
`;

export const SubmitButton = styled.button`
  width: 10%;
  padding: 0.8rem;
  margin-left: 45%;
  margin-top: 1.5%;
  margin-bottom: 2%;
  height: 3.8rem;
  border: none;
  border-radius: 6px;
  background-color: #ACAACC;
  color: white;
  font-size: 1.7rem;
  cursor: pointer;
  &:hover {
    background-color: #8C84B0;
  }
  @media (max-width: 1024px) {
    width: 20%;
    margin-left: 40%;
    font-size: 1.5rem;
    margin-bottom: 4%;
  }
  @media (max-width: 768px) {
    width: 30%;
    margin-left: 35%;
    font-size: 1.4rem;
    margin-bottom: 4%;
  }
`;

export const Page = styled.div`
  position: fixed;
  right: 5%;
  top: 7%;
  bottom: 7%;
  width: 38%;
  @media (max-width: 1024px) {
    width: 50%;
    padding: 0 1.5rem;
  }
  @media (max-width: 768px) {
    width: 80%;
    right: 10%;
    top: 10%;
    bottom: 10%;
  }
`;



export const Card = styled.div`
  background-color: rgba(217, 217, 217, 0.14);
  width: 62%;
  max-width: 1024px;
  border-radius: 8px;
  margin: 0px auto;
  position: relative;
`;

export const TopTab = styled.div`
  background-color: #969696;
  padding: 8px 20px;
  font-size: 1.2vw;
  font-weight: bold;
  border-radius: 8px;
  width: fit-content;
  color: #ffffff;
  position: absolute;
  bottom: 100%; 
  left: 0px; 
  transform: translate(-50%, 50%); 
`;

export const Content = styled.div`
  padding: 40px 30px 30px;
  font-size: 1vw;
`;

export const ContentInput = styled.input`
  padding: 40px 30px 30px;
  font-size: 1vw;
  resize: none;
  width: 80%; 
  margin-left: 10%;
  background-color: rgba(217, 217, 217, 0.14);
  border: 2px solid #969696; 
  border-radius: 8px; 
  color: #333;  
  outline: none; 
  &:focus {
    background-color: #ffffff; 
  }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5); // 반투명 배경
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
`;

export const ModalContent = styled.div`
  position: relative;
  min-width: 450px;
  height: 50vh;
  background: white;
  border-radius: 10px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  h1{
    margin: 5%;
    font-size: 1.2vw;
  }
`;
export const ImageBox = styled.div`
  cursor: pointer;
  transition: transform 0.2s ease;
  &:hover {
    transform: scale(1.05);
  }
`;

export const StyledImg = styled.img`
  width: 200px;
  height: auto;
  border-radius: 10px;
`;

export const InputField = styled.input`
  padding-left: 5px;
  width: 100%;
  position: relative;
`;

export const InputWrap = styled.div`
  padding: 10px;
  height: 45px;
  margin-top: 5%;
  width: 90%;
  border-radius: 5px;
  border: 1px solid #ccc;
  display: flex;
`;

export const Send = styled.div`
  left: 0;
  right: 10px;
  margin: 3.5px;
  transform: translateY(-50%);
  cursor: pointer;
`

export const ModalImg = styled.div`
    flex: 0 0 auto;
    text-align: center;
    padding: 5px;
    margin: 0 10px;
    min-width: 130px;
    div {
      width: 130px; 
      height: 130px;
      display: flex; 
      flex-direction: column; 
      justify-content: center; 
      align-items: center;
      margin: 0 auto; 
      border-radius: 5px;
      background-color: rgba(217, 217, 217, 0.3);
      img {
        width: 20%;
      }
    }
`

export const ModalImage = styled.div`
    flex: 0 0 auto;
    text-align: center;
    padding: 5px;
    margin: 0 10px;
    min-width: 130px;
    div {
      width: 130px; 
      height: 130px;
      display: flex; 
      flex-direction: column; 
      justify-content: center; 
      align-items: center;
      margin: 0 auto; 
      border-radius: 5px;
      background-color: rgba(217, 217, 217, 0.3);
      img {
        width: 30%;
      }
    }
`

export const ModalButton = styled.button`
  padding: 8px 20px;
  color: white;
  background-color: #ACAACC;
  border: none;
  margin-top: 5%;
  margin-bottom: 2%;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #8C84B0;
  }
  &:disabled {
    background-color: #d3d3d3;
    cursor: not-allowed;
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

export const StoryWrap = styled.div`
  width: 90%;
  padding: 3%;
  display: flex;
  position: relative;
  border-radius: 5px;
  border: 1px solid #DCDCDC;
  margin-left: 5%;
  flex-direction: column;
`

export const CardContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;  
  justify-content: space-around;
  overflow-x: auto; 
  width: 100%;       
  padding-top: 20px;   
`;

export const SelectCard = styled.div`
  width: 30%;
  background: #FFFFFF;
  border: 1px solid #ddd;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
    
`;

export const SelectBox = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  div {
    width: 80%;
    height: 170px;
    border: 2px solid #F6F6F6;
    border-radius: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  img {
    width: 30%;
    max-height: 100%;
  }
`;

export const StoryField = styled.input`
  width: 90%;
  padding: 10px;
  resize: none;
  margin: 10px;
  font-size: 1.4rem;
  border: none;
  border-radius: 5px;
  background: #F6F6F6;
  color: #777777;
  text-align: center;
  height: 100px;
  outline: none; 
  &:focus {
    box-shadow: inset 0 0 0 2px #777777;
  }
  &::placeholder {
    color: #777777;
  }
  @media(max-width: 780px){
    font-size: 1.3rem;
  }
`;

export const Story = styled.div`
  width: 90%;
  padding: 10px;
  resize: none;
  margin: 10px;
  font-size: 0.8vw;
  border: none;
  border-radius: 5px;
  background: #F6F6F6;
  color: #333333;
  text-align: center;
  height: 100px;
  outline: none; 
`;

export const ImageList = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 100%;
    height: 170px;
    border: 2px solid #F6F6F6;
    border-radius: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const CloseButton = styled.div`
  position: absolute;
  cursor: pointer;
  top: 8%;
  right: 10%;
  width: 34px;
  height: 34px;
`;

export const InLineButton = styled.div`
  display: flex;
  gap: 2%;
  width: 74%;
  margin-left: 13%;
  justify-content: space-between;
`;

export const FeedbackButton = styled.button`
  padding: 10px 65px;
  color: white;
  background-color: #ACAACC;
  border: none;
  margin-top: 5%;
  width: 100%;
  margin-bottom: 2%;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #8C84B0;
  }
`;

export const FeedbackLine = styled.div`
    margin: 2%;
    width: 80%;
    margin-left: 10%;
    display: flex;
    gap: 0;
    flex-direction: row;
    justify-content: space-between;
    @media (max-width: 768px) {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
`

export const ImageListBox = styled.div`
    flex: 0 0 auto;
    text-align: center;
    min-width: 200px; 
    border-radius: 1.3rem;
    border: 1px solid #ACAACC;
    width: 200px;
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    img{
        width: 40%;
        cursor: pointer;
    }
    @media (max-width: 768px) {
        width: 150px;
        height: 150px;
    }
`

export const FirstBox = styled.div`
    flex: 0 0 auto;
    text-align: center;
    width: auto;
    height: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.5vw;
    margin: 0 auto;
    @media (max-width: 768px) {
        width: 150px;
        height: 150px;
    }
    img{
     height: 70px;
    }
`

export const SecondBox = styled.div`
    flex: 0 0 auto;
    text-align: center;
    border-radius: 1.3rem;
    box-shadow: inset 0 0 0 4px #969696;
    background-color: rgba(217, 217, 217, 0.14);
    font-size: 1.2vw;
    font-family: arial;
    width: 600px;
    height: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    @media (max-width: 768px) {
        width: 150px;
        height: 150px;
    }
`

export const FeedbackContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px 0;
  margin-top: 5%;
  width: 80%;
  margin-left: 10%;
`;

export const HalfLine = styled.div`
  flex-grow: 1;
  height: 2px;
  background-color: #ccc;
`;

export const FeedbackText = styled.div`
  margin: 0 20px;
  white-space: nowrap;
  font-size: 1.2vw;
`;

export const HintWrapper = styled.div`
    flex: 0 0 auto;
    text-align: center;
    min-width: 220px; 
    border-radius: 1.4rem;
    border: 2px solid rgba(244, 244, 244, 1);
    width: 55%;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 auto;
    @media (max-width: 768px) {
        width: auto;
        max-width: 90%;
        height: auto;
    }
`

export const HintBox = styled(Form)`
    width: 75%;
    height: 37px; 
    font-size: 17px; 
    border-radius: 7px;
    border: 1.5px solid #ACAACC;
    margin: 2%;
    display: flex;
    align-items: center;
    position: relative;
    padding-left: 15px;
    
    .form-control {
        height: 35px; 
        font-size: 1.5rem; 
        min-width: 100%;
        border-radius: 5px;
        padding-right: 10px; 
        padding-left: 10px;
      @media(max-width: 780px){
        font-size: 1.3rem;
      }
    }
`;

export const HintWrapper2 = styled.div`
  flex: 0 0 auto;
  text-align: center;
  margin: 0 auto;
  border-radius: 1.4rem;
  border: 2px solid rgba(244, 244, 244, 1);
  width: 100%;
  padding: 1rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
      @media (max-width: 768px) {
        width: 70%;
    }
`;

export const HintGroup2 = styled.div`
  display: flex;
  flex-direction: column;  /* Row에서 Column으로 변경 */
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  margin-top: 2%;
`;

export const HintBox2 = styled.div`
  width: 75%;
  font-size: 17px;
  border-radius: 7px;
  border: 1.5px solid #ACAACC;
  margin: 2%;
  display: flex;
  align-items: center;
  position: relative;
  padding: 15px;
  min-height: 37px;  /* 최소 높이 설정 */
  height: auto;  /* 높이를 자동으로 설정 */

  .form-control {
    width: 100%;  /* 넓이를 100%로 설정 */
    font-size: 1.5rem;
    border-radius: 5px;
    padding: 10px;
        padding-right: 10px; 
        padding-left: 10px;/* 텍스트 영역의 크기 조정 비활성화 */
  }
  
  /* 텍스트가 길어질 경우 줄바꿈 허용 */
  word-wrap: break-word;
  white-space: pre-wrap;
`;



export const Label = styled.div`
  font-size: 1.2rem;
  background-color: #FED7D7;
  font-weight: bold;
  border-radius: 10px;
  color: #333;
  width: 90px;
  height: auto;
  padding: 4px;
`;
export const HintGroup = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 100%;
`;


export const Box = styled.div`
    flex: 0 0 auto;
    text-align: center;
    min-width: 200px; 
    border-radius: 1.3rem;
    border: 3px solid #eee;
    width: 200px;
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    img{
        width: 40%;
        cursor: pointer;
    }
    @media (max-width: 768px) {
        width: 150px;
        height: 150px;
    }
`

export const TemplateBox = styled.div`
    flex: 0 0 auto;
    text-align: center;
    min-width: 200px; 
    width: 200px;
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    img{
        width: 100%;
        cursor: pointer;
        border-radius: 1.3rem;
        border: 3px solid #eee;
    }
    @media (max-width: 768px) {
        width: 150px;
        height: 150px;
    }
`

export const HintToast = styled.div` 
    width: 75%;
    minWidth: 200px;
    height: 37px; 
    font-size: 17px; 
    flex-direction: row;
    border-radius: 7px;
    gap: 5%;
    margin: 2%;
    display: flex;
    align-items: center;
    position: relative;
    padding-left: 15px;
    border: 1.3px solid #B40000;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    img{
      max-width: 28px;
    }
`;


export const Upload = styled.img`
    width: 20%;
    height: auto;
    text-align: center;
    align-items: center;
    cursor: pointer;
    @media(max-width: 780px){
      width: 30%;
    }
`
;

export const FeedImage = styled.div`
    flex: 0 0 auto;
    text-align: center;
    min-width: 180px; 
    width: 180px;
    height: 180px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    img{
        width: 100%;
        border-radius: 1.3rem;
        border: 2px solid #ACAACC;
    }
    @media (max-width: 768px) {
        width: 150px;
        height: 150px;
    }
`
export const FeedTitle = styled.h1`
    display: flex;
    font-size: 1.7rem;
    max-width: 30%;
    margin-left: 15%;
    position: relative;
`;

export const StoryList = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  border: 2px solid #F6F6F6;
  border-radius: 1rem;

  img {
    max-width: 95%;
    max-height: 100%;
    border-radius: 1rem;
    object-fit: cover; 
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const Border = styled.div`
    border-radius: 1.4rem;
    border: 2px solid rgba(244, 244, 244, 1);
    flex: 0 0 auto;
    width: 70%;
    margin-left: 15%;
    margin-bottom: 5%;
`

export const StuTitle = styled.h1`
    display: flex;
    font-size: 1.7rem;
    max-width: 30%;
    margin-left: 5%;
    position: relative;
`;