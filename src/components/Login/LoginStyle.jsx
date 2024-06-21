//LoginStyle.jsx
import styled from 'styled-components';

export const AppContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  background-color: #ACAACC;
  @media (max-width: 768px) {
    justify-content: center;
  }
`;

export const Logo = styled.div`
  font-size: 3rem;
  font-weight: bold;
  text-align: center;
  color: #262626;
  display: flex;
  flex-direction: column; 
  justify-content: center; 
  align-items: center; 
  width: 100%; 
  img {
    width: 55%;
    height: auto;
    margin-top: 7%;
  }
  
  @media (max-width: 1024px) { 
    height: 20%;
    margin-top: 20%;
    max-width: 40%; 
    img {
      width: 70%;
    }
  }
  @media (max-width: 768px) { 
    display: none; 
  }
`;

export const LoginWrapper = styled.div`
  width: 100%; 
  height: 100vh; 
  display: flex;
  justify-content: flex-end; 
  align-items: center; 
  padding: 0;

  @media (max-width: 768px) { 
    justify-content: center;
    height: 100vh;
    width: 100%;
  }
`;

export const Page = styled.div`
  position: fixed;
  right: 5%;
  top: 7%;
  width: 38%;
  height: 85vh;
  flex-direction: column;
  border-radius: 2rem;
  background-color: rgba(255, 255, 255, 0.8);
  box-shadow: 0 0.4rem 0.8rem rgba(0, 0, 0, 0.1);

  @media (max-width: 1024px) { 
    right: 5%;
    top: 5%;
    width: 50%;
    height: 90%;
    padding: 0 1.5rem;
  }

  @media (max-width: 768px) { 
    right: 10%;
    top: 5%;
    width: 80%;
    height: 90%;
    padding: 0 1.5rem;
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
  @media (max-width: 1300px) { 
    font-size: 2.2rem;
  }
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

  @media (max-width: 1024px) {
    margin-bottom: 1%;
    margin-left: 16%;
    max-width: 70%;
  }
`

export const InputWrap = styled.div`
  display: flex;
  border-radius: 10px;
  padding: 1.3rem;
  margin-bottom: 4%;
  margin-left: 20%;
  max-width: 60%;
  border: 2px solid #c2c0c0;

  &:focus-within {
    border: 2px solid #ACAACC;
  }

  @media (max-width: 1024px) {
    padding: 1.2rem;
    margin-bottom: 4%;
    margin-left: 15%;
    max-width: 70%;
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
    color: #777777;
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

  @media (max-width: 1024px) {
    padding: 1rem;
    margin-top: 1.5%;
    height: 4.8rem;
    margin-left: 15%;
    width: 70%;
  } 
  &:hover {
    background-color: #8C84B0;
}
`;


export const NoAccount = styled.div`
  display: flex;
  justify-content: space-around; 
  align-items: center; 
  margin-top: 4%;
  margin-bottom: 2%;
  max-width: 60%;
  margin-left: 20%;
  font-size: 1.3rem;
  color: white; 
  @media (max-width: 500px) {
    margin-top: 8%;
  } 
  p {
    color: #ACAACC;
    }
  a {
    color: #ACAACC;
    text-decoration: none;
    font-weight: bold;
    &:hover {
      text-decoration: underline;
    
  }
`

export const UnderlinedText = styled.span`
  text-decoration: underline;
`;
