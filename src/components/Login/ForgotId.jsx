// ForgotId.jsx
import React, { useState, useEffect } from 'react';
import * as L from './LoginStyle';
import * as S from '../SignupTchr/SignupTchrStyle';
import Logo from '/src/assets/image/logo.svg'

const ForgotId = () => {
    const [email, setEmail] = useState('');
    const [emailValid, setEmailValid] = useState(false);
    const [id, setId] = useState('');
    const [idValid, setIdValid] = useState(false);
    const [pw, setPw] = useState('');
    const [pwValid, setPwValid] = useState(false);
    const [notAllow, setNotAllow] = useState(true);
    const [confirmPw, setConfirmPw] = useState(''); 
    const [confirmPwMsg, setConfirmPwMsg] = useState(''); 
    const [showSelectionScreen, setShowSelectionScreen] = useState(false);
    const handleButtonClick = () => {
        setShowSelectionScreen(true);
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
  
    const handleId = (e) => {
      setId(e.target.value);
      const regex =
      /^[A-Za-z][A-Za-z0-9]{5,19}$/i;
      if (regex.test(e.target.value)) {
        setIdValid(true);
      } else {
        setIdValid(false);
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

    
  return (
    <L.AppContainer>
    <L.Logo>
    <p>마음말</p>
    <img src={Logo} alt = "마음말 로고"/>
    </L.Logo>
    <L.LoginWrapper>
      <L.Page>
      {!showSelectionScreen ? (
            <>
      <L.TitleWrap>
          <p>아이디 찾기</p>       
      </L.TitleWrap>
      <h1 style={{textAlign: 'center', fontFamily:'arial', fontSize: '13px', marginBottom: '4%', lineHeight: '1.5' }}>
        아이디를 잊으셨나요?<br />
        마음말 서비스에서 사용하는 이메일을 입력해 주세요.<br />
        메일로 코드가 전송됩니다.</h1>
          <L.InputTitle>
          <p>이메일</p>       
          </L.InputTitle>
          <L.InputWrap invalid={!emailValid && email.length > 0}>
            <L.Input
                type="text"
                placeholder="이메일 주소"
                value={email}
                onChange={handleEmail}
            />
          </L.InputWrap>
            <L.BottomButton onClick={handleButtonClick}>
              인증하기
            </L.BottomButton>
            <S.NoAccount>
              <p>아이디가 기억나셨나요? </p>
              <p style={{ color: '#2B2180' }}>
                <S.UnderlinedText>
                  <a href="/"> 로그인</a>
                </S.UnderlinedText>
              </p>
            </S.NoAccount>
            </>
        ) : (
        <>
        <L.TitleWrap>
          <p>아이디 찾기</p>       
        </L.TitleWrap>
        <h1 style={{textAlign: 'center', fontFamily:'arial', fontSize: '13px', marginBottom: '4%', lineHeight: '1.6'}}>
            [example@email.com]으로 전송된<br />
            코드 네 자리를 입력해 주세요.</h1>
          <L.ResetBox>
            <L.ResetInputWrap><L.ResetInput></L.ResetInput></L.ResetInputWrap>
            <L.ResetInputWrap><L.ResetInput></L.ResetInput></L.ResetInputWrap>
            <L.ResetInputWrap><L.ResetInput></L.ResetInput></L.ResetInputWrap>
            <L.ResetInputWrap><L.ResetInput></L.ResetInput></L.ResetInputWrap>
          </L.ResetBox>
          <L.BottomButton>
              인증하기
            </L.BottomButton>
        </>)}
      </L.Page>
    </L.LoginWrapper>
    </L.AppContainer>


  );
};

export default ForgotId;