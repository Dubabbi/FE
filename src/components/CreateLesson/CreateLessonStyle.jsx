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

export const Box = styled.div`
    flex: 0 0 auto;
    text-align: center;
    min-width: 200px; 
    border-radius: 1.3rem;
    border: 5px solid #ACAACC;
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
`;

export const TemplateList = styled.div`
    display: flex;
    position: relative;
    justify-content: flex-between;
    gap: 3%;
    width: 90%;
    margin-left: 5%;
    padding-bottom: 2%;
    img{
        width: 18%;
    }
`;

export const SubmitButton = styled.button`
  margin-left: 45%;
  width: 10%;
  padding: 0.8rem;
  margin-top: 1.5%;
  height: 3.8rem;
  border: none;
  border-radius: 6px;
  background-color: #ACAACC;
  color: white;
  font-size: 1.1vw;
  cursor: pointer;
  margin-bottom: 8%;

  @media (max-width: 1024px) {
    padding: 1rem;
    margin-top: 1.5%;
    height: 4rem;
    margin-left: 15%;
    width: 30%;
    margin-left: 35%;
    font-size: 2.6vw;
  } 
  &:hover {
    background-color: #8C84B0;
}
`;

export const Card = styled.div`
  background-color: rgba(217, 217, 217, 0.14);
  width: 56%;
  max-width: 1024px;
  border-radius: 8px;
  margin: 20px auto;
  position: relative;
`;

export const TopTab = styled.div`
  background-color: #969696;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  border-radius: 8px;
  width: fit-content;
  color: #ffffff;
  position: absolute;
  bottom: 100%; 
  left: 8%; 
  transform: translate(-50%, 50%); 
`;

export const Content = styled.div`
  padding: 40px 30px 30px;
  font-size: 1vw;
`;

export const ContentInput = styled.input`
  padding: 40px 30px 30px;
  font-size: 1vw;
  width: 100%; 
  background-color: rgba(217, 217, 217, 0.14);
  border: 2px solid #969696; 
  border-radius: 8px; 
  color: #333;  
  outline: none; 
  &:focus {
    background-color: #ffffff; 
  }
`;

// 배경 흐리게
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

// 모달창 스타일
export const ModalContent = styled.div`
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

export const ModalButton = styled.button`
  padding: 10px 20px;
  color: white;
  background-color: #ACAACC;
  border: none;
  margin-top: 5%;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #8C84B0;
  }
`;