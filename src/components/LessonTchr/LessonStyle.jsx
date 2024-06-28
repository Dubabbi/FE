//LessonStyle.jsx
import styled from 'styled-components';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export const LessonWrapper = styled.div`
    color: black;
    max-width: 1000px;
    margin: 0px auto;
    padding-top: 3%;
`;

export const Section = styled.section`
  padding: 50px 0;
  h1{
    font-size: 1.7vw;
    color: #2F327D;
    text-align: center;
    margin-bottom: 2rem;
  }
  p{
    font-size: 1.1vw;
    text-align: center;
  }
  @media (max-width: 768px) {
    h1{
    font-size: 2.5vw;
    }
    p{
      font-size: 2vw;
    }
  } 
`

export const Line = styled.div`
    margin-bottom: 2%;
    display: flex;
    justify-content: space-between;
    padding-right: 20px;
    flex-direction: row;
`

export const LineStd = styled.div`
    margin-bottom: 2%;
    display: flex;
    justify-content: flex-end;
    padding-right: 20px;
    flex-direction: row;
`

export const Add = styled.div`
    width: 110px;
    height: 37px; 
    font-size: 16px; 
    border-radius: 7px;
    border: 1px solid #ACAACC;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    a {
        color: #777777;
        margin: 0;
        font-family: arial;
        font-size: 1.3rem;
        font-weight: bold;
    }
    &:hover {
    background-color: #F8F9FA;
    cursor: pointer;
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

export const TableColumn = styled.td`
  padding: 1.7% 1.7%;
  font-family: inter;
  font-size: 1.3rem;
  border-right: 1px solid #ccc;
  &:last-child {
    border-right: none;
  }
`;

export const Table = styled.table`
  width: 100%;
  margin: 0 auto;
  border-spacing: 0;
`;

export const TableRow = styled.tr`
  border-bottom: 1px solid #ccc;
  &:nth-child(odd) {
    background-color: #F8F9FA;  // 홀수 행
    &:hover {
        background-color: #eceaea;
        cursor: pointer;
    }
  }

  &:nth-child(even) {
    background-color: #FFFFFF;  // 짝수 행
        &:hover {
        background-color: #eceaea;
        cursor: pointer;
    }
  }

  &:last-child {
    border-bottom: none;
  }
`;