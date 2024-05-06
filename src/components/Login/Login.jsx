// Login.jsx
import React from 'react';
import * as L from './LoginStyle';
import Star from '/src/assets/image/starsvg.svg'
import * as S from '../Select/SelectStyle';

const Login = () => {
  return (
    <L.AppContainer>
    <L.LoginWrapper>
      <L.Page>
      <S.ImageWrap>
                <img src={Star} alt="" />
            </S.ImageWrap>
      <L.TitleWrap>
          <p>마음말</p>       
      </L.TitleWrap>
          <L.InputWrap>
            <L.Input
              type="text"
              placeholder="Email address"
            />
          </L.InputWrap>
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
              <a href="/">아이디 찾기</a>
              <p>|</p>
              <a href="/">비밀번호 찾기</a>
              <p>|</p>
              <a href="/Select">회원가입</a>
            </L.NoAccount>

      </L.Page>
    </L.LoginWrapper>
    </L.AppContainer>
  );
};

export default Login;