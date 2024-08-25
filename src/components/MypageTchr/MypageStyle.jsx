import styled, {css} from 'styled-components';

export const MypageWrapper = styled.div`
  background-color: #FEEAFA;`
;

export const Section = styled.div`
  max-width: ${({ $isExtended }) => $isExtended ? '100%' : '1100px'};
  background-color: #FEEAFA;
  align-items: center;
  justify-content: center;
  gap: 0px;
  margin: 0 auto;
  display: flex;
  padding-top: 11%;
  padding-bottom: 7%;
  transition: max-width 0.3s ease-out;`
;

export const Content = styled.div`
  display: flex;
  margin-left: ${({ $isExtended }) => $isExtended ? '0' : '0'}; 
  max-width: ${({ $isExtended }) => $isExtended ? '40%' : '50%'};
  min-width: ${({ $isExtended }) => $isExtended ? '300px' : 'auto'};
  box-shadow: 0px 5.1px 7.64px rgba(0, 0, 0, 0.15);
  height: auto;
  border-radius: 6px;
  border: 1px solid #EBEBEE;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  text-align: center;
  padding: ${({ $isExtended }) => $isExtended ? '15px' : '30px'}; // 패딩 조절
  transition: all 0.3s ease-out;
  flex: 1;` 
;


export const Second = styled.div`
  display: flex;
  margin-left: 0;
  max-width: 30%;
  min-width: 370px;
  box-shadow: 0px 5.1px 7.64px rgba(0, 0, 0, 0.15);
  height: auto;
  max-height: 500px;
  border-radius: 6px;
  border: 1px solid #EBEBEE;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background-color: #ffffff;
  text-align: center;
  padding: 30px;
  transition: all 0.3s ease-out;
  flex: 1;

  hr{
    width: 90%; 
    border: none; 
    height: 1px;
    background-color: #ccc; 
    margin: 10px 0;
  
  }`
;

export const Item = styled.div`
  display: flex;
  margin-left: 0;
  min-width: 100%; 
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background-color: #ffffff;
  text-align: center;
  flex: 1;
  overflow-x: hidden; // Prevent horizontal scrolling
  overflow-y: auto; // Allow vertical scrolling if needed
  &::-webkit-scrollbar {
    width: 9px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

export const ContentContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center; 
  gap: 0; 
  overflow: visible;

  ${({ $isExtended }) => $isExtended && css`
    ${Content}:first-child {
      transform: translateX(-5%); 
    }
    ${Second}:last-child {
      transform: translateX(5%); 
    }
  `}
`;

export const InLine = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  padding: 0px;`
;

export const Profile = styled.img`
  width: 65px;
  height: 65px;
  border-radius: 50%;
  border: 4px solid #FED7D7;
  object-fit: cover;`
;

export const Upload = styled.img`
    width: 150px;
    height: 150px;
    text-align: center;
    align-items: center;
    cursor: pointer;`
;

export const InfoBox = styled.div`
  width: 100%;
  padding: 10px;`
;

export const InfoItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid rgba(0, 0, 0, 0.15);
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.1);
  border-radius: 3px;
  padding: 15px;
  margin-bottom: 10px;`
;

export const InfoGroup = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;`
;

export const InfoTitle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-weight: bold;
  font-size: 1.2rem;
  color: #333;`
;

export const InfoContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;`
;

export const Label = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  color: #333;
  margin-top: 11%;
  margin-bottom: 11%;`
;

export const SecondLabel = styled.div`
  font-size: 1.2rem;
  background-color: #FED7D7;
  font-weight: bold;
  border-radius: 10px;
  color: #333;
  margin-top: 5%;
  margin-bottom: 3%;
  width: 100px;
  height: auto;
  padding: 4px;`
;


export const Value = styled.div`
  font-size: 1.2rem;
  color: #555;
  margin-top: 5%;
  margin-bottom: 7.8%;`
;

export const SubText = styled.div`
  font-size: 0.9rem;
  color: #777;
  margin-top: 5px;`
;

export const SettingsIcon = styled.img`
  width: 20px;
  height: 20px;
  cursor: pointer;
  margin-right: 8px;`
;

export const MoreIcon = styled.img`
  width: 35px;
  height: 20px;
  cursor: pointer;`
;

export const Blank = styled.div`
  width: 35px;
  height: 20px;
  cursor: pointer;
  img{
    max-width: 100%;
  }
`;

export const Box = styled.div`
  width: 100%;
  padding: 20px;
  margin-bottom: 10px;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 10px;
  box-shadow: 0px 2.55px 2.55px rgba(0, 0, 0, 0.1);
  text-align: left;
  position: relative;`
;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5); 
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;`
;

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
  height: 34px;`
;

export const SubModalText = styled.p`
  font-size: 0.9rem;
  color: #555;
  margin-bottom: 1rem;`
;

export const UploadBox = styled.div`
  width: 100%;
  border: 2px dashed #ccc;
  border-radius: 10px;
  padding: 20px;
  text-align: center;
  margin-bottom: 1rem;`
;



export const UploadIcon = styled.img`
  width: 50px;
  height: 50px;
  margin-bottom: 1rem;`
;

export const UploadText = styled.p`
  font-size: 1rem;
  color: #555;
  margin-bottom: 1rem;`
;

export const UploadDivider = styled.p`
  font-size: 1rem;
  color: #aaa;
  margin-bottom: 1rem;`
;

export const UploadButton = styled.button`
  border: 1.5px solid #ACAACC;
  color: #9D9AC9;
  font-weight: bold;
  padding: 7px 15px;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  margin-bottom: 1rem;`
;

export const FormatText = styled.p`
  font-size: 0.7vw;
  color: #777;
  margin-bottom: 0px;
  text-align: left;`
;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;`
;

export const CancelButton = styled.button`
  background-color: #f5f5f5;
  color: #333;
  padding: 10px 20px;
  border-radius: 5px;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  margin-right: 1rem;`
;

export const ModalButton = styled.button`
  background-color: #A19CE9;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  border: none;
  font-size: 1rem;
  cursor: pointer;`
;

export const FeedbackContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px 0;
  margin-top: 5%;
  width: 60%;
  margin-left: 20%;`
;

export const HalfLine = styled.div`
  flex-grow: 1;
  height: 1px;
  background-color: #ccc;`
;

export const FeedbackText = styled.div`
  white-space: nowrap;
  font-size: 1.2rem;
  margin-left: 5%;
  margin-right: 5%;
  color: #aaa;
  margin-bottom: 0rem;`
;

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
  margin-top: 1rem;`
;

export const FileName = styled.p`
  font-size: 1rem;
  color: #555;
  margin: 0;`
;

export const FileSize = styled.p`
  font-size: 0.9rem;
  color: #777;
  margin: 0;`
;

export const RemoveFileButton = styled.button`
  background-color: #dbdbdb;
  color: #777;
  align-items: center;
  padding: 3px 6px;
  border-radius: 100%;
  box-shadow: inset 0 0 0 2px #858585;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;`
;


export const InLineTitle = styled.div`
  display: inline-flex;
  justify-content: flex-start;
  flex-direction: row;
  margin-right: 30%;
  gap: 45%;
  align-items: center;
  margin-bottom: 4%;
  img{
    max-width: 30px;
    cursor: pointer;
  }`
;

export const MatchingLabel = styled.div`
  font-size: 1.2rem;
  background-color: #FED7D7;
  font-weight: bold;
  border-radius: 10px;
  color: #333;
  width: 100px;
  height: auto;
  text-align: center;
  align-items: center;
  padding: 7px;`
;

export const StuProfile = styled.img`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  border: 3px solid #FED7D7;
  object-fit: cover;`
;

export const StdLine = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  padding: 1.7%;
  border: 1px solid #eee;
  box-shadow: 0.5 1.3px 1.3px 0 rgba(0, 0, 0, 0.1);`
;


export const Start = styled.div`
  display: flex;
  gap: 10%;
  justify-content: flex-start;
  flex-direction: row;`
;


export const DetailTitle = styled.div`
  display: inline-flex;
  justify-content: space-around;
  margin-top: 0px;
  marginRight: 25%;
  max-width: 80%;
  gap: 18%;
  margin-right: 12%;
  flex-direction: row; 
  align-items: center;
  margin-bottom: 5%;
  img{
    max-width: 30px;
    cursor: pointer;
  }`
;


export const DetailLabel = styled.div`
  font-size: 2vw;
  font-weight: bold;
  gap: 7%;
  width: 200px;
  height: auto;
  display: flex;
  flex-direction: row;
  text-align: center;
  align-items: center;
  white-space: nowrap;
  padding: 7px;
  margin-right: 3%;
  img{
      min-width: 40px;
      height: 40px;
      border-radius: 50%;
      border: 3px solid #FED7D7;
      object-fit: cover;
  }`
;

export const Detail = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  color: #333;
  text-align: left;
  p{
    text-align: left;
  }`
;

export const InfoFeed = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 3%;
  border: 1px solid #eee;
  border-radius: 5px;
  margin-bottom: 3%;`
;

export const FeedTitle = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const InfoChange = styled.input`
  font-size: 1.2rem;
  color: #555;
  margin-top: 2%;
  margin-bottom: 6.55%;
  border: 2px solid #ccc;  
  border-radius: 4px;  

  &:focus {               
    border-color: #555;
    outline: none;  
  }
  `
;

export const InfoButton = styled.button`
  padding: 2% 4%;
  font-size: 1.2rem;
  border: 2px solid #FED7D7;
  border-radius: 1rem;
  &:hover {
    background: #FFF4F4;
  }
`;