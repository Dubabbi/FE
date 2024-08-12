import React from "react";
import * as S from "./SelfStudyStyle";
import styled from "styled-components";
import load from "/src/assets/image/loading.svg";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 40%;
  min-width: 250px;
  height: 260px;
  border-radius: 10px;
  margin-top: 200px;
  background-color: #d9d9d9b3;
  h2 {
    font-size: 2.4rem;
  }
  img {
    height: 50px;
    margin-left: 15px;
  }
  p {
    font-size: 1.5rem;
  }
`;

export const Loading = ({ title, subtitle }) => (
  <Container>
    <S.rowContainer style={{ marginBottom: "25px" }}>
      <h2>{`${title} 생성 중...`}</h2>
      <img src={load} alt="" />
    </S.rowContainer>
    <p>잠시만 기다려 주세요!</p>
    <p>{`${subtitle} 생성하고 있어요!`}</p>
  </Container>
);
