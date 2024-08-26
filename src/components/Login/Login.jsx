import React, { useState, useEffect, useContext } from 'react'; // useContext 추가
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import * as L from './LoginStyle';
import Logo from '/src/assets/image/logo.svg';
import { useAuth } from '/contexts/AuthContext'; // AuthContext 사용을 위한 임포트

const Login = () => {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth(); // AuthContext에서 login 함수 사용
  const [error, setError] = useState('');

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePw = (e) => setPw(e.target.value);

  const onClickConfirmButton = async () => {
    try {
      const response = await axios.post("https://maeummal.com/auth/signin", {
        email: email,
        password: pw,
      }, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      const { token, id } = response.data.data;
      if (response.status === 200 && token) {
        login(token, id); // AuthContext를 통한 로그인 상태 관리
        fetchUserInfo(token); // 사용자 정보 가져오기
      } else {
        alert("로그인에 실패했습니다.");
      }
    } catch (error) {
      console.error("로그인 요청 중 오류 발생:", error);
      alert("로그인 실패: " + (error.response?.data?.message || "네트워크 오류"));
    }
  };

  // 사용자 정보를 가져오는 함수
  const fetchUserInfo = async (token) => {
    try {
      const response = await axios.get('https://maeummal.com/user', {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.data.isSuccess) {
        const userData = response.data.data;
        navigate(userData.iq != null ? '/mainstd' : '/maintchr');
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.error('Error fetching user info:', error);
      setError('Failed to fetch user info: ' + (error.message || "Server Error"));
    }
  };

  return (
    <L.AppContainer>
      <L.Logo>
        <p>마음말</p>
        <img src={Logo} alt="Logo" />
      </L.Logo>
      <L.LoginWrapper>
        <L.Page>
          <L.TitleWrap>
            <p>로그인</p>
          </L.TitleWrap>
          <L.InputTitle>이메일</L.InputTitle>
          <L.InputWrap>
            <L.Input
              value={email}
              type="text"
              placeholder="email"
              onChange={handleEmail}
            />
          </L.InputWrap>
          <L.InputTitle>비밀번호</L.InputTitle>
          <L.InputWrap>
            <L.Input
              value={pw}
              type="password"
              placeholder="password"
              onChange={handlePw}
            />
          </L.InputWrap>
          <L.BottomButton onClick={onClickConfirmButton}>로그인</L.BottomButton>
          <L.NoAccount>
            <a href="/forgotid">아이디 찾기</a> | <a href="/resetpw">비밀번호 찾기</a> | <a href="/Select">회원가입</a>
          </L.NoAccount>
        </L.Page>
      </L.LoginWrapper>
    </L.AppContainer>
  );
};

export default Login;
