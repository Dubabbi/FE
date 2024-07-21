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

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5); // 반투명 배경
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
`;

export const ModalContent = styled.div`
  position: relative;
  width: 450px;
  background: white;
  border-radius: 10px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  h1 {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }
`;

export const CloseButton = styled.div`
  position: absolute;
  cursor: pointer;
  top: 15px;
  right: 15px;
  width: 34px;
  height: 34px;
`;

export const SubModalText = styled.p`
  font-size: 0.9rem;
  color: #555;
  margin-bottom: 1rem;
`;

export const UploadBox = styled.div`
  width: 100%;
  border: 2px dashed #ccc;
  border-radius: 10px;
  padding: 20px;
  text-align: center;
  margin-bottom: 1rem;
`;



export const UploadIcon = styled.img`
  width: 50px;
  height: 50px;
  margin-bottom: 1rem;
`;

export const UploadText = styled.p`
  font-size: 1rem;
  color: #555;
  margin-bottom: 1rem;
`;

export const UploadDivider = styled.p`
  font-size: 1rem;
  color: #aaa;
  margin-bottom: 1rem;
`;

export const UploadButton = styled.button`
  border: 1.5px solid #ACAACC;
  color: #9D9AC9;
  font-weight: bold;
  padding: 7px 15px;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  margin-bottom: 1rem;
`;

export const FormatText = styled.p`
  font-size: 0.7vw;
  color: #777;
  margin-bottom: 0px;
  text-align: left;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;

export const CancelButton = styled.button`
  background-color: #f5f5f5;
  color: #333;
  padding: 10px 20px;
  border-radius: 5px;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  margin-right: 1rem;
`;

export const ModalButton = styled.button`
  background-color: #A19CE9;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  border: none;
  font-size: 1rem;
  cursor: pointer;
`;

export const FeedbackContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px 0;
  margin-top: 5%;
  width: 60%;
  margin-left: 20%;
`;

export const HalfLine = styled.div`
  flex-grow: 1;
  height: 1px;
  background-color: #ccc;
`;

export const FeedbackText = styled.div`
  white-space: nowrap;
  font-size: 1.2rem;
  margin-left: 5%;
  margin-right: 5%;
  color: #aaa;
  margin-bottom: 0rem;
`;

export const UploadedFileDetails = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #E7E7E7;
  width: 100%;
  padding: 3%;
  gap: 2%;
  border-radius: 5px;
  margin-bottom: 1rem;
  margin-top: 1rem;
`;

export const FileName = styled.p`
  font-size: 1rem;
  color: #555;
  margin: 0;
`;

export const FileSize = styled.p`
  font-size: 0.9rem;
  color: #777;
  margin: 0;
`;

export const RemoveFileButton = styled.button`
  background-color: #dbdbdb;
  color: #777;
  align-items: center;
  padding: 3px 6px;
  border-radius: 100%;
  box-shadow: inset 0 0 0 2px #858585;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
`;
