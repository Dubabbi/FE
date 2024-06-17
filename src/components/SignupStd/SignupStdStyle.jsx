//SignupStdStyle.jsx
import styled from 'styled-components';

export const ChoiceBox = styled.div`
    display: flex;
    justify-content: center;
    gap: 3%;
    margin-top: 15%;
`;

export const OptionLink = styled.a`
    display: flex; 
    align-items: center; 
    justify-content: center; 
    background-color: rgba(255, 255, 255, 0.1);
    text-align: center; 
    line-height: 1.7;
    width: 150px;
    height: 150px;
    margin-bottom: 5.5%;
    border-radius: 10px;
    text-decoration: none;
    color: #222222;
    font-size: 2rem;
    transition: transform 0.3s ease-in-out; 
    &:hover {
      transform: scale(1.04);
    }
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

export const BottomButton = styled.button`
  margin-left: 30%;
  width: 40%;
  height: 5.5rem;
  border: none;
  font-weight: bold;
  border-radius: 10px;
  background-color: #ACAACC;
  color: white;
  font-size: 1.8rem;
  cursor: pointer;

  @media (max-width: 500px) {
    padding: 1.2rem;
  } 
  &:hover {
    background-color: #8C84B0;
}
`;