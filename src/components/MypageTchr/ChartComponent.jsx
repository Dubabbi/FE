import styled from 'styled-components';

const ChartContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 100px;
    max-width: 70%;
    
`;

const ChartRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  margin-bottom: 10px;
`;
const ChartBlock = styled.div`
  width: 50px;
  height: ${props => props.height}px;
  background-color: ${props => props.color};
  display: flex;
  border-radius: 10px 10px 0 0;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: bold;
  margin: 0 5px;
`;

const LabelRow = styled.div`
  display: flex-basis;
  flex-grow: 1;
  justify-content: center;
  margin-top: 10px;
  text-align: left;
  flex-direction: row;
  flex-wrap: wrap;
`;

const Label = styled.div`
  padding: 5px 10px;
  background-color: ${props => props.color};
  margin: 0 5px;
  text-align: center;
  white-space: 'nowrap'
`;

const ChartComponent = () => {
  return (
    <ChartContainer>
      <ChartRow>
        <ChartBlock color="#FEEAFA" height={50}>1</ChartBlock>
        <ChartBlock color="#FED7D7" height={100}>2</ChartBlock>
        <ChartBlock color="#C3AED6" height={75}>3</ChartBlock>
        <ChartBlock color="#ACAACC" height={125}>4</ChartBlock>
        <ChartBlock color="#878F9E" height={150}>5</ChartBlock>
      </ChartRow>
      <LabelRow>
        <Label>카테고리 분류</Label>
        <Label>이미지 순서 배열하기</Label>
        <Label>감정 포현</Label>
        <Label>이야기 순서 배열하기</Label>
        <Label>어휘 카드 매칭 게임</Label>
      </LabelRow>
    </ChartContainer>
  );
};

export default ChartComponent;