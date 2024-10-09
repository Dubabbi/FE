import React, { useState, useEffect } from 'react';
import * as M from './MypageStyle';
import { useNavigate } from 'react-router-dom';
import My from '/src/assets/image/profile.svg';
import Upload from '/src/assets/icon/uploadphoto.svg';
import Settings from '/src/assets/icon/settings.svg'; 
import More from '/src/assets/icon/more.svg'; 
import Arrow from '/src/assets/icon/mypagearrow.svg'; 
import UploadPhoto from './UploadPhoto';
import Addstd from '/src/assets/icon/addstd.svg';
import Close from '/src/assets/icon/closebtn.svg';
import StdModal from './MatchingModal';
import Back from '/src/assets/icon/back.svg';
import axios from 'axios';
import tem1 from '/src/assets/icon/template/template1icon.svg';
import tem2 from '/src/assets/icon/template/template2icon.svg';
import tem3 from '/src/assets/icon/template/template3icon.svg';
import tem4 from '/src/assets/icon/template/template4icon.svg';
import tem5 from '/src/assets/icon/template/template5icon.svg';
import ChartComponent from './ChartComponent';
import call from '/src/assets/icon/phone.svg';

const MypageTchr = () => {
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
    const [profileImage, setProfileImage] = useState(My);
    const [isExtended, setIsExtended] = useState(false);
    const [isSettingExtended, setIsSettingExtended] = useState(false);
    const [isSettingPwExtended, setIsSettingPwExtended] = useState(false);
    const [feedbackExtended, setIsFeedbackExtended] = useState(false);
    const [stdinfoExtended, setIsStdinfoExtended] = useState(false);
    const [isMatchingModalOpen, setIsMatchingModalOpen] = useState(false);
    const [students, setStudents] = useState([]);
    const [teacherInfo, setTeacherInfo] = useState({});
    const [selectedStudentDetails, setSelectedStudentDetails] = useState(null);
    const [error, setError] = useState('');
    const [updatedName, setUpdatedName] = useState('');
    const [updatedEmail, setUpdatedEmail] = useState('');
    const [updatedPhoneNum, setUpdatedPhoneNum] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');


    useEffect(() => {
        const fetchTeacherInfo = async () => {
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
                    setTeacherInfo(response.data.data);
                    setProfileImage(response.data.data.profileImage || My);
                } else {
                    throw new Error(response.data.message || 'Failed to fetch teacher info');
                }
            } catch (error) {
                console.error('Error fetching teacher info:', error);
                setError('Failed to fetch teacher info: ' + error.message);
            }
        };

        fetchTeacherInfo();
    }, []);


    const updateTeacherInfo = async () => {
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
    
            const response = await axios.patch('https://maeummal.com/user/teacher', body, {
                headers: { Authorization: `Bearer ${accessToken}` }
            });
    
            if (response.data.isSuccess) {
                setTeacherInfo(response.data.data);  // Update the teacher info with the response
                console.log('Update success:', response.data.data);
                setIsSettingExtended(false); 
            
                alert("개인정보가 변경되었습니다."); 
            } else {
                throw new Error(response.data.message || 'Failed to update teacher info');
            }
        } catch (error) {
            console.error('Error updating teacher info:', error);
            setError('Failed to update teacher info: ' + error.message);
        }
    };
    useEffect(() => {
        if (teacherInfo) {
            setUpdatedName(teacherInfo.name);
            setUpdatedEmail(teacherInfo.email);
            setUpdatedPhoneNum(teacherInfo.phoneNum);
        }
    }, [teacherInfo]);
    const changePassword = async () => {
        const accessToken = localStorage.getItem("key");
        if (!accessToken) {
          setError('Authentication required');
          return;
        }
      
        try {
          const response = await axios.patch(
            `https://maeummal.com/user/changePassword?currentPassword=${currentPassword}&newPassword=${newPassword}`,
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
    const navigate = useNavigate('');
    
    // 학생 선택 시 전체 피드백 리스트 불러오기
    const handleSelectStudent = async (studentId) => {
        try {
            const accessToken = localStorage.getItem("key");
            if (!accessToken) {
                setError('Authentication required');
                return;
            }
    
            await fetchStudentDetails(studentId);
            await fetchFullFeedback(studentId); 
    
            setIsStdinfoExtended(true);
            setIsExtended(false);
            setIsSettingExtended(false);
            setIsSettingPwExtended(false);
        } catch (error) {
            console.error('Failed to fetch student details or feedback:', error);
            setError(error.message);
        }
    };
    
    // 학생 상세 정보를 불러오는 함수
    const fetchStudentDetails = async (studentId) => {
        const accessToken = localStorage.getItem("key");
        if (!accessToken) {
            setError('Authentication required');
            return;
        }
        const response = await axios.get(`https://maeummal.com/api/match/get?studentId=${studentId}`, {
            headers: { Authorization: `Bearer ${accessToken}` }
        });
    
        if (response.data.isSuccess) {
            setSelectedStudentDetails(response.data.data);
        } else {
            throw new Error(response.data.message || 'Failed to fetch student details');
        }
    };
    
    // 학생의 피드백 정보를 불러오는 함수
    const fetchFullFeedback = async (studentId) => {
        const accessToken = localStorage.getItem("key");
        if (!accessToken) {
            setError('Authentication required');
            return;
        }
        const response = await axios.get(`https://maeummal.com/feedback/all?id=${studentId}`, {
            headers: { Authorization: `Bearer ${accessToken}` }
        });
    
        if (response.data.isSuccess) {
            const sortedFeedback = response.data.data.sort((a, b) => 
                new Date(b.createdAt) - new Date(a.createdAt)
            );
            setSelectedStudentDetails(prevDetails => ({
                ...prevDetails,
                fullFeedback: sortedFeedback
            }));
        } else {
            throw new Error(response.data.message || 'Failed to fetch full feedback');
        }
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

    const handleStdinfo = () => {
        setIsSettingExtended(false);
        setIsExtended(false);
        setIsStdinfoExtended(!stdinfoExtended);
        setIsSettingPwExtended(false);
        setIsFeedbackExtended(false);
    };

    const handleFeedback = () => {
        setIsSettingExtended(false);
        setIsExtended(false);
        setIsFeedbackExtended(!feedbackExtended);
        setIsSettingPwExtended(false);
        setIsStdinfoExtended(false);
    };

    const closeAll = () => {
        setIsExtended(false);
        setIsSettingExtended(false);
        setIsFeedbackExtended(false);
        setIsSettingPwExtended(false);
        setIsStdinfoExtended(false);
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
                                        <M.Value>{teacherInfo.name}</M.Value>
                                        <M.Value>{teacherInfo.email}</M.Value>
                                        <M.Value>{teacherInfo.phoneNum}</M.Value>
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
                            <M.InfoButton onClick={updateTeacherInfo} style={{marginTop: '10px'}}>변경하기</M.InfoButton>
                        </M.Item>
                    </M.Second>
                    }
                    {isSettingPwExtended && 
                    <M.Second>
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
                                            <M.StuProfile src={student.profileImage || My} />
                                            <M.InfoTitle>{student.name} 학생</M.InfoTitle>
                                            <M.Blank><img src={Arrow} onClick={() => handleSelectStudent(student.studentId)}/></M.Blank>
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
                        <M.DetailTitle>
                            <img src={Back} onClick={handleToggleExtended} alt="Back to main" style={{ cursor: 'pointer' }} />
                            <M.DetailLabel>
                                <M.StuProfile src={selectedStudentDetails.profileImage || My} />
                                <M.InfoTitle>{selectedStudentDetails.name} 학생</M.InfoTitle>
                            </M.DetailLabel>
                            <img src={Close} onClick={closeAll} style={{ cursor: 'pointer', maxWidth: '30px' }} alt="Close" />
                        </M.DetailTitle>
                        <M.Item style={{maxWidth: '100%'}}>
                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', 
                                        width: '100%', marginBottom: '2.5%' }}>
                                <p style={{ whiteSpace: 'nowrap', marginLeft: '0px', fontSize: '1.2rem' }}>학생 정보</p>
                                <div style={{ width: '100px' }}></div>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', gap: '2%' }}>
                                <M.InfoFeed style={{ paddingTop: '4%',whiteSpace: 'nowrap' }}>{selectedStudentDetails.iq}</M.InfoFeed>
                                <M.InfoFeed style={{ paddingTop: '4%',whiteSpace: 'nowrap', flexDirection: 'row', justifyContent:'center', width: '100%', gap: '1%' }}>
                                    <img src={call} style={{ maxWidth: '15px' }}/>{selectedStudentDetails.phoneNumber}
                                </M.InfoFeed>
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
                                <M.MoreIcon src={More} style={{display: 'none'}}/>
                            </div>                                 
                                {selectedStudentDetails.templateChart && (
                                    <ChartComponent chartData={selectedStudentDetails.templateChart} />
                                )}
                            </div>
                        </M.Item>
                    </M.Second>
                )}
                {/* Feedback Expanded View */}

                {feedbackExtended && selectedStudentDetails && (
                <M.Second style={{ paddingTop: '1.7%'}}>
                    <M.DetailTitle style={{ maxWidth: '100%', justifyContent: 'space-between'}}>
                        <img src={Back} style={{maxWidth: '30px', cursor: 'pointer'}} onClick={handleToggleExtended} alt="Back to main" />
                        <M.DetailLabel>
                            <M.StuProfile src={selectedStudentDetails.profileImage || My} />
                            <M.InfoTitle>{selectedStudentDetails.name} 학생</M.InfoTitle>
                        </M.DetailLabel>
                        <img src={Close} style={{maxWidth: '30px', cursor: 'pointer'}} onClick={closeAll} />
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
            <StdModal
                isOpen={isMatchingModalOpen}
                toggleModal={toggleMatchingModal} 
            />
        </M.MypageWrapper>
    );
};

export default MypageTchr;
