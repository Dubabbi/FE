import React, { useState } from 'react';
import * as M from './MypageStyle'
import My from '/src/assets/image/profile.svg';
import Upload from '/src/assets/icon/uploadphoto.svg';
import Settings from '/src/assets/icon/settings.svg'; 
import More from '/src/assets/icon/more.svg'; 
import UploadPhoto from './UploadPhoto';

const MypageTchr = () => {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const toggleUploadModal = () => {
    setIsUploadModalOpen(!isUploadModalOpen);
  };

  const handleAddImage = () => {
    toggleUploadModal();
  };

  return (
    <M.MypageWrapper>
      <M.Section>
        <M.Content>
          <M.InLine>
            <M.Profile src={My} />
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
                <M.SettingsIcon src={Settings} />
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
              <M.MoreIcon src={More} />
            </M.InfoItem>
          </M.InfoBox>
        </M.Content>
      </M.Section>
      <UploadPhoto 
        isOpen={isUploadModalOpen}
        toggleModal={toggleUploadModal}
        handleAddImage={handleAddImage}
      />
    </M.MypageWrapper>
  );
};

export default MypageTchr;