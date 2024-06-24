import styled from "styled-components";

export const badgeCount = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 40px;
  width: 90px;
  height: 45px;
  border: 2px solid #bbbbbb;
  font-size: 1.8rem;
  font-family: "Outfit", sans-serif;
  font-weight: regular;
  color: #49454fcc;
  margin-bottom: 10px;
  margin-right: 20px;
`;

export const Badge = styled.img`
  height: 90px;
  margin-top: 20px;
  margin-bottom: 35px;
`;

export const BadgeIcon = styled.img`
  height: 36px;
  margin-right: 6px;
`;

export const challengeContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const challenging = styled.div`
  background-color: #d6e0ff;
  border-radius: 6px;
  padding: 3px;
  font-size: 1rem;
  color: #2952cc;
  text-align: center;
  width: 40px;
  margin-bottom: 3px;
`;

export const challengeFinish = styled.div`
  background-color: #dcf2ea;
  border-radius: 6px;
  padding: 3px;
  font-size: 1rem;
  color: #317159;
  text-align: center;
  width: 30px;
  margin-bottom: 3px;
  margin-top: 8px;
`;

export const challengeText = styled.div`
  border-radius: 6px;
  border: 1px solid #bbbbbb;
  padding: 8px;
  padding-left: 15px;
  font-size: 1rem;
  color: #050b20;
  width: 120px;
  margin-bottom: 5px;
  // box-shadow: 0 0.1rem 0.8rem rgba(0, 0, 0, 0.1);
`;

//전체 크기 지정
export const DonutContainer = styled.div`
  position: relative;
  width: 130px;
  height: 130px;
  margin-left: 25px;
`;

export const StyledSVG = styled.svg`
  width: 100%;
  height: 100%;
`;
//외부 원
export const OuterCircle = styled.circle`
  fill: none;
  stroke: #ececec;
  stroke-width: 14;
`;
//진행 정도를 표시해주는 원 (노란색)
export const ProgressCircle = styled.circle`
  fill: none;
  stroke: #fed7d7;
  stroke-width: 14;
  stroke-dasharray: ${(props) =>
    2 * Math.PI * 90}; //원의 둘레로 점선의 패턴을 정의
  stroke-dashoffset: ${(props) =>
    2 * Math.PI * 90 * (1 - props.progress)}; //선이 그려지는 시작 위치를 조절
  stroke-linecap: round; //선 끝을 둥글게
  transform: rotate(-90deg); //디자인에 맞게 회전
  transform-origin: center;
`;

export const InnerCircle = styled.circle`
  //안쪽 원
  fill: none;
  stroke: #ffeaea;
  stroke-width: 1;
`;

export const Text = styled.div`
  //글씨 위치
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 18px;
  text-align: center;
  justify-content: center;
  color: #020617;
  line-height: 2;
`;
