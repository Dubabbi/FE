import React, { useState, useEffect } from 'react';
import * as M from '../MypageTchr/MypageStyle';
import My from '/src/assets/image/profile.svg';
import Upload from '/src/assets/icon/uploadphoto.svg';
import Settings from '/src/assets/icon/settings.svg'; 
import More from '/src/assets/icon/more.svg'; 
import Arrow from '/src/assets/icon/mypagearrow.svg'; 
import UploadPhoto from '../MypageTchr/UploadPhoto';
import Addstd from '/src/assets/icon/addstd.svg';
import Close from '/src/assets/icon/closebtn.svg';
import StdModal from '../MypageTchr/MatchingModal';
import Back from '/src/assets/icon/back.svg';
import axios from 'axios';
import tem1 from '/src/assets/icon/template/template1icon.svg';
import tem2 from '/src/assets/icon/template/template2icon.svg';
import tem3 from '/src/assets/icon/template/template3icon.svg';
import tem4 from '/src/assets/icon/template/template4icon.svg';
import tem5 from '/src/assets/icon/template/template5icon.svg';
import ChartComponent from '../MypageTchr/ChartComponent';

const MypageStd = () => {
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
    const [profileImage, setProfileImage] = useState(My);
    const [isExtended, setIsExtended] = useState(false);
    const [isSettingExtended, setIsSettingExtended] = useState(false);
    const [feedbackExtended, setIsFeedbackExtended] = useState(false);
    const [stdinfoExtended, setIsStdinfoExtended] = useState(false);
    const [isMatchingModalOpen, setIsMatchingModalOpen] = useState(false);
    const [students, setStudents] = useState([]);
    const [selectedStudentDetails, setSelectedStudentDetails] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const accessToken = localStorage.getItem("key");
                if (!accessToken) {
                    setError('Authentication required');
                    return;
                }
                const response = await axios.get('https://maeummal.com/api/match/students', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                });

                if (response.data.isSuccess) {
                    setStudents(response.data.data);
                } else {
                    throw new Error(response.data.message || 'Failed to fetch students');
                }
            } catch (error) {
                console.error('Error fetching students:', error);
                setError('Failed to fetch students: ' + error.message);
            }
        };
    
        fetchStudents();
    }, []);

    useEffect(() => {
        const fetchStudentDetails = async (studentId) => {
            try {
                const accessToken = localStorage.getItem("key");
                if (!accessToken) {
                    setError('Authentication required');
                    return;
                }
                const response = await axios.get(`https://maeummal.com/api/match/get?studentId=${studentId}`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                });

                if (response.data.isSuccess) {
                    setSelectedStudentDetails(response.data.data);
                } else {
                    throw new Error(response.data.message || 'Failed to fetch student details');
                }
            } catch (error) {
                console.error('Error fetching student details:', error);
                setError('Failed to fetch student details: ' + error.message);
            }
        };

        // Assuming a default student ID for demo purposes
        fetchStudentDetails(25);
    }, []);

    const handleSelectStudent = (studentId) => {
        fetchStudentDetails(studentId);
        setIsStdinfoExtended(true);
    };

    const toggleMatchingModal = () => {
        setIsMatchingModalOpen(!isMatchingModalOpen);
    };
    const toggleUploadModal = () => {
        setIsUploadModalOpen(!isUploadModalOpen);
    };

    const getTemplateIcon = (templateType) => {
        switch(templateType) {
            case 'TEMPLATE1': return tem1;
            case 'TEMPLATE2': return tem2;
            case 'TEMPLATE3': return tem3;
            case 'TEMPLATE4': return tem4;
            case 'TEMPLATE5': return tem5;
            default: return tem1;
        }
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
        setIsStdinfoExtended(false);
    };

    const handleExtended = () => {
        setIsExtended(false);
        setIsFeedbackExtended(false);
        setIsSettingExtended(!isSettingExtended);
        setIsStdinfoExtended(false);
    };

    const handleStdinfo = () => {
        setIsSettingExtended(false);
        setIsExtended(false);
        setIsStdinfoExtended(!stdinfoExtended);
        setIsFeedbackExtended(false);
    };

    const handleFeedback = () => {
        setIsSettingExtended(false);
        setIsExtended(false);
        setIsFeedbackExtended(!feedbackExtended);
        setIsStdinfoExtended(false);
    };

    const closeAll = () => {
        setIsExtended(false);
        setIsSettingExtended(false);
        setIsFeedbackExtended(false);
        setIsStdinfoExtended(false);
    };

    return (
        <M.MypageWrapper>
            <M.Section>
                <M.ContentContainer $isExtended={isExtended || isSettingExtended || stdinfoExtended || feedbackExtended}>
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
                                        <M.Value>김학생</M.Value>
                                        <M.Value>gkrtod@email.com</M.Value>
                                        <M.Value>01011111111</M.Value>
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
                                <img src={Addstd} onClick={toggleMatchingModal} alt="Add Student" />
                            </M.Start>
                            <M.Start>
                                <img src={Close} onClick={closeAll} />
                            </M.Start>
                        </M.InLineTitle>
                        <M.Item>
                        {students.length > 0 ? (
                                students.map(student => (
                                    <div key={student.studentId} style={{width: '100%'}}>
                                        <M.StdLine style={{justifyContent: 'space-between', width: '100%'}}>
                                            <M.StuProfile src={student.profileImage} />
                                            <M.InfoTitle>{student.name}</M.InfoTitle>
                                            <M.Blank><img src={Arrow} onClick={handleStdinfo}/></M.Blank>
                                        </M.StdLine>
                                    </div>
                                ))
                            ) : (
                                <>
                                <p style={{marginTop: '3%'}}>매칭된 학생이 없습니다. </p>
                                </>
                            )}
                        </M.Item>
                    </M.Second>}
                    {stdinfoExtended && selectedStudentDetails && (
                    <M.Second style={{paddingTop: '1.7%'}}>
                        <M.DetailTitle style={{ maxWidth: '100%', justifyContent: 'space-between'}}>
                            <img src={Back} onClick={handleToggleExtended} alt="Back to main" />
                            <M.DetailLabel>
                                <M.StuProfile src={selectedStudentDetails.profileImage || My} />
                                <M.InfoTitle>{selectedStudentDetails.name}</M.InfoTitle>
                            </M.DetailLabel>
                            <img style={{ marginRight: '-50px'}} src={Close} onClick={closeAll} />
                        </M.DetailTitle>
                        <M.Item style={{maxWidth: '100%'}}>
                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginBottom: '2.5%' }}>
                                <p style={{ whiteSpace: 'nowrap', marginLeft: '0px', fontSize: '1.2rem' }}>학생 정보</p>
                                <div style={{ width: '100px' }}></div>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', gap: '2%' }}>
                                <M.InfoFeed style={{ whiteSpace: 'nowrap' }}>{selectedStudentDetails.iq}</M.InfoFeed>
                                <M.InfoFeed style={{ whiteSpace: 'nowrap' }}>{selectedStudentDetails.phoneNumber}</M.InfoFeed>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginBottom: '2.5%' }}>
                                <p style={{ whiteSpace: 'nowrap', marginLeft: '0px', fontSize: '1.2rem' }}>피드백 목록</p>
                                <M.MoreIcon src={More} onClick={handleFeedback} />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', gap: '2%' }}>
                            {selectedStudentDetails.feedbackTwo.map(feedback => (
                                <M.InfoFeed style={{width: '50%'}} key={feedback.id}>
                                    <M.FeedTitle>
                                        <M.Start style={{ alignItems: 'center', marginBottom: '2%', gap: '15%' }}>
                                            <img style={{ maxWidth: '20px' }} src={getTemplateIcon(feedback.templateType)} alt="Template Icon"></img>
                                            <p style={{ whiteSpace: 'nowrap', fontSize: '1.1rem' }}>{feedback.title || 'Untitled'}</p>
                                        </M.Start>
                                    </M.FeedTitle>
                                    <M.InfoGroup style={{ fontFamily: 'sans-serif', textAlign: 'left', textOverflow: 'ellipsis' }}>{feedback.aiFeedback.length > 70 ? `${feedback.aiFeedback.substring(0, 70)}...` : feedback.aiFeedback}</M.InfoGroup>
                                </M.InfoFeed>    
                            ))}</div>
                            <div>                                  
                                {selectedStudentDetails.templateChart && (
                                    <ChartComponent chartData={selectedStudentDetails.templateChart} />
                                )}
                            </div>
                        </M.Item>
                    </M.Second>
                )}
                {/* Feedback Expanded View */}

                {feedbackExtended && selectedStudentDetails && (
                    <M.Second style={{ paddingTop: '1.7%' }}>
                        <M.DetailTitle style={{ maxWidth: '100%', justifyContent: 'space-between'}}>
                            <img src={Back} onClick={handleToggleExtended} alt="Back to main" />
                            {selectedStudentDetails && (
                            <M.DetailLabel>
                                <M.StuProfile src={selectedStudentDetails.profileImage || My} />
                                <M.InfoTitle>{selectedStudentDetails.name} 학생</M.InfoTitle>
                            </M.DetailLabel>
                            )}
                            <img style={{ marginRight: '-50px'}} src={Close} onClick={closeAll} />
                        </M.DetailTitle>
                        <M.Item>
                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', gap: '60%', marginBottom: '2.5%' }}>
                                <p style={{ whiteSpace: 'nowrap', marginLeft: '-140px', fontSize: '1.2rem' }}>피드백 목록</p>
                                <div style={{ width: '100px' }}></div>
                            </div>
                            {selectedStudentDetails.feedbackTwo.map(feedback => (
                                <M.InfoFeed key={feedback.id}>
                                    <M.FeedTitle>
                                        <M.Start style={{ alignItems: 'center', marginBottom: '2%', gap: '15%' }}>
                                            <img style={{ maxWidth: '20px' }} src={getTemplateIcon(feedback.templateType)} alt="Template Icon"></img>
                                            <p style={{ whiteSpace: 'nowrap', fontSize: '1.1rem' }}>{feedback.title || 'Untitled'}</p>
                                        </M.Start>
                                        <p style={{ marginBottom: '2%' }}>{new Date(feedback.createdAt).toLocaleDateString()}</p>
                                    </M.FeedTitle>
                                    <M.InfoGroup style={{ fontFamily: 'sans-serif', textAlign: 'left' }}>{feedback.aiFeedback}</M.InfoGroup>
                                </M.InfoFeed>
                            ))}
                        </M.Item>
                    </M.Second>
                )}
                </M.ContentContainer>
            </M.Section>
            <UploadPhoto 
                isOpen={isUploadModalOpen}
                toggleModal={toggleUploadModal}
                handleAddImage={handleAddImage}
            />
            <StdModal
                isOpen={isMatchingModalOpen}
                toggleModal={toggleMatchingModal} 
            />
        </M.MypageWrapper>
    );
};

export default MypageStd;
