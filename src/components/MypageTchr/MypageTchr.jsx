import React, { useState } from 'react';
import * as M from './MypageStyle'
import My from '/src/assets/image/profile.svg';
import Upload from '/src/assets/icon/uploadphoto.svg';
import Settings from '/src/assets/icon/settings.svg'; 
import More from '/src/assets/icon/more.svg'; 
import Arrow from '/src/assets/icon/mypagearrow.svg'; 
import UploadPhoto from './UploadPhoto';
import Addstd from '/src/assets/icon/addstd.svg';
import Close from '/src/assets/icon/closebtn.svg';

const MypageTchr = () => {
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
    const [profileImage, setProfileImage] = useState(My);
    const [isExtended, setIsExtended] = useState(false);
    const [isSettingExtended, setIsSettingExtended] = useState(false);
    const [feedbackExtended, setIsFeedbackExtended] = useState(false);

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

    const handleToggleExtended = () => {
        setIsSettingExtended(false);
        setIsFeedbackExtended(false);
        setIsExtended(!isExtended);
        if (isSettingExtended) {
            setIsSettingExtended(false);
            setIsFeedbackExtended(false);
        }
    };

    const handleExtended = () => {
        setIsExtended(false);
        setIsFeedbackExtended(false);
        setIsSettingExtended(!isSettingExtended);
        if (isExtended) {
            setIsExtended(false);
            setIsFeedbackExtended(false);
        }
    };

    const handleFeedback = () => {
        setIsSettingExtended(false);
        setIsExtended(false);
        setIsFeedbackExtended(!feedbackExtended);
        if (feedbackExtended) {
            setIsSettingExtended(false);
            setIsExtended(false);
        }
    };

    const closeAll = () => {
        setIsExtended(false);
        setIsSettingExtended(false);
        setIsFeedbackExtended(false);
    };

    return (
        <M.MypageWrapper>
            <M.Section>
                <M.ContentContainer $isExtended={isExtended || isSettingExtended || feedbackExtended}>
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
                                    <M.SettingsIcon src={Settings} />
                                </M.InfoGroup>
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
                                    <M.Label>소속기관</M.Label>
                                </M.InfoTitle>
                                <M.InfoContent style={{padding: '10px'}}>
                                    <M.Value>부앙단</M.Value>
                                    <M.Value>example@email.com</M.Value>
                                    <M.Value>010-1234-5678</M.Value>
                                    <M.Value>여성</M.Value>
                                    <M.Value>1997-08-12</M.Value>
                                    <M.Value>덕성여자대학교</M.Value>
                                </M.InfoContent>
                            </M.InfoGroup>
                        </M.Item>
                    </M.Second>}
                    {isExtended && 
                    <M.Second>
                        <M.InLineTitle>
                            <M.Start>
                                <M.MatchingLabel>매칭 학생 목록</M.MatchingLabel>
                                <img src={Addstd} />
                            </M.Start>
                            <M.Start>
                                <img src={Close} onClick={closeAll} />
                            </M.Start>
                        </M.InLineTitle>
                        <M.Item>
                            <M.StdLine>
                                <M.StuProfile src={My} />
                                <M.InfoTitle>김망곰</M.InfoTitle>
                                <M.Blank><img src={Arrow} onClick={handleFeedback}/></M.Blank>
                            </M.StdLine>
                            <hr />
                            <M.StdLine>
                                <M.StuProfile src={My} />
                                <M.InfoTitle>김망곰</M.InfoTitle>
                                <M.Blank><img src={Arrow} onClick={handleFeedback} /></M.Blank>
                            </M.StdLine>
                            <hr />
                            <M.StdLine>
                                <M.StuProfile src={My} />
                                <M.InfoTitle>김망곰</M.InfoTitle>
                                <M.Blank><img src={Arrow} onClick={handleFeedback} /></M.Blank>
                            </M.StdLine>
                            <hr />
                            <M.StdLine>
                                <M.StuProfile src={My} />
                                <M.InfoTitle>김망곰</M.InfoTitle>
                                <M.Blank><img src={Arrow} onClick={handleFeedback} /></M.Blank>
                            </M.StdLine>
                            <hr />
                            <M.StdLine>
                                <M.StuProfile src={My} />
                                <M.InfoTitle>김망곰</M.InfoTitle>
                                <M.Blank><img src={Arrow} onClick={handleFeedback} /></M.Blank>
                            </M.StdLine>
                            <hr />
                            <M.StdLine>
                                <M.StuProfile src={My} />
                                <M.InfoTitle>김망곰</M.InfoTitle>
                                <M.Blank><img src={Arrow} onClick={handleFeedback} /></M.Blank>
                            </M.StdLine>
                        </M.Item>
                    </M.Second>}
                    {feedbackExtended && 
                        <M.Second>
                        <M.InLineTitle>
                            <M.Start>
                                <M.MatchingLabel>피드백</M.MatchingLabel>
                                <img src={Close} onClick={closeAll} />
                            </M.Start>
                        </M.InLineTitle>
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

export default MypageTchr;
