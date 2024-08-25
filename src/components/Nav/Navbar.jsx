import { React, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Logo from '/src/assets/image/logo.svg';
import My from '/src/assets/image/profile.svg';
import Modal from '../Nav/LoginModal';
import axios from 'axios';

export default function Nav() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profileName, setProfileName] = useState('Guest');
  const [profileImage, setProfileImage] = useState(My);
  const [showModal, setShowModal] = useState(false); // 모달 상태 추가
  const [userInfo, setUserInfo] = useState({});
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserInfo = async () => {
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
                setUserInfo(response.data.data);
                setProfileImage(response.data.data.profileImage);
            } else {
                throw new Error(response.data.message || 'Failed to fetch teacher info');
            }
        } catch (error) {
            console.error('Error fetching teacher info:', error);
            setError('Failed to fetch teacher info: ' + error.message);
        }
    };

    fetchUserInfo();
}, []);

  useEffect(() => {
    const token = localStorage.getItem('key');
    console.log("토큰:", token);
    if (token) {
      setIsLoggedIn(true);
      setProfileName('부앙단 선생님');
    } else {
      setIsLoggedIn(false);
      setProfileName('Guest');
      setShowModal(true);
    }
  }, []);
  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
    <TopWrapper>
      <Header>
        <Link to="/MainTchr">
          <Title>
            <img src={Logo} alt="마음말 로고" />
            마음말
          </Title>
        </Link>
      </Header>
      <LinkWrapper><a href='/mypagetchr'>
        <ProfileCard>
          <ProfileName>{userInfo.name} 선생님</ProfileName>
          <ProfileImageContainer>
            <ProfileImage src={profileImage} alt="프로필 이미지" />
            <CrownIcon>👑</CrownIcon>
          </ProfileImageContainer>
        </ProfileCard></a>
      </LinkWrapper>
    </TopWrapper>
          {!isLoggedIn && showModal && (
            <Modal showModal={showModal} closeModal={closeModal} />
          )}
          </>
  );
}

const TopWrapper = styled.div`
  position: fixed;
  background-color: #ACAACC;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1000;
  padding: 1rem 1rem;
  margin-bottom: 2rem;
`;

const LinkWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
`;

const Title = styled.div`
  font-size: 2.5rem;
  display: flex;
  align-items: center;
  margin-left: 20px;
  color: white;

  img {
    max-width: 40px;
    margin-right: 6px;
  }
`;

const ProfileCard = styled.div`
  display: flex;
  align-items: center;
  background-color: #ffffff;
  border-top-left-radius: 30px;
  border-bottom-left-radius: 30px;
  padding: 10px 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 1.2em;
  margin-right: 30px;
  position: relative;
`;

const ProfileName = styled.div`
  font-weight: bold;
  color: #333333;
  margin-right: 10px;
`;

const ProfileImageContainer = styled.div`
  position: absolute;
  right: -30px;
  top: 50%;
  transform: translateY(-50%);
  width: 50px;
  height: 50px;
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 4px solid #FEEAFA;
`;

const CrownIcon = styled.span`
  position: absolute;
  top: -10px;
  right: -5px;
  font-size: 1.5em;
`;
