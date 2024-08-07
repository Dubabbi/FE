//SignupTchrStyle.jsx
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
  margin: 0% auto 0; 
  flex-direction: column;
  border-radius: 2rem; 
  justify-content: center;
  height: 600px;
  background-color: rgba(255, 255, 255, 0.9);
  box-shadow: 0 0.4rem 0.8rem rgba(0, 0, 0, 0.1);
  
  @media (max-width: 1024px) {
    padding: 0 2rem; 
    height: auto; 
    margin-top: 3%; 
    min-height: 550px;
  }

  @media (max-width: 768px) {
    padding: 0 1.5rem; 
    margin-top: 7%;
  }

  @media (max-width: 480px) {
    padding: 5 5rem; 
    margin-top: 10%; 
    font-size: 0.8rem; 
    border-radius: 1rem; 
  }
`;

export const TitleWrap = styled.div`
  font-size: 2.6rem;
  font-weight: bold;
  margin-top: 0%;
  margin-bottom: 4%;
  text-align: center;
  color: #262626;
  letter-spacing: 0px;
  line-height: 1.5;
  @media (max-width: 1300px) { 
    font-size: 2.2rem;
  }
`;

export const SecondInputWrap = styled.div`
  display: flex;
  border-radius: 10px;
  padding: 1.2rem;
  margin-top: 1.1%;
  margin-left: 20%;
  max-width: 60%;
  background-color: #E1E4E7;

  @media (max-width: 1024px) {
    padding: 1.2rem;
    margin-left: 15%;
    max-width: 70%;
  }
`;

export const Input = styled.input`
  width: 100%;
  outline: none;
  border: none;
  height: 2.2rem;
  font-size: 1.5rem;
  font-weight: 400;
  color: #777777;

  &::placeholder {
    color: #777777;
    font-size: 1.3rem;
  }
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


export const Select = styled.select`
  width: 100%;
  outline: none;
  border: none;
  height: 2.2rem;
  font-size: 1.3rem;
  font-weight: 400;
  background-color: #E1E4E7;
  color: #777777;

  option {
    cursor: pointer; 
    width: 100%;
    outline: none;
    border: none;
    height: 2.2rem;
    font-size: 1.5rem;
    background-color: #E1E4E7;
    font-weight: 400;
`;


export const ErrorMessageWrap = styled.div`
  margin-left: 22%;
  margin-top: 0.5%;
  max-width: 60%;
  color: red;
  font-size: 1.1rem;
  opacity: 0;
  transition: opacity 0.5s ease-in-out;

  @media (max-width: 1024px) {
  margin-left: 18%;
  margin-top: 0.5%;
  max-width: 70%;
  } 
  ${({ $show }) => $show && `
    opacity: 1;
  `}
`;


export const ImageWrap = styled.div`
    display: flex;
    justify-content: flex-end;
    justify-content: space-between;
    img {
        margin-right: 7%;
        max-width: 30%; 
    }
    a{
      width: 20%;
      margin-left: 10%;
      margin-top: 10%;
    }
`

export const NoAccount = styled.div`
margin-top: 3%;
max-width: 100%;
cursor: pointer;
text-align: center; 
p {
  font-weight: bold;
  display: inline; 
  font-size: 13px;
}
a {
  font-size: 14px;
}
`

export const UnderlinedText = styled.span`
  text-decoration: underline;
`;


export const SchoolDropdown = styled.div`
  position: absolute;
  background: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  max-height: 150px;
  overflow-y: auto;
  z-index: 1000;
  width: 100%;
`;

export const SchoolItem = styled.div`
  padding: 8px 12px;
  cursor: pointer;

  &:hover {
    background: #f5f5f5;
  }
`;