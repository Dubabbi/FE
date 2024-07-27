import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import axios from 'axios';
import * as L from './LoginStyle';
import Logo from '/src/assets/image/logo.svg';

const Login = () => {
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const navigate = useNavigate();

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePw = (e) => {
    setPw(e.target.value);
  };

  const onClickConfirmButton = async () => {
    try {
      console.log('로그인 시도:', { email, password: pw }); // 요청 데이터 확인
      const response = await axios.post(
        '/api/auth/signin',
        {
          email: email,
          password: pw,
        },
        {
          withCredentials: true,
        }
      );

      console.log('서버 응답:', response); // 응답 데이터 확인

      if (response.status === 200 && response.data.token) {
        // 로그인 성공 시
        localStorage.setItem('key', response.data.token);
        alert('로그인에 성공했습니다.');

        navigate('/maintchr');
      } else {
        // 로그인 실패 시
        alert('로그인에 실패했습니다.');
      }
    } catch (error) {
      if (error.response) {
        // 서버 응답이 있는 경우
        console.error('에러 응답 데이터:', error.response.data);
        if (error.response.status === 400) {
          // 가입되지 않은 사용자
          alert('등록되지 않은 회원입니다.');
        } else if (error.response.status === 401) {
          // 인증 실패
          alert('인증에 실패하였습니다. 이메일과 비밀번호를 확인하세요.');
        } else {
          // 기타 서버 오류
          alert('로그인에 실패했습니다. 서버 오류가 발생했습니다.');
        }
      } else {
        // 서버 응답이 없는 경우
        alert('로그인에 실패했습니다. 서버에 연결할 수 없습니다.');
        console.error('에러 메시지:', error.message);
      }
    }
  };

  return (
    <L.AppContainer>
      <L.Logo>
        <p>마음말</p>
        <img src={Logo} alt="마음말 로고"/>
      </L.Logo>
      <L.LoginWrapper>
        <L.Page>
          <L.TitleWrap>
            <p>로그인</p>
          </L.TitleWrap>
          <L.InputTitle>
            이메일
          </L.InputTitle>
          <L.InputWrap>
            <L.Input
              value={email}
              type="text"
              placeholder="email"
              onChange={handleEmail}
            />
          </L.InputWrap>
          <L.InputTitle>
            <p>비밀번호</p>
          </L.InputTitle>
          <L.InputWrap>
            <L.Input
              value={pw}
              type="password"
              placeholder="password"
              onChange={handlePw}
            />
          </L.InputWrap>
          <L.BottomButton onClick={onClickConfirmButton}>
            로그인
          </L.BottomButton>
          <L.NoAccount>
            <a href="/forgotid">아이디 찾기</a>
            <p>|</p>
            <a href="/resetpw">비밀번호 찾기</a>
            <p>|</p>
            <a href="/Select">회원가입</a>
          </L.NoAccount>
        </L.Page>
      </L.LoginWrapper>
    </L.AppContainer>
  );
};

export default Login;
