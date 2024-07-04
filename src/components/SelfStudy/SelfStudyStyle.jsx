import styled from "styled-components";

export const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  h1 {
    font-size: 2.4rem;
    color: #2f327d;
    margin-top: 110px;
  }
`;

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 60px;
  width: 100%;
  height: 90vh;
  justify-content: space-evenly;
  align-items: center;
`;

export const LevelContainer = styled.div`
  width: 45%;
  min-width: 380px;
  padding: 45px;
  border-radius: 40px;
  flex-direction: column;
  display: flex;
  text-align: center;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  margin-top: 60px;
`;

export const rowContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const level = styled.div`
  display: flex;
  width: 180px;
  height: 170px;
  background-color: #fed7d7;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  font-size: 1.7rem;
  margin: 10px 20px;
  img {
    height: 80px;
  }
  @media (max-width: 980px) {
    width: 140px;
    height: 130px;
    margin: 10px 10px;
  }
`;

export const SecondTitle = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 20px;
`;

export const CategoryContainer = styled.div`
  width: 800px;
  padding: 45px;
  border-radius: 40px;
  flex-direction: column;
  display: flex;
  // align-items: center;
  text-align: center;
  // justify-content: space-between;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  // overflow-x: auto;
  margin-top: 60px;
  @media (max-width: 980px) {
    width: 80%;
    min-width: 380px;
  }
`;

export const Category = styled.div`
  font-size: 1.7rem;
  // margin: 10px;
  margin-bottom: 15px;
  a {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  p {
    margin-top: 15px;
  }
`;

export const overContainer = styled.div`
  display: flex;
  overflow-x: auto;
`;
