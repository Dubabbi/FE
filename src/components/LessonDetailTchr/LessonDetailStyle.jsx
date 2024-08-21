import styled from 'styled-components';

export const LessonBox = styled.div`
    width: 70%;
    margin-left: 15%;
    padding-top: 2%;
    padding-bottom: 2%;
    border-radius: 10px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

export const Section = styled.section`
  padding: 50px 0;
  flex-direction: row;
  margin-left: 9%;
  align-items: center;
  justify-content: center;
  display: flex;
  h1{
    font-size: 2.4rem;
    margin-right: 4%;
    color: #2F327D;
    text-align: center;
  }
    img{
        margin-right: 0.5%;
        align-items: center;
        max-width: 35px;
    }
    a{
            margin-right: 0.5%;
        align-items: center;
        max-width: 35px;
    }
`

export const Content = styled.h1`
    font-family: arial;
    position: relative;
    font-size: 14px; 
    height: 37px; 
    display: flex;
    position: relative;
    align-items: center;
    img{
        width: 80%;
    }
`;

export const Title = styled.h1`
    margin-left: 5%;
    margin-top: 1%;
    width: 25%;
    height: 37px; 
    font-size: 16px; 
    display: flex;
    position: relative;
    align-items: center;
`;

export const Line = styled.div`
    justify-content: flex-start;
    display: flex;
    margin-bottom: 2%;
    align-items: center;
    margin-left: 6%;
    gap: 5%;
`

export const SecondLine = styled.div`
    justify-content: flex-start;
    display: flex;
    margin-bottom: 5%;
    margin-left: 6%;
    gap: 5%;
`

export const SquareBox = styled.div`
  padding: 1%;
  width: 21%; 
  border: 1px solid #BBBBBB;
  margin-bottom: 3%;
  border-radius: 1rem;
  position: relative;
  margin-left: 0.2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around; 
`;

export const CardImage = styled.div`
    flex: 0 0 auto;
    text-align: center;
    padding: 5px;
    margin: 0 10px;
    min-width: 140px; 
    font-size: 1.5rem;

    img {
        width: 140px; 
        height: 140px;
        display: block;
        margin: 0 auto;
        border-radius: 5px;
        border: 3px solid #FEEAFA;
        border-radius: 10px;
    }

`;