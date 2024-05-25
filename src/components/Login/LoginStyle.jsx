//LoginStyle.jsx
import styled from 'styled-components';

export const AppContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const Logo = styled.div`
  font-size: 2.6rem;
  font-weight: bold;
  text-align: center;
  color: #262626;
  display: flex;
  flex-direction: column; // 수직 스택을 위해 방향 변경
  justify-content: center; // 수직 중심 정렬
  align-items: center; // 가로 중심 정렬
  width: 100%; // 전체 너비 사용

  img {
    height: 35%; // 로고 이미지의 높이를 조절
    margin-top: 5%;
  }
`;

/*
export const Logo = styled.div`
  font-size: 2.6rem;
  font-weight: bold;
  text-align: center;
  color: #262626;
  display: flex;
  align-items: center;
`

export const LoginWrapper = styled.div`
  padding-top: 0.5%;  // 위쪽 패딩
  padding-bottom: 0.5%;  // 아래쪽 패딩
  padding-left: 0;  // 좌측 패딩 제거
  padding-right: 0;  // 우측 패딩 제거
`;
*/

export const LoginWrapper = styled.div`
  width: 100%; // 전체 너비를 사용
  height: 100vh; // 뷰포트 높이와 동일하게 설정
  display: flex;
  justify-content: flex-end; // 자식 요소를 오른쪽으로 정렬
  align-items: center; // 수직 중심 정렬
  padding: 0; // 패딩 제거
`;

/*
export const Page = styled.div`
  position: relative;
  width: 700px;
  margin: 0% auto 0; 
  flex-direction: column;
  border-radius: 2rem; 
  height: 98vh;
  background-color: rgba(255, 255, 255, 0.9);
  box-shadow: 0 0.4rem 0.8rem rgba(0, 0, 0, 0.1);
  
  @media (max-width: 1024px) { // 태블릿
    padding: 0 2rem; 
    height: auto; 
    margin-top: 3%; 
    min-height: 550px;
  }

  @media (max-width: 768px) { // 중간 크기 모바일
    padding: 0 1.5rem; // 좀 더 적은 패딩
    margin-top: 7%; // 상단 여백 더 크게
  }

  @media (max-width: 480px) { // 작은 모바일
    padding: 5 5rem; 
    margin-top: 10%; 
    font-size: 0.8rem; 
    border-radius: 1rem; 
  }
`;*/
export const Page = styled.div`
  position: fixed; // 고정 위치
  right: 0; // 화면의 오른쪽에 고정
  top: 0; // 화면의 상단부터 시작
  width: 700px; // 고정 너비
  height: 98vh; // 높이를 뷰포트의 98%로 설정
  margin: 0; // 자동 마진 제거
  flex-direction: column;
  border-radius: 5rem;
  background-color: rgba(255, 255, 255, 0.9);
  box-shadow: 0 0.4rem 0.8rem rgba(0, 0, 0, 0.1);
  
  @media (max-width: 1024px) { // 태블릿
    padding: 0 2rem;
    min-height: 550px;
  }

  @media (max-width: 768px) { // 중간 크기 모바일
    padding: 0 1.5rem;
    margin-top: 7%;
  }

  @media (max-width: 480px) { // 작은 모바일
    padding: 0 1rem;
    font-size: 0.8rem;
    border-radius: 1rem;
  }
`;

export const TitleWrap = styled.div`
  font-size: 2.6rem;
  padding-top: 25%;
  margin-bottom: 7%;
  font-weight: bold;
  text-align: center;
  color: #262626;
  letter-spacing: 0px;
  line-height: 1.5;
`;


export const LostPwMessage = styled.div`
  position: relative;
  margin-top: 8px;
  cursor: pointer;
  width: 60%;
  color: red;
  font-size: 14px;
  text-align: right;
`;

export const InputTitle = styled.div`
  margin-left: 21%;
  max-width: 60%;
  margin-bottom: 1%;
  font-size: 1.5rem;
`

export const InputWrap = styled.div`
  display: flex;
  border-radius: 10px;
  padding: 1.3rem;
  margin-bottom: 4%;
  margin-left: 20%;
  max-width: 60%;
  background-color: #EFF0F2;
  border: 2px solid #e2e0e0;

  &:focus-within {
    border: 2px solid #ACAACC;
  }

  @media (max-width: 500px) { // 작은 모바일
    padding: 1.2rem;
  }

`;

export const Input = styled.input`
  width: 100%;
  outline: none;
  border: none;
  height: 2.5rem;
  font-size: 1.5rem;
  font-weight: 400;

  &::placeholder {
    color: #aaaaaa;
  }
  
`;

export const BottomButton = styled.button`
  margin-left: 20%;
  width: 60%;
  padding: 1.5rem;
  height: 5.5rem;
  border: none;
  font-weight: bold;
  border-radius: 10px;
  background-color: #ACAACC;
  color: white;
  font-size: 1.8rem;
  cursor: pointer;

  @media (max-width: 500px) { // 작은 모바일
    padding: 1.2rem;
  } 
  &:hover {
    background-color: #8C84B0;
}
`;


export const ErrorMessageWrap = styled.div`
  position: fixed;
  margin-left: 20%;
  width: 60%;
  margin-top: 1%;
  color: red;
  font-size: 1.3rem;
`;


export const NoAccount = styled.div`
  display: flex;
  justify-content: space-around;  // 각 항목 사이에 균일한 공간 배분
  align-items: center;           // 세로 중심 정렬
  margin-top: 4%;
  margin-bottom: 2%;
  max-width: 60%;
  margin-left: 20%;
  font-size: 1.3rem;             // 폰트 크기 유지
  color: white;                  // 폰트 색상 지정 (선택적)
  @media (max-width: 500px) {   // 작은 모바일
    margin-top: 8%;
  } 
  p {
    color: #ACAACC;              // 링크 색상 조정
    }
  a {
    color: #ACAACC;              // 링크 색상 조정
    text-decoration: none;       // 밑줄 제거
    font-weight: bold;           // 폰트 굵기
    &:hover {
      text-decoration: underline; // 호버 시 밑줄 추가
    }
    
  }
`

export const UnderlinedText = styled.span`
  text-decoration: underline;
`;
