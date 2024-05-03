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
              <p>계정이 없으신가요? </p>
              <p style={{ color: 'blue' }}>
              <a href="/Select" style={{ color: 'blue', textDecoration: 'underline' }}>회원가입</a>
              </p>
            </L.NoAccount>

      </L.Page>
    </L.LoginWrapper>
    </L.AppContainer>
  );
};

export default Login;