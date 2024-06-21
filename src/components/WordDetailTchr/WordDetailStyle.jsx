import styled from "styled-components";

export const WordImage = styled.div`
    width: 100%;
    padding: 3%;
    border-radius: 40px;
    flex-direction: row;
    display: flex;
    align-items: center;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

export const Section = styled.section`
  text-align: center; 
  padding: 50px 0;
  align-items: center;
  margin-bottom: 0%;
  h1{
    font-size: 2.4rem;
    color: #2F327D;
  }
`

export const CardTitle = styled.div`
    align-items: center;
    width: 8%;
    margin-left: 46%;
    margin-bottom: 4%;
    padding: 0.6%;
    border-radius: 7px;
    height: auto;
    background-color: #FEEAFA;
    p{
        font-size: 1.5rem;
    }
`

export const Word = styled.div`
    flex: 0 0 auto;
    text-align: center;
    padding: 5px;
    margin: 0 10px;
    min-width: 200px; 

    img {
        width: 200px; 
        height: 200px;
        display: block;
        margin: 0 auto;
        border-radius: 7px;
        border: 5px solid #FEEAFA;
        border-radius: 10px;
    }

    div {
        width: 130px;
        height: 130px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0 auto;
    }
`;


export const WordBoard = styled.div`
    display: flex;
    position: relative;
    justify-content: space-around;
    gap: 3%;
    width: 100%;
    padding-bottom: 2%;
    overflow-x: auto;
    white-space: nowrap;
`;

export const WordList = styled.div`
    width: 50%;
    margin-left: 25%;
    height: 40vh;
    padding: 3%;
    border-radius: 40px;
    flex-direction: row;
    display: flex;
    align-items: center;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

export const ArrowButton = styled.div`
    flex: 0 0 auto;
    flex-direction: row;
    display: flex;
    text-align: center;
    padding: 5px;
    margin: 0 10px;
    min-width: 50px; 
    align-items: center;

    img {
        width: 50px; 
        height: 50px;
        display: block;
        align-items: center;
        margin: 0 auto;
        border-radius: 100px;
    }
`;

export const BottomButton = styled.button`
  margin-left: 43%;
  width: 14%; //86
  padding: 0.7rem;
  height: 4rem;
  border: none;
  font-weight: bold;
  border-radius: 5px;
  background-color: #ACAACC; 
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  &:hover {
    background-color: #8C84B0;
}
`;

export const ImageWrap = styled.div`
    display: flex;
    justify-content: space-between;
    position: fixed;
    left: 2%;
    top: 1%;
    width: 100%;
    padding: 20px;

    img {
        max-width: 30%;
    }
    a {
        width: 20%;
        margin-top: 4%;
    }
`;