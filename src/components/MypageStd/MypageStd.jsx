import React, { useState } from 'react';
import * as M from '../MypageTchr/MypageStyle'
import My from '/src/assets/image/profile.svg';
import Upload from '/src/assets/icon/uploadphoto.svg';
import Settings from '/src/assets/icon/settings.svg'; 
import More from '/src/assets/icon/more.svg'; 
import UploadPhoto from '../MypageTchr/UploadPhoto';

const MypageStd = () => {
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
    const [profileImage, setProfileImage] = useState(My);

    const toggleUploadModal = () => {
      setIsUploadModalOpen(!isUploadModalOpen);
    };

    const handleAddImage = (file) => {
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setProfileImage(reader.result);
        };
        reader.readAsDataURL(file);
      }
      toggleUploadModal();
    };
    const [isExtended, setIsExtended] = useState(false);
    const [isSettingExtended, setIsSettingExtended] = useState(false);



const handleToggleExtended = () => {
  setIsExtended(!isExtended);
  if (isSettingExtended) {
      setIsSettingExtended(false);
  }
};

const handleExtended = () => {
  setIsSettingExtended(!isSettingExtended);
  if (isExtended) {
      setIsExtended(false);
  }
};

  return (
    <M.MypageWrapper>
      <M.Section>
      <M.ContentContainer isExtended={isExtended || isSettingExtended}>
        <M.Content>
          <M.InLine>
            <M.Profile src={profileImage} />
            <M.Upload src={Upload} alt="Upload Photo" onClick={toggleUploadModal} />
          </M.InLine>
          <M.InfoBox>
            <M.InfoItem>
              <M.InfoGroup>
                <M.InfoTitle>
                  <M.Label>이름</M.Label>
                  <M.Label>이메일</M.Label>
                  <M.Label>휴대폰 번호</M.Label>
                </M.InfoTitle>
                <M.InfoContent>
                  <M.Value>부앙단</M.Value>
                  <M.Value>example@email.com</M.Value>
                  <M.Value>01012345678</M.Value>
                </M.InfoContent>
                <M.SettingsIcon src={Settings} onClick={handleExtended}/>
              </M.InfoGroup>
            </M.InfoItem>
            <M.InfoItem>
              <M.InfoGroup>
                <M.InfoTitle>
                  비밀번호
                  <M.SubText>비밀번호를 변경하려면 인증이 필요합니다.</M.SubText>
                </M.InfoTitle>
              </M.InfoGroup>
              <M.SettingsIcon src={Settings} />
            </M.InfoItem>
            <M.InfoItem style={{ maxHeight: '50px' }}>
              <M.Label>매칭된 학생 목록</M.Label>
              <M.MoreIcon src={More} onClick={handleToggleExtended} />
            </M.InfoItem>
          </M.InfoBox>
        </M.Content>
        {isSettingExtended && 
        <M.Second>
          <M.SecondLabel>개인정보 변경</M.SecondLabel>
          <M.Item>
          <M.InfoGroup style={{padding: '7%', border: '1px solid #eee', borderRadius: '5px', marginTop: '10%'}}>
                <M.InfoTitle style={{padding: '10px'}}>
                  <M.Label>이름</M.Label>
                  <M.Label>이메일</M.Label>
                  <M.Label>휴대폰 번호</M.Label>
                  <M.Label>성별</M.Label>
                  <M.Label>생년월일</M.Label>
                  <M.Label>지능지수</M.Label>
                </M.InfoTitle>
                <M.InfoContent style={{padding: '10px'}}>
                  <M.Value>부앙단</M.Value>
                  <M.Value>example@email.com</M.Value>
                  <M.Value>010-1234-5678</M.Value>
                  <M.Value>여성</M.Value>
                  <M.Value>2007-08-12</M.Value>
                  <M.Value>경도</M.Value>
                </M.InfoContent>
              </M.InfoGroup>
          </M.Item>
        </M.Second>}
        {isExtended && 
        <M.Second>
          <M.SecondLabel>피드백 목록</M.SecondLabel>
          <M.Item>

          </M.Item>
        </M.Second>}
        </M.ContentContainer>
      </M.Section>
      <UploadPhoto 
        isOpen={isUploadModalOpen}
        toggleModal={toggleUploadModal}
        handleAddImage={handleAddImage}
      />
    </M.MypageWrapper>
  );
};

export default MypageStd;