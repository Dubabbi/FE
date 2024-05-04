//LoginStyle
import styled from 'styled-components';

export const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const LoginWrapper = styled.div`
  justify-content: center;
  align-items: center;
  background-color: #d5d8df;
  padding: 5.5%;
`;

export const Page = styled.div`
  position: relative;
  max-width: 480px;
  margin: 0% auto 0; // 좌우 중앙 정렬 및 상단 여백 조정
  flex-direction: column;
  border-radius: 2rem; 
  justify-content: center;
  height: 600px;
  background-color: rgba(255, 255, 255, 0.9);
  box-shadow: 0 0.4rem 0.8rem rgba(0, 0, 0, 0.1);
  
  @media (max-width: 1024px) { // 태블릿
    padding: 0 2rem; 
    height: auto; 
    margin-top: 5%; // 상단 여백 증가
    min-height: 550px;
  }

  @media (max-width: 768px) { // 중간 크기 모바일
    padding: 0 1.5rem; // 좀 더 적은 패딩
    margin-top: 10%; // 상단 여백 더 크게
  }

  @media (max-width: 480px) { // 작은 모바일
    padding: 5 5rem; 
    margin-top: 10%; 
    font-size: 0.8rem; 
    border-radius: 1rem; 
  }
`;

export const TitleWrap = styled.div`
  font-size: 2.6rem;
  font-weight: bold;
  margin-bottom: 4%;
  margin-left: 12%;
  color: #262626;
  letter-spacing: 0px;
  line-height: 1.5;
`;


export const LostPwMessage = styled.div`
  position: relative;
  margin-top: 8px;
  cursor: pointer;
  width: 90%;
  color: red;
  font-size: 14px;
  text-align: right;
`;


export const InputWrap = styled.div`
  display: flex;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 5%;
  margin-left: 10%;
  max-width: 80%;
  background-color: #EFF0F2;
  border: 1px solid #e2e0e0;

  &:focus-within {
    border: 1px solid #4B518F;
  }

  @media (max-width: 500px) { // 작은 모바일
    padding: 1.2rem;
  }

`;

export const Input = styled.input`
  width: 100%;
  outline: none;
  border: none;
  height: 15%;
  font-size: 1.5rem;
  font-weight: 400;

  &::placeholder {
    color: #666666;
  }
  
`;

export const BottomButton = styled.button`
  margin-left: 10%;
  width: 80%;
  padding: 1.5rem;
  height: 9%;
  border: none;
  font-weight: bold;
  border-radius: 10px;
  background-color: #4B518F;
  color: white;
  font-size: 1.8rem;
  cursor: pointer;

  @media (max-width: 500px) { // 작은 모바일
    padding: 1.2rem;
  } 
  &:hover {
    background-color: #5D639A;
}
`;

export const ErrorMessageWrap = styled.div`
  position: fixed;
  padding-left: 5%;
  margin-top: 1%;
  width: 90%;
  color: red;
  font-size: 1.3rem;
`;

export const NoAccount = styled.div`
  margin-top: 4%;
  margin-bottom: 2%;
  max-width: 100%;
  cursor: pointer;
  text-align: center; 
  @media (max-width: 500px) { // 작은 모바일
    margin-top: 8%;
  } 
  p {
    font-weight: bold;
    display: inline; 
    font-size: 1.3rem;
  }
  a {
    font-size: 1.3rem;
  }
`

export const UnderlinedText = styled.span`
  text-decoration: underline;
`;

