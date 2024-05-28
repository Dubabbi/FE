// SignupTchr.jsx
import React, { useEffect, useState } from 'react';
import * as S from './SignupTchrStyle';
import * as L from '../Login/LoginStyle';
import Back from '/src/assets/image/back.svg'
import Logo from '/src/assets/image/logo.svg'

const SignupTchr = () => {
  const [email, setEmail] = useState('');
  const [emailValid, setEmailValid] = useState(false);
  const [pw, setPw] = useState('');
  const [pwValid, setPwValid] = useState(false);
  const [name, setName] = useState('');
  const [nameValid, setNameValid] = useState(false);
  const [notAllow, setNotAllow] = useState(true);
  const [signupComplete, setSignupComplete] = useState(false); 
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(false); 
  const [confirmPw, setConfirmPw] = useState(''); 
  const [confirmPwMsg, setConfirmPwMsg] = useState(''); 
  const handleConfirmPw = (e) => { 
    setConfirmPw(e.target.value); 
  }; 


  useEffect(() => { 
    if (confirmPw.length >= 1) { 
      if (confirmPw === pw) {
        setConfirmPwMsg('');
      } else {
        setConfirmPwMsg('비밀번호가 일치하지 않습니다.');
      }
    } else {
      setConfirmPwMsg(''); 
    }
  }, [confirmPw, pw]);


  const handleName = (n) => {
    setName(n.target.value);
    const regex = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|].{1,8}$/i;
    if (regex.test(n.target.value)) {
      setNameValid(true);
    } else {
      setNameValid(false);
    }
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
    const regex =
    /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
    if (regex.test(e.target.value)) {
      setEmailValid(true);
    } else {
      setEmailValid(false);
    }
  };

  const handlePw = (e) => {
    setPw(e.target.value);
    const regex =
      /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])(?!.*[^a-zA-z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/;
    if (regex.test(e.target.value)) {
      setPwValid(true);
    } else {
      setPwValid(false);
    }
  };

  useEffect(() => {
    if (nameValid && emailValid && pwValid && confirmPw === pw) {
      setNotAllow(false);
      return;
    }
    setNotAllow(true);
  }, [emailValid], [nameValid], [pwValid], [confirmPw]);

  useEffect(() => {
    if (signupComplete) {
      setShowWelcomeMessage(true);
    }
  }, [signupComplete]);


  useEffect(() => {
    if (nameValid && emailValid && pwValid && confirmPw === pw) {
      setNotAllow(false);
      return;
    }
    setNotAllow(true);
  }, [nameValid, emailValid, pwValid, confirmPw, pw]);

  return (
    <L.AppContainer>
      <L.Logo>
        <p>마음말</p>
        <img src={Logo} alt = "마음말 로고"/>
      </L.Logo>
      <L.LoginWrapper>
      <L.Page>
        <S.ImageWrap>
          <a href="/Select"><img src={Back} alt="" /></a>
        </S.ImageWrap>
      <S.TitleWrap>
          <p>회원가입</p>       
      </S.TitleWrap>
      <S.InputWrap>
            <S.Input
                type="name"
                placeholder="이름"
                value={name}
                onChange={handleName}
              />
          </S.InputWrap>
          <S.ErrorMessageWrap>
              <div>.</div>
            </S.ErrorMessageWrap>
          <S.InputWrap invalid={!emailValid && email.length > 0}>
          <S.Input
            type="text"
            placeholder="이메일"
            value={email}
            onChange={handleEmail}
          />
          </S.InputWrap>
          <S.ErrorMessageWrap show={!emailValid && email.length > 0}>
            올바른 이메일 형식으로 입력해주세요.
          </S.ErrorMessageWrap>
          
          <S.InputWrap invalid={!pwValid && pw.length > 0}>
            <S.Input
              type="password"
              placeholder="비밀번호"
              value={pw}
              onChange={handlePw}
            />
            </S.InputWrap>
            <S.ErrorMessageWrap show={!pwValid && pw.length > 0}>
              <div>영문, 숫자, 특수기호 조합 8자리 이상의 비밀번호를 입력하세요.</div>
            </S.ErrorMessageWrap>
          <S.InputWrap invalid={confirmPwMsg !== ''}>
            <S.Input
              type="password"
              placeholder="비밀번호 확인"
              value={confirmPw}
              onChange={handleConfirmPw}
            />
          </S.InputWrap>
          <S.ErrorMessageWrap show={confirmPwMsg && <div>{confirmPwMsg}</div>}>
              <div>비밀번호가 일치하지 않습니다.</div>
            </S.ErrorMessageWrap>
            <L.BottomButton>
              회원가입
            </L.BottomButton>
            <S.NoAccount>
              <p>이미 계정이 있으신가요? </p>
              <p style={{ color: '#2B2180' }}>
                <S.UnderlinedText>
                  <a href="/"> 로그인</a>
                </S.UnderlinedText>
              </p>
            </S.NoAccount>
      </L.Page>
      </L.LoginWrapper>
    </L.AppContainer>
  );
};

export default SignupTchr;