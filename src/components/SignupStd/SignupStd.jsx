// SignupStd.jsx
import React from 'react';
import * as S from './SignupStdStyle';
import Star from '/src/assets/image/starsvg.svg'

const SignupStd = () => {
  return (
    <S.AppContainer>
    <S.LoginWrapper>
      <S.Page>
        <S.ImageWrap>
                <img src={Star} alt="" />
        </S.ImageWrap>
      <S.TitleWrap>
          <p>마음말</p>       
      </S.TitleWrap>
        <S.InputWrap>
            <S.Input
              type="text"
              placeholder="이메일"
            />
          </S.InputWrap>
          <S.InputWrap>
            <S.Input
              type="password"
              placeholder="비밀번호"
            />
          </S.InputWrap>
          <S.InputWrap>
            <S.Input
              type="password"
              placeholder="비밀번호 확인"
            />
          </S.InputWrap>
          <S.InputWrap>
            <S.Select>
            <option value="" disabled selected hidden>지능지수</option>
            <option value="100">100</option>
            <option value="110">110</option>
            <option value="120">120</option>
            </S.Select>
          </S.InputWrap>

            <S.BottomButton>
              회원가입
            </S.BottomButton>
            <S.NoAccount>
              <p>이미 계정이 있으신가요? </p>
              <p style={{ color: '#2B2180' }}>
                <S.UnderlinedText>
                  <a href="/"> 로그인</a>
                </S.UnderlinedText>
              </p>
            </S.NoAccount>

      </S.Page>
    </S.LoginWrapper>
    </S.AppContainer>
  );
};

export default SignupStd;