// SignupStd.jsx
import React, { useEffect, useState } from 'react';
import * as S from './SignupStdStyle';
import Star from '/src/assets/image/starsvg.svg'
import Back from '/src/assets/image/back.svg'

const SignupStd = () => {
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
    <S.AppContainer>
    <S.LoginWrapper>
      <S.Page>
        <S.ImageWrap>
          <a href="/Select"><img src={Back} alt="" /></a>
          <img src={Star} alt="" />
        </S.ImageWrap>
      <S.TitleWrap>
          <p>마음말</p>       
      </S.TitleWrap>
      <S.InputWrap invalid={!emailValid && email.length > 0}>
            <S.Input
              type="text"
              placeholder="이메일"
              value={email}
              onChange={handleEmail}
            />
              { !emailValid && email.length > 0 && (
              <S.ErrorMessageWrap>올바른 이메일 형식으로 입력해주세요.</S.ErrorMessageWrap>
             )}
          </S.InputWrap>
          <S.InputWrap invalid={!pwValid && pw.length > 0}>
            <S.Input
              type="password"
              placeholder="비밀번호"
              value={pw}
              onChange={handlePw}
            />
            <S.ErrorMessageWrap>
            {!pwValid && pw.length > 0 && (
              <div>영문, 숫자, 특수기호 조합 8자리 이상의 비밀번호를 입력하세요.</div>
            )}
          </S.ErrorMessageWrap>
          </S.InputWrap>
          <S.InputWrap invalid={confirmPwMsg !== ''}>
            <S.Input
              type="password"
              placeholder="비밀번호 확인"
              value={confirmPw}
              onChange={handleConfirmPw}
            />
          <S.ErrorMessageWrap>
                {confirmPwMsg && <div>{confirmPwMsg}</div>}
              </S.ErrorMessageWrap>
          <S.ErrorMessageWrap>
            {!pwValid && pw.length > 0 && (
              <div></div>
            )}
          </S.ErrorMessageWrap>
          </S.InputWrap>
          <S.InputWrap>
            <S.Select>
            <option value="" disabled selected hidden>지능지수</option>
            <option value="100">지능지수 50~69(경도)</option>
            <option value="110">지능지수 35~49(중등도)</option>
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