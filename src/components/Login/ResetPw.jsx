// ResetPw.jsx
import React, { useState, useEffect } from 'react';
import * as L from './LoginStyle';
import * as S from '../SignupTchr/SignupTchrStyle';
import Logo from '/src/assets/image/logo.svg'

const ResetPw = () => {
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
          <p>비밀번호 재설정</p>       
      </L.TitleWrap>
      <h1 style={{textAlign: 'center', fontFamily:'arial', fontSize: '13px', marginBottom: '4%', lineHeight: '1.5' }}>비밀번호를 잊으셨나요?<br />
        변경할 비밀번호를 입력해 주세요.<br />
        메일로 비밀번호 변경 링크/임시비밀번호가 전송됩니다.</h1>
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
              메일 전송
            </L.BottomButton>
            <S.NoAccount>
              <p>비밀번호가 기억나셨나요? </p>
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
          <p>비밀번호 재설정</p>  
          <h1 style={{textAlign: 'center', fontFamily:'arial', fontWeight: 'normal', fontSize: '13px', marginTop: '4%', lineHeight: '1.5'}}>
          마음말에서 사용할 </h1> 
          <h1 style={{textAlign: 'center', fontFamily:'arial', fontWeight: 'normal', fontSize: '13px', marginBottom: '3%', lineHeight: '1.5'}}>
          새로운 비밀번호를 입력해 주세요.</h1>      
        </L.TitleWrap>

            <L.InputTitle>
            비밀번호
          </L.InputTitle>
          <S.SecondInputWrap invalid={!pwValid && pw.length > 0}>
            <S.Input
              type="password"
              placeholder="숫자, 특수기호 포함 8자 이상 20자 이하"
              value={pw}
              onChange={handlePw}
            />
            </S.SecondInputWrap>
            <S.ErrorMessageWrap show={!pwValid && pw.length > 0}>
              <div>영문, 숫자, 특수기호 조합 8자 이상으로 입력해주세요.</div>
            </S.ErrorMessageWrap>
            <L.InputTitle style={{marginTop: '1%'}}>
            비밀번호 확인
          </L.InputTitle>
          <S.SecondInputWrap invalid={confirmPwMsg !== ''}>
            <S.Input
              type="password"
              placeholder="비밀번호 확인"
              value={confirmPw}
              onChange={handleConfirmPw}
            />
          </S.SecondInputWrap>
          <S.ErrorMessageWrap show={confirmPwMsg && <div>{confirmPwMsg}</div>}>
              <div>비밀번호가 일치하지 않습니다.</div>
            </S.ErrorMessageWrap>
          <L.BottomButton style={{marginTop: '2.5%'}}>
              변경하기
            </L.BottomButton>
        </>)}
      </L.Page>
    </L.LoginWrapper>
    </L.AppContainer>


  );
};

export default ResetPw;