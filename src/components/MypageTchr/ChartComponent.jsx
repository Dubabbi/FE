// ChartComponent.jsx
import React from 'react';
import styled from 'styled-components';

const ChartContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  background-color: #FFFFFF;
  padding: 7px;
  max-width: 95%;
  margin-top: 2%;
  overflow: hidden;
  margin-left: 2%;
`;

const ChartRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  margin-bottom: 10px;
`;

const ChartBlock = styled.div`
  width: 45px;
  height: ${props => props.height * 15}px;
  background-color: ${props => props.color};
  display: flex;
  flex-direction: column;  
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: bold;
  margin: 0 5px;
  border-radius: 10px 10px 0 0;
  position: relative;  
`;

const BlockLabel = styled.div`
  position: absolute;
  bottom: 0;  
  left: 50%;
  transform: translate(-50%, 100%); 
  color: #666;
  font-size: 0.9rem;
  background: white; 
  padding: 2px 5px;  
  border-radius: 4px;  
`;


const LabelRow = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 10px;
  width: 100%; 
  margin-left: 0px;
  justify-content: flex-start;
`;

const LabelBox = styled.div`
  width: 20px;
  height: 20px;
  background-color: ${props => props.color};
  border-radius: 4px;
  padding: 4px;
`;

const Label = styled.div`
  display: flex;
  align-items: center;
  margin: 0 5px;
  font-size: 0.9rem;
  font-weight: bold;
  color: #333;
  white-space: nowrap;
  padding: 0.5rem 0;
`;

const LabelContent = styled.span`
  margin-left: 5px;
  align-items: center;
`;

const ChartComponent = ({ chartData }) => {
  const colors = ['#FEEAFA', '#FED7D7', '#C3AED6', '#ACAACC', '#878F9E'];
  const labels = ['카테고리 분류', '이미지 순서 배열하기', '감정 표현', '이야기 순서 배열하기', '어휘 카드 매칭 게임'];

  return (
    <ChartContainer>
      <ChartRow>
        {Object.entries(chartData).map(([key, value], index) => (
          <ChartBlock key={key} color={colors[index]} height={value}>
            {value}
            <BlockLabel>{key}</BlockLabel>
          </ChartBlock>
        ))}
      </ChartRow>
      <LabelRow>
      {Object.keys(chartData).map((key, index) => (
          <Label key={key}>
            <LabelBox color={colors[index]}>{key.toUpperCase()}</LabelBox>
            <LabelContent style={{alignItems: 'center', textAlign: 'center'}}>{labels[index]}</LabelContent> 
          </Label>
        ))}
      </LabelRow>
    </ChartContainer>
  );
};

export default ChartComponent;