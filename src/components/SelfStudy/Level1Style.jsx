import styled from "styled-components";

export const SentenceContainer = styled.div`
  width: 750px;
  height: 90px;
  border: 2px solid #acaacc;
  border-radius: 12px;
  margin: 25px 10px;
  padding: 0px 50px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  overflow-x: auto;
  @media (max-width: 980px) {
    width: 80%;
    min-width: 380px;
    padding: 0px 30px;
  }
`;

export const SecondTitle = styled.h2`
  font-size: 2rem;
  width: 15%;
  min-width: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    height: 40px;
    margin-bottom: 10px;
    margin-right: 5px;
  }
`;

export const wordContainer = styled.div`
  width: 750px;
  display: flex;
  flex-direction: column;
  overflow-x: auto;
  @media (max-width: 980px) {
    width: 75%;
    min-width: 380px;
  }
`;

export const WordBox = styled.div`
  display: flex;
  min-width: 130px;
  height: 50px;
  background-color: #feeafa;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  margin: 10px;
  border: ${(props) =>
    props["data-clickstate"] ? "3px solid #4B518F" : "none"};
`;

export const imgContainer = styled.img`
  display: inline-block;
  height: 40%;
  margin: 20px 0;
  border-radius: 20px;
`;
