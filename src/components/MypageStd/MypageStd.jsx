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
import Back from '/src/assets/icon/back.svg';
import axios from 'axios';
import tem1 from '/src/assets/icon/template/template1icon.svg';
import tem2 from '/src/assets/icon/template/template2icon.svg';
import tem3 from '/src/assets/icon/template/template3icon.svg';
import tem4 from '/src/assets/icon/template/template4icon.svg';
import tem5 from '/src/assets/icon/template/template5icon.svg';
import ChartComponent from '../MypageTchr/ChartComponent';
import code from '/src/assets/image/code.svg';
import CodeModal from './CodeModal';
import { useNavigate } from 'react-router-dom';

const MypageStd = () => {
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
    const [profileImage, setProfileImage] = useState(My);
    const [isSettingPwExtended, setIsSettingPwExtended] = useState(false);
    const [isExtended, setIsExtended] = useState(false);
    const [studentInfo, setStudentInfo] = useState({});
    const [isSettingExtended, setIsSettingExtended] = useState(false);
    const [feedbackExtended, setIsFeedbackExtended] = useState(false);
    const [stdinfoExtended, setIsStdinfoExtended] = useState(false);
    const [isCodeModalOpen, setIsCodeModalOpen] = useState(false);
    const [students, setStudents] = useState([]);
    const [selectedStudentDetails, setSelectedStudentDetails] = useState(null);
    const [error, setError] = useState('');
    const [updatedName, setUpdatedName] = useState('');
    const [updatedEmail, setUpdatedEmail] = useState('');
    const [updatedPhoneNum, setUpdatedPhoneNum] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const navigate = useNavigate('');
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
        const fetchStudentInfo = async () => {
            try {
                const accessToken = localStorage.getItem("key");
                if (!accessToken) {
                    setError('Authentication required');
                    return;
                }
                const response = await axios.get('https://maeummal.com/user', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                });

                if (response.data.isSuccess) {
                    setStudentInfo(response.data.data);
                    setProfileImage(response.data.data.profileImage || My);
                } else {
                    throw new Error(response.data.message || 'Failed to fetch teacher info');
                }
            } catch (error) {
                console.error('Error fetching teacher info:', error);
                setError('Failed to fetch teacher info: ' + error.message);
            }
        };

        fetchStudentInfo();
    }, []);

    useEffect(() => {
        if (studentInfo) {
            setUpdatedName(studentInfo.name);
            setUpdatedEmail(studentInfo.email);
            setUpdatedPhoneNum(studentInfo.phoneNum);
        }
    }, [studentInfo]);

    const updateStudentInfo = async () => {
        try {
            const accessToken = localStorage.getItem("key");
            if (!accessToken) {
                setError('Authentication required');
                return;
            }
    
            const body = {
                name: updatedName,
                email: updatedEmail,
                phoneNum: updatedPhoneNum
            };
    
            const response = await axios.patch('https://thingproxy.freeboard.io/fetch/https://maeummal.com/user/student', body, {
                headers: { Authorization: `Bearer ${accessToken}` }
            });
    
            if (response.data.isSuccess) {
                setStudentInfo(response.data.data);
                console.log('Update success:', response.data.data);
                setIsSettingExtended(false); 
                alert("개인정보가 변경되었습니다."); 
            } else {
                throw new Error(response.data.message || 'Failed to update student info');
            }
        } catch (error) {
            console.error('Error updating student info:', error);
            setError('Failed to update student info: ' + error.message);
        }
    };
    const changePassword = async () => {
        const accessToken = localStorage.getItem("key");
        if (!accessToken) {
          setError('Authentication required');
          return;
        }
      
        try {
          const response = await axios.patch(
            `https://thingproxy.freeboard.io/fetch/https://maeummal.com/user/changePassword?currentPassword=${currentPassword}&newPassword=${newPassword}`,
            {}, 
            {
              headers: { Authorization: `Bearer ${accessToken}` }
            }
          );
      
          if (response.data.isSuccess) {
            alert('비밀번호가 성공적으로 변경되었습니다.');
          } else {
            throw new Error(response.data.message || 'Failed to change password');
          }
        } catch (error) {
          console.error('Error changing password:', error);
          setError('Failed to change password: ' + error.message);
        }
      };
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

        fetchStudentDetails(1);
    }, []);

    useEffect(() => {
        const fetchFullFeedback = async (studentId) => {
            try {
                const accessToken = localStorage.getItem("key");
                const response = await axios.get(`https://maeummal.com/feedback/all?id=${studentId}`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                });

                if (response.data.isSuccess) {
                    setSelectedStudentDetails(prevDetails => ({
                        ...prevDetails,
                        ...response.data.data,
                        fullFeedback: response.data.data
                    }));
                } else {
                    throw new Error(response.data.message || 'Failed to fetch full feedback');
                }
            } catch (error) {
                console.error('Error fetching full feedback:', error);
                setError('Failed to fetch full feedback: ' + error.message);
            }
        };

            fetchFullFeedback(1);
        }, []);
    
    // 학생 선택 시 전체 피드백 리스트 불러오기
    const handleSelectStudent = (studentId) => {
        fetchStudentDetails(studentId);
        fetchFullFeedback(studentId); // 전체 피드백 불러오기
        setIsStdinfoExtended(true);
    };

    const toggleCodeModal = () => {
        setIsCodeModalOpen(!isCodeModalOpen);
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
        setIsSettingPwExtended(false);
        setIsStdinfoExtended(false);
    };

    const handleExtended = () => {
        setIsExtended(false);
        setIsFeedbackExtended(false);
        setIsSettingExtended(!isSettingExtended);
        setIsSettingPwExtended(false);
        setIsStdinfoExtended(false);
    };

    const handlePwExtended = () => {
        setIsExtended(false);
        setIsFeedbackExtended(false);
        setIsSettingExtended(false);
        setIsSettingPwExtended(!isSettingPwExtended);
        setIsStdinfoExtended(false);
    };

    const handleFeedback = () => {
        setIsSettingExtended(false);
        setIsExtended(false);
        setIsSettingPwExtended(false);
        setIsFeedbackExtended(!feedbackExtended);
        setIsStdinfoExtended(false);
    };

    const closeAll = () => {
        setIsExtended(false);
        setIsSettingExtended(false);
        setIsSettingPwExtended(false);
        setIsFeedbackExtended(false);
        setIsStdinfoExtended(false);
    };
    // Define the function to update the profile image URL
    const updateProfileImage = (newImageUrl) => {
        setProfileImage(newImageUrl);
    };
    const navigateToFeedback = (templateName, feedbackId) => {
        console.log(`Navigating to feedback: Template = ${templateName}, ID = ${feedbackId}`);
      
        switch (templateName) {
          case "TEMPLATE1": // 카테고리 분류하기
            navigate("/feedbacktem1", { state: { feedbackId } });
            break;
          case "TEMPLATE2": // 이미지 순서 배열하기
            navigate("/feedbacktem2", { state: { feedbackId } });
            break;
          case "TEMPLATE3": // 감정 표현
            navigate("/feedbacktem3", { state: { feedbackId } });
            break;
          case "TEMPLATE4": // 이야기 순서 배열하기
            navigate("/feedbacktem4", { state: { feedbackId } });
            break;
          case "TEMPLATE5": // 어휘 카드 매칭 게임
            navigate("/feedbacktem5", { state: { feedbackId } });
            break;
          default:
            console.error(`No such template: ${templateName}`);
        }
      };
      
    return (
        <M.MypageWrapper>
            <M.Section>
                <M.ContentContainer $isExtended={isExtended || isSettingExtended || isSettingPwExtended || stdinfoExtended || feedbackExtended}>
                    <M.Content>
                        <M.InLine>
                            <M.Profile src={studentInfo.profileImage || My} />
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
                                        <M.Value>{studentInfo.name}</M.Value>
                                        <M.Value>{studentInfo.email}</M.Value>
                                        <M.Value>{studentInfo.phoneNum}</M.Value>
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
                                    <M.SettingsIcon src={Settings} onClick={handlePwExtended}/>
                                </M.InfoGroup>
                            </M.InfoItem>
                            <M.InfoItem style={{ maxHeight: '50px' }}>
                                <M.Label>피드백 목록</M.Label>
                                <M.MoreIcon src={More} onClick={handleFeedback} />
                            </M.InfoItem>
                            <img src={code} style={{marginLeft: '-80%', cursor: 'pointer'}} onClick={toggleCodeModal}/>
                        </M.InfoBox>
                    </M.Content>
                    {isSettingExtended && 
                    <M.Second style={{maxHeight: '90vh'}}>
                        <M.SecondLabel>개인정보 변경</M.SecondLabel>
                        <M.Item>
                            <M.InfoGroup style={{padding: '7%', border: '1px solid #eee', borderRadius: '5px', marginTop: '10%'}}>
                                <M.InfoTitle style={{padding: '10px'}}>
                                    <M.Label>이름</M.Label>
                                    <M.Label>이메일</M.Label>
                                    <M.Label>휴대폰 번호</M.Label>
                                </M.InfoTitle>
                                <M.InfoContent style={{padding: '10px'}}>
                                    <M.InfoChange
                                        type="text"
                                        value={updatedName}
                                        onChange={(e) => setUpdatedName(e.target.value)}
                                        placeholder="이름 입력"
                                    />
                                    <M.InfoChange
                                        type="email"
                                        value={updatedEmail}
                                        onChange={(e) => setUpdatedEmail(e.target.value)}
                                        placeholder="이메일 입력"
                                    />
                                    <M.InfoChange
                                        type="tel"
                                        value={updatedPhoneNum}
                                        onChange={(e) => setUpdatedPhoneNum(e.target.value)}
                                        placeholder="휴대폰 번호 입력"
                                    />
                                </M.InfoContent>
                            </M.InfoGroup>
                            <M.InfoButton onClick={updateStudentInfo} style={{marginTop: '10px'}}>저장하기</M.InfoButton>
                        </M.Item>
                    </M.Second>
                    }
                                        {isSettingPwExtended && 
                    <M.Second style={{maxHeight: '90vh'}}>
                        <M.SecondLabel>비밀번호 변경</M.SecondLabel>
                        <M.Item>
                            <M.InfoGroup style={{padding: '7%', border: '1px solid #eee', borderRadius: '5px', marginTop: '10%'}}>
                                <M.InfoTitle style={{padding: '10px'}}>
                                    <M.Label>현재 비밀번호</M.Label>
                                    <M.Label>새 비밀번호</M.Label>
                                </M.InfoTitle>
                                <M.InfoContent style={{padding: '10px'}}>
                                    <M.InfoChange
                                        type="password"
                                        value={currentPassword}
                                        onChange={e => setCurrentPassword(e.target.value)}
                                        placeholder="현재 비밀번호"
                                    />
                                    <M.InfoChange
                                        type="password"
                                        value={newPassword}
                                        onChange={e => setNewPassword(e.target.value)}
                                        placeholder="새 비밀번호"
                                    />
                                </M.InfoContent>
                            </M.InfoGroup>
                            <M.InfoButton onClick={changePassword} style={{marginTop: '10px'}}>변경하기</M.InfoButton>
                        </M.Item>
                    </M.Second>
                    }
                    {stdinfoExtended && selectedStudentDetails && (
                    <M.Second style={{paddingTop: '1.7%',  justifyContent: 'center'}}>
                        <M.DetailTitle style={{ maxWidth: '100%', justifyContent: 'center'}}>
                            <M.DetailLabel>
                                <M.StuProfile src={studentInfo.profileImage} />
                                <M.InfoTitle>{studentInfo.name}</M.InfoTitle>
                            </M.DetailLabel>
                        </M.DetailTitle>
                        <M.Item style={{maxWidth: '100%'}}>
                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginBottom: '2.5%' }}>
                                <p style={{ whiteSpace: 'nowrap', marginLeft: '0px', fontSize: '1.2rem' }}>학생 정보</p>
                                <div style={{ width: '100px' }}></div>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', gap: '2%' }}>
                                <M.InfoFeed style={{ whiteSpace: 'nowrap' }}>{studentInfo.iq}</M.InfoFeed>
                                <M.InfoFeed style={{ whiteSpace: 'nowrap' }}>{studentInfo.phoneNum}</M.InfoFeed>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginBottom: '2.5%' }}>
                                <p style={{ whiteSpace: 'nowrap', marginLeft: '0px', fontSize: '1.2rem' }}>피드백 목록</p>
                                <M.MoreIcon src={More} onClick={handleFeedback} />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', gap: '2%' }}>
                            {selectedStudentDetails.fullFeedback?.slice(0, 2).map(feedback => (
                                <M.InfoFeed key={feedback.id}>
                                    <M.FeedTitle>
                                        <M.Start style={{ alignItems: 'center', marginBottom: '2%', gap: '15%' }}>
                                            <img style={{ maxWidth: '20px' }} src={getTemplateIcon(feedback.templateType)} alt="템플릿 아이콘"></img>
                                            <p style={{ whiteSpace: 'nowrap', fontSize: '1.1rem' }}>{feedback.title || '제목 없음'}</p>
                                        </M.Start>
                                    </M.FeedTitle>
                                    <M.InfoGroup style={{ fontFamily: 'sans-serif', textAlign: 'left', textOverflow: 'ellipsis' }}>{feedback.aiFeedback.length > 70 ? `${feedback.aiFeedback.substring(0, 70)}...` : feedback.aiFeedback}</M.InfoGroup>
                                </M.InfoFeed>    
                            ))}</div>
                            <div>
                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginBottom: '2.5%' }}>
                                <p style={{ whiteSpace: 'nowrap', marginLeft: '0px', fontSize: '1.2rem' }}>템플릿 차트</p>
                                <M.MoreIcon style={{display: 'none'}} src={More} />
                            </div>                                  
                                {selectedStudentDetails.templateChart && (
                                    <ChartComponent chartData={selectedStudentDetails.templateChart} />
                                )}
                            </div>
                        </M.Item>
                    </M.Second>
                )}

                {feedbackExtended && selectedStudentDetails && (
                <M.Second style={{ paddingTop: '1.7%', maxHeight: '90vh' }}>
                    <M.DetailTitle style={{ maxWidth: '100%', justifyContent: 'space-between'}}>
                        <img src={Back} onClick={handleToggleExtended} alt="Back to main" />
                        <M.DetailLabel>
                            <M.StuProfile src={studentInfo.profileImage || My} />
                            <M.InfoTitle>{studentInfo.name} 학생</M.InfoTitle>
                        </M.DetailLabel>
                        <img style={{ marginRight: '-50px'}} src={Close} onClick={closeAll} />
                    </M.DetailTitle>
                    <M.Item>
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', gap: '60%', marginBottom: '2.5%' }}>
                            <p style={{ whiteSpace: 'nowrap', marginLeft: '-140px', fontSize: '1.2rem' }}>피드백 목록</p>
                            <div style={{ width: '100px' }}></div>
                        </div>
                        {selectedStudentDetails.fullFeedback?.map(feedback => (
                            <M.InfoFeed
                                key={feedback.id} 
                                onClick={() => navigateToFeedback(feedback.templateType, feedback.id)} // 클릭 시 navigateToFeedback 함수 호출
                                style={{ cursor: 'pointer' }} // 클릭 가능한 영역으로 표시
                                >
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
                updateProfileImage={handleAddImage}
            />
            <CodeModal
                isOpen={isCodeModalOpen}
                toggleModal={toggleCodeModal} 
            />
        </M.MypageWrapper>
    );
};

export default MypageStd;
