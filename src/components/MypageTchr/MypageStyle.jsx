import styled from 'styled-components';

export const MypageWrapper = styled.div`
  background-color: #FEEAFA;
`;

export const Section = styled.div`
  max-width: 1000px;
  background-color: #FEEAFA;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  padding-top: 11%;
  padding-bottom: 7%;
`;

export const Content = styled.div`
  display: flex;
  margin-left: 22%;
  max-width: 56%;
  box-shadow: 0px 5.1px 7.64px rgba(0, 0, 0, 0.15);
  height: auto;
  border-radius: 6px;
  border: 1px solid #EBEBEE;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  text-align: center;
  padding: 30px;
`;

export const InLine = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  padding: 0px;
`;

export const Profile = styled.img`
  width: 65px;
  height: 65px;
  border-radius: 50%;
  border: 4px solid #FED7D7;
`;

export const Upload = styled.img`
    width: 150px;
    height: 150px;
    text-align: center;
    align-items: center;
    cursor: pointer;
`;

export const InfoBox = styled.div`
  width: 100%;
  padding: 10px;
`;

export const InfoItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid rgba(0, 0, 0, 0.15);
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.1);
  border-radius: 3px;
  padding: 15px;
  margin-bottom: 10px;
`;

export const InfoGroup = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
`;

export const InfoTitle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-weight: bold;
  font-size: 1.2rem;
  color: #333;
`;

export const InfoContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const Label = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  color: #333;
  margin-top: 11%;
  margin-bottom: 11%;
`;

export const Value = styled.div`
  font-size: 1.2rem;
  color: #555;
  margin-top: 5%;
  margin-bottom: 5%;
`;

export const SubText = styled.div`
  font-size: 0.9rem;
  color: #777;
  margin-top: 5px;
`;

export const SettingsIcon = styled.img`
  width: 20px;
  height: 20px;
  cursor: pointer;
  margin-right: 8px;
`;

export const MoreIcon = styled.img`
  width: 35px;
  height: 20px;
  cursor: pointer;
`;


export const Box = styled.div`
  width: 100%;
  padding: 20px;
  margin-bottom: 10px;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 10px;
  box-shadow: 0px 2.55px 2.55px rgba(0, 0, 0, 0.1);
  text-align: left;
  position: relative;
`;
