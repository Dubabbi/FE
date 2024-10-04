// WordStyle.jsx

import styled from 'styled-components';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export const LessonWrapper = styled.div`
    color: black;
    max-width: 1000px;
    margin: 0 auto; 
    padding-top: 3%;
    min-height: 100vh;
`;

export const Section = styled.section`
  text-align: center; 
  padding: 50px 0;
  align-items: center;
  margin-bottom: 2%;
  h1{
    font-size: 2.6rem;
    color: #2F327D;
  }
  @media (max-width: 1024px) {
    h1{
        font-size: 2.4rem;
    }
  }
  @media (max-width: 768px) {
    h1{
        font-size: 1.8rem;
    }
  }
`

export const Line = styled.div`
    margin-bottom: 2%;
    width: 68%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding-right: 20px;
    @media (max-width: 768px) {
        display: flex;
        flex-direction: column;
    }
`

export const Title = styled.h2`
    display: flex;
    margin-top: 10px;
    margin-left: 2px;
    font-size: 1.2vw;
    @media (max-width: 768px) {
        margin-bottom: 5%;
        font-size: 2.5vw;
    }
  }
`
export const SecondTitle = styled.h2`
    display: flex;
    margin-top: 10%;
    margin-left: 2px;
    margin-bottom: 2%;
    font-size: 1.2vw;
    @media (max-width: 768px) {
        margin-bottom: 5%;
        font-size: 2.5vw;
    }
`
export const WordList = styled.div`
    width: 100%;
    padding: 3%;
    border-radius: 40px;
    flex-direction: row;
    display: flex;
    align-items: center;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;


export const StyledButton = styled(Button)`
    position: absolute;
    top: 50%;
    left: 8px; 
    transform: translateY(-50%);
    height: 30px; 
    width: 30px; 
    font-size: 1rem; 
    background-color: #fefefe; 
    border-radius: 50px; 
    display: flex;
    justify-content: center;
    align-items: center;
    
    &:hover {
        background: #F8F9FA;
        transition: 0.5s;
      }
`;


export const StyledForm = styled(Form)`
    width: 320px;
    height: 37px; 
    font-size: 16px; 
    border-radius: 7px;
    border: 1px solid #ACAACC;
    display: flex;
    align-items: center;
    position: relative;
    
    .form-control {
        margin-left: 40px;
        height: 35px; 
        font-size: 1.5rem; 
        border-radius: 5px;
        padding-right: 80px; 
        padding-left: 10px;
    }
`;

export const ChoiceBox = styled.div`
    display: flex;
    position: relative;
    justify-content: flex-start;
    gap: 3%;
    width: 90%;
    margin-left: 5%;
    padding-bottom: 2%;
    overflow-x: auto;
    white-space: nowrap;

    /* 스크롤바 스타일 */
    &::-webkit-scrollbar {
        height: 8px;
    }

    &::-webkit-scrollbar-track {
        background: #f0f0f0;
    }

    &::-webkit-scrollbar-thumb {
        background-color: lightgrey;
        border-radius: 10px;
    }
`;

export const Word = styled.div`
    flex: 0 0 auto;
    text-align: center;
    padding: 5px;
    margin: 0 5px;
    min-width: 130px; 

    img {
        width: 130px; 
        height: 130px;
        display: block;
        margin: 0 auto;
        border-radius: 7px;
        border: 5px solid #FEEAFA;
        border-radius: 10px;
    }

    div {
        width: 130px;
        height: 130px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0 auto;
    }
    
    h2{
     margin-top: 7px;
     font-size: 1vw;
    }

    @media (max-width: 768px) {
        h2{
        font-size: 2.5vw;
        }
    }
`;


export const AddWord = styled.div`
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
        border-radius: 10px; 
        border: 5px solid #FEEAFA;

        img {
            width: 40%;

        }
    }
`;

export const AddImage = styled.div`
    flex: 0 0 auto;
    text-align: center;
    padding: 5px;
    margin-top: 20%;
    margin-left: 12%;
    min-width: 170px;
    overflow-x: auto;
    flex: 1;
    div {
        width: 200px; 
        height: 200px;
        display: flex; 
        flex-direction: column; 
        justify-content: center; 
        align-items: center;
        margin: 0 auto; 
        border-radius: 10px; 
        border: 5px solid #FEEAFA;

        img {
            width: 40%;
        }
    }
    
    &::-webkit-scrollbar {
        width: 9px;
    }

    &::-webkit-scrollbar-track {
        background: #f1f1f1;
    }

    &::-webkit-scrollbar-thumb {
        background: #888;
        border-radius: 10px;
    }

    &::-webkit-scrollbar-thumb:hover {
        background: #555;
    }
`;


export const Dropdown = styled.div`
    position: absolute;
    width: 22.5%;
    min-width: 320px;
    margin-left: 23.8%;
    height: auto; 
    font-size: 10px; 
    border-radius: 7px;
    z-index: 1;
    border: 1px solid #ACAACC;
    align-items: center;
    text-align: left;
    padding-left: 1%;
    background-color: #fff;
      @media (max-width: 768px) {
        margin-left: 0px;
  }
`;