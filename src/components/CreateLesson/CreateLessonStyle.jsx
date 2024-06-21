import styled from "styled-components";
import Form from 'react-bootstrap/Form';

export const Input = styled(Form)`
    margin-left: 5%;
    width: 40%;
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
  font-weight: bold;
  border-radius: 7px;
  background-color: #ACAACC;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;

  @media (max-width: 1024px) {
    padding: 1rem;
    margin-top: 1.5%;
    height: 4rem;
    margin-left: 15%;
    width: 70%;
  } 
  &:hover {
    background-color: #8C84B0;
}
`;