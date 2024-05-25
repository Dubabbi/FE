//SignupStdStyle.jsx
import styled from 'styled-components';

export const ChoiceBox = styled.div`
    display: flex;
    justify-content: center;
    gap: 3%;
    margin-top: 15%;
`;

export const OptionLink = styled.a`
    display: flex; /* Flexbox를 사용 */
    align-items: center; /* 수직 정렬 */
    justify-content: center; /* 수평 정렬 */
    background-color: rgba(255, 255, 255, 0.1);
    text-align: center; /* 텍스트 중앙 정렬 */
    line-height: 1.7;
    width: 150px;
    height: 150px;
    margin-bottom: 5.5%;
    border-radius: 10px;
    text-decoration: none;
    color: #222222;
    font-size: 2rem;
    transition: transform 0.3s ease-in-out;  // 부드러운 변환 효과
    &:hover {
      transform: scale(1.04);  // 5%만큼 크기 증가
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

  @media (max-width: 500px) { // 작은 모바일
    padding: 1.2rem;
  } 
  &:hover {
    background-color: #8C84B0;
}
`;