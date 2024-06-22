import styled from "styled-components";
import Form from 'react-bootstrap/Form';

export const WordImage = styled.div`
    width: 100%;
    padding: 3%;
    border-radius: 40px;
    flex-direction: row;
    display: flex;
    align-items: center;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

export const Section = styled.section`
  text-align: center; 
  padding: 50px 0;
  align-items: center;
  margin-bottom: 0%;
  h1{
    font-size: 2.4rem;
    color: #2F327D;
  }
`

export const CardTitle = styled.div`
    align-items: center;
    width: 8%;
    margin-left: 46%;
    margin-bottom: 4%;
    padding: 0.6%;
    border-radius: 7px;
    height: auto;
    background-color: #FEEAFA;
    p{
        font-size: 1.5rem;
    }
`

export const Word = styled.div`
    flex: 0 0 auto;
    text-align: center;
    padding: 5px;
    margin: 0 10px;
    min-width: 200px; 

    img {
        width: 200px; 
        height: 200px;
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
`;


export const WordBoard = styled.div`
    display: flex;
    position: relative;
    justify-content: space-around;
    gap: 3%;
    width: 100%;
    padding-bottom: 2%;
    overflow-x: auto;
    white-space: nowrap;
`;

export const WordList = styled.div`
    width: 50%;
    margin-left: 25%;
    height: 40vh;
    padding: 3%;
    border-radius: 40px;
    flex-direction: row;
    display: flex;
    align-items: center;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

export const ArrowButton = styled.div`
    flex: 0 0 auto;
    flex-direction: row;
    display: flex;
    text-align: center;
    padding: 5px;
    margin: 0 10px;
    min-width: 50px; 
    align-items: center;

    img {
        width: 50px; 
        height: 50px;
        display: block;
        align-items: center;
        margin: 0 auto;
        border-radius: 100px;
    }
`;

export const BottomButton = styled.button`
  margin-left: 43%;
  width: 14%;
  padding: 0.7rem;
  height: 4rem;
  border: none;
  font-weight: bold;
  border-radius: 5px;
  background-color: #ACAACC; 
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  &:hover {
    background-color: #8C84B0;
}
`;

export const ImageWrap = styled.div`
    display: flex;
    justify-content: space-between;
    position: fixed;
    left: 2%;
    top: 1%;
    width: 100%;
    padding: 20px;

    img {
        max-width: 30%;
    }
    a {
        width: 20%;
        margin-top: 4%;
    }
`;

export const SecondTitle = styled(Form)`
    margin-left: 23%;
    width: 56%;
    height: 37px; 
    font-size: 1.8rem; 
    margin-bottom: 1%;
    display: flex;
    align-items: center;
    position: relative;
`   

export const Title = styled(Form)`
    margin-left: 22%;
    width: 56%;
    height: 37px; 
    font-size: 17px; 
    border-radius: 7px;
    border: 1px solid #ACAACC;
    margin-bottom: 2%;
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
    }
`;

export const WordName = styled(Form)`
    margin-left: 23%;
    min-width: 275px;
    width: 39%;
    height: 37px; 
    font-size: 16px; 
    border-radius: 7px;
    border: 1px solid #ACAACC;
    margin-bottom: 2%;
    display: flex;
    align-items: center;
    position: relative;
    
    .form-control {
        margin-left: 8px;
        min-width: 100%;
        height: 35px; 
        font-size: 1.5rem; 
        border-radius: 5px;
        padding-right: 10px; 
        padding-left: 10px;
    }
`;

export const AboutWord = styled.textarea`
    margin-left: 23%;
    min-width: 277px;
    width: 39%;
    height: 20vh; 
    font-size: 16px; 
    border-radius: 7px;
    border: 1px solid #ACAACC;
    margin-bottom: 2%;
    display: flex;
    align-items: center;
    position: relative;
    resize: none;
    outline: none;
    padding-right: 1p8x; 
    padding-left: 18px;    
    padding-top: 10px; 
    padding-bottom: 10px;
    
    .form-control {
        height: 35px; 
        font-size: 1.5rem; 
        border-radius: 5px;
        whiteSpace: pre-wrap
    }
        
    &::placeholder { 
        color: #777777;
        font-family: arial;
        font-size: 1.5rem; 
    }

`;

export const FileName = styled.div`
  margin-right: 0px;
  margin-top: 1.5%;
  color: white;
  font-size: 1.2rem;
  font-family: arial;
  cursor: pointer;
}
`;

export const FileButton = styled.button`
  width: 100px;
  padding: 0.5rem;
  height: 3rem;
  margin-left: 22.5%;
  border: none;
  margin-top: 1.5%;
  border-radius: 5px;
  background-color: #ACAACC;
  color: white;
  font-size: 1.2rem;
  font-family: arial;
  cursor: pointer;

  @media (max-width: 1024px) {
    width: 100px; 
  } 
  &:hover {
    background-color: #8C84B0;
}
`;

export const Box = styled.div`
    justify-content: center;
    position: relative;
    width: 30%;
    margin-left: 17%;
`

export const SecondBox = styled.div`
    justify-content: center;
    position: relative;
    width: 70%;
    @media (max-width: 1024px) {
        margin-left: 7%;
    } 
`

export const Line = styled.div`
    margin-bottom: 2%;
    display: flex;
    justify-content: space-around;
    flex-direction: row;
    @media (max-width: 1024px) {
        display: flex;
        flex-direction: column;
    } 
    
`