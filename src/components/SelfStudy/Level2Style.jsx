import styled from "styled-components";

export const imgContainer = styled.img`
  width: 260px;
  border-radius: 20px;
  margin-right: 20px;
`;

export const rowContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 90%;

  @media (max-width: 660px) {
    display: inline-block;
    text-align: center;
  }
`;

export const questionContainer = styled.div`
  width: 300px;
  display: inline-block;
  margin-top: 10px;
`;

export const blankBox = styled.div`
  display: flex;
  width: 150px;
  height: 50px;
  background-color: ${(props) => (props.clickstate ? "none" : "#acaacc")};
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  margin: 10px;
  border: ${(props) => (props.clickstate ? "2px solid #acaacc" : "none")};
`;

export const num = styled.div`
  text-align: center;
  width: calc(1em / 0.7);
  height: calc(1em / 0.7);
  color: #acaacc;
  padding-top: 2px;
  border-radius: 50%;
  font-size: 1.8rem;
  border: 2px solid #acaacc;
`;

export const list = styled.div`
  width: 150px;
  height: 50px;
  border: 2px solid #acaacc;
  border-radius: 12px;
  margin: 10px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.8rem;
`;

export const answerBox = styled.div`
  display: flex;
  width: 150px;
  height: 50px;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  margin: 10px;
  border: ${(props) =>
    props.clickstate ? "2px solid #1400FF" : "2px solid #FF0000"};
`;

export const SentenceContainer = styled.div`
  width: 45%;
  height: 75px;
  border: ${(props) =>
    props.answerType ? "2px solid #1400FF" : "2px solid #FF0000"};
  border-radius: 12px;
  margin: 30px 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 1.8rem;
  justify-content: center;
  img {
    height: 40px;
    margin-bottom: 10px;
    margin-right: 5px;
  }
`;

export const hintBubble = styled.div`
  position: absolute;
  background: #eeeef5;
  border-radius: 12px;
  padding: 10px;
  left: 38%;
  top: 273px;
  width: 270px;
  font-size: 1.8rem;
  opacity: ${(props) => (props.state ? "100%" : "0%")};
  display: flex;
  flex-direction: column;
  align-items: center;

  &:after {
    content: "";
    position: absolute;
    top: 0;
    left: 30%;
    width: 0;
    height: 0;
    border: 26px solid transparent;
    border-bottom-color: #eeeef5;
    border-top: 0;
    margin-left: -26px;
    margin-top: -26px;
  }
`;

export const hint = styled.div`
  display: flex;
  flex-direction: column;
  width: 95%;
  padding: 10px;
  border-radius: 12px;
  align-items: center;
  font-size: 1.5rem;
  margin: 10px;
  background-color: #ffffff;
  border: 1px solid #9a9a9acc;
`;

export const hintClose = styled.div`
  width: 60px;
  height: 25px;
  border-radius: 5px;
  font-size: 1.2rem;
  line-height: 27px;
  text-align: center;
  background-color: #4b518f;
  color: #ffffff;
  margin-top: 10px;
  border: 1px solid #9a9a9acc;
`;
