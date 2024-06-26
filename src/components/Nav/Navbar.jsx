import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Logo from '/src/assets/image/logo.svg';
import My from '/src/assets/image/profile.svg';

export default function Nav() {
  return (
    <TopWrapper>
      <Header>
        <Link to="/MainTchr">
          <Title>
            <img src={Logo} alt="마음말 로고" />
            마음말
          </Title>
        </Link>
      </Header>
      <LinkWrapper>
        <ProfileCard>
          <ProfileName>부앙단 선생님</ProfileName>
          <ProfileImageContainer>
            <ProfileImage src={My} alt="프로필 이미지" />
            <CrownIcon>👑</CrownIcon>
          </ProfileImageContainer>
        </ProfileCard>
      </LinkWrapper>
    </TopWrapper>
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
  right: -30px; /* Adjust this value to position the image */
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
