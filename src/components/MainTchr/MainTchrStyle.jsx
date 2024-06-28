import styled from "styled-components";

export const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5;
`;

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 60px; // 내비게이션바 높이에 따라 조절
  width: 100%;
  height: 90vh;
  justify-content: space-evenly;
  align-items: center;
`;

export const LessonContainer = styled.div`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  border-radius: 70px;
  padding: 25px;
  box-shadow: 0 0.4rem 0.8rem rgba(0, 0, 0, 0.1);
`;

export const rowContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: ${(props) => props.width};
  margin-top: 10px;
`;

export const SectionTitle = styled.div`
  font-size: 2rem;
  font-family: "Poppins", sans-serif;
  font-weight: bold;
  color: #2f327d;
  display: flex;
  align-items: center;
`;

export const arrowContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  width: 45px;
  height: 30px;
  border: 1px solid #e9e9e9;
  img {
    height: 12px;
  }
`;

export const TemplateCard = styled.div`
  flex: 1;
  height: 170px;
  border: 2px solid #bbb;
  border-radius: 30px;
  margin: 10px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  img {
    height: 35px; // 로고 이미지의 높이를 조절
    margin-top: 3%;
    margin-bottom: 20px;
  }
`;

export const TemplateTitle = styled.div`
  font-size: 1.6rem;
  font-family: "DM Sans", sans-serif;
  font-weight: medium;
  color: #050b20;
`;

export const TemplateDescription = styled.div`
  font-size: 1.2rem;
  font-family: "DM Sans", sans-serif;
  color: #050b20;
  margin-top: 15px;
  margin-bottom: 20px;
`;

export const MatchingStdContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: "DM Sans", sans-serif;
  font-size: 1.8rem;
  margin-top: 20px;
  margin-bottom: 20px;
  img {
    height: 80px; // 로고 이미지의 높이를 조절
    border-radius: 100px;
    border: 4px solid #acaacc;
    margin-bottom: 18px;
  }
`;

export const ImgContainer = styled.div`
  position: relative;
  margin-top: 20px;
  margin-bottom: 20px;
  height: 130px;
  width: 230px;
  img {
    border-radius: 20px;
    border: 4px solid #feeafa;
  }
`;

export const CardImg1 = styled.img`
  height: 100px;
  margin: 5px;
  margin-top: 15px;
`;

export const CardImg2 = styled.img`
  position: absolute;
  height: 130px;
  top: 0px;
  left: 45px;
`;

export const addStd = styled.img`
  height: 30px;
  margin-left: 10px;
`;
