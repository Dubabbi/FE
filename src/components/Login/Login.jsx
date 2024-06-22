// Login.jsx
import React from 'react';
import * as L from './LoginStyle';
import Logo from '/src/assets/image/logo.svg'

const Login = () => {
  return (
    <L.AppContainer>
    <L.Logo>
    <p>마음말</p>
    <img src={Logo} alt = "마음말 로고"/>
    </L.Logo>
    <L.LoginWrapper>
      <L.Page>
      <L.TitleWrap>
          <p>로그인</p>       
      </L.TitleWrap>
      <L.InputTitle>
        아이디
      </L.InputTitle>
          <L.InputWrap>
            <L.Input
              type="text"
              placeholder="id"
            />
          </L.InputWrap>
          <L.InputTitle>
          <p>비밀번호</p>       
          </L.InputTitle>
          <L.InputWrap>
            <L.Input
              type="password"
              placeholder="Password"
            />
          </L.InputWrap>
            <L.BottomButton>
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