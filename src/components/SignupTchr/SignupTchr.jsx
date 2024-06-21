// SignupTchr.jsx
import React, { useEffect, useState } from 'react';
import * as S from './SignupTchrStyle';
import * as L from '../Login/LoginStyle';
import Back from '/src/assets/image/back.svg'
import Logo from '/src/assets/image/logo.svg'
import SearchBar from './../SearchBar/SearchBar';

const SignupTchr = () => {
  const [email, setEmail] = useState('');
  const [emailValid, setEmailValid] = useState(false);
  const [id, setId] = useState('');
  const [idValid, setIdValid] = useState(false);
  const [pw, setPw] = useState('');
  const [pwValid, setPwValid] = useState(false);
  const [name, setName] = useState('');
  const [nameValid, setNameValid] = useState(false);
  const [notAllow, setNotAllow] = useState(true);
  const [signupComplete, setSignupComplete] = useState(false); 
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(false); 
  const [confirmPw, setConfirmPw] = useState(''); 
  const [confirmPwMsg, setConfirmPwMsg] = useState(''); 
  const [organization, setOrganization] = useState('');
  const [gender, setGender] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [showSelectionScreen, setShowSelectionScreen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const handleConfirmPw = (e) => { 
    setConfirmPw(e.target.value); 
  }; 
  const handleSignupClick = () => {
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


  const handleName = (n) => {
    setName(n.target.value);
    const regex = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|].{1,8}$/i;
    if (regex.test(n.target.value)) {
      setNameValid(true);
    } else {
      setNameValid(false);
    }
  };

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

  useEffect(() => {
    if (idValid && emailValid && pwValid && confirmPw === pw) {
      setNotAllow(false);
      return;
    }
    setNotAllow(true);
  }, [emailValid], [idValid], [pwValid], [confirmPw]);

  useEffect(() => {
    if (signupComplete) {
      setShowWelcomeMessage(true);
    }
  }, [signupComplete]);


  useEffect(() => {
    if (idValid && emailValid && pwValid && confirmPw === pw) {
      setNotAllow(false);
      return;
    }
    setNotAllow(true);
  }, [idValid, emailValid, pwValid, confirmPw, pw]);
  
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
        <S.ImageWrap>
          <a href="/Select"><img src={Back} alt="" /></a>
        </S.ImageWrap>
      <S.TitleWrap>
          <p>회원가입</p>       
      </S.TitleWrap>
      <L.InputTitle>
        아이디
      </L.InputTitle>
        <S.SecondInputWrap invalid={!idValid && id.length > 0}>
            <S.Input
              type="text"
              placeholder="5자 이상 19자 이하"
              value={id}
              onChange={handleId}
            />
          </S.SecondInputWrap>
          <S.ErrorMessageWrap show={!idValid && id.length > 0}>
            <div>올바른 아이디 형식으로 입력해주세요.</div>
          </S.ErrorMessageWrap>
          <L.InputTitle>
            이메일
          </L.InputTitle>
          <S.SecondInputWrap invalid={!emailValid && email.length > 0}>
          <S.Input
            type="text"
            placeholder="이메일 주소"
            value={email}
            onChange={handleEmail}
          />
          </S.SecondInputWrap>
          <S.ErrorMessageWrap show={!emailValid && email.length > 0}>
            올바른 이메일 형식으로 입력해주세요.
          </S.ErrorMessageWrap>
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
            <L.InputTitle>
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
            <L.BottomButton onClick={handleSignupClick}>
              다음
            </L.BottomButton>
            <S.NoAccount>
              <p>이미 계정이 있으신가요? </p>
              <p style={{ color: '#2B2180' }}>
                <S.UnderlinedText>
                  <a href="/"> 로그인</a>
                </S.UnderlinedText>
              </p>
            </S.NoAccount>
          </>
          ) : (
            <>
            <S.ImageWrap>
          <a href="/Select"><img src={Back} alt="" /></a>
        </S.ImageWrap>
      <S.TitleWrap>
          <p>회원가입</p>       
      </S.TitleWrap>
      <L.InputTitle>
          이름
      </L.InputTitle>
      <S.SecondInputWrap invalid={!nameValid && name.length > 0}>
            <S.Input
                type="name"
                placeholder="이름"
                value={name}
                onChange={handleName}
              />
          </S.SecondInputWrap>
          <S.ErrorMessageWrap show={!nameValid && name.length > 0}>
              올바른 이름 형식으로 입력해 주세요.
          </S.ErrorMessageWrap>
          <L.InputTitle>
            생년월일
          </L.InputTitle>
          <S.SecondInputWrap>
          <S.Input
            type="date"
            value={birthdate}
            onChange={(e) => setBirthdate(e.target.value)}
            style={{ width: '100%'}}
          />
        </S.SecondInputWrap>
        <S.ErrorMessageWrap>
              <div>.</div>
            </S.ErrorMessageWrap>
        <L.InputTitle>
          성별
        </L.InputTitle>
          <S.SecondInputWrap>
          <S.Select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              {!gender && <option value="">성별</option>}
              <option value="남자">남자</option>
              <option value="여자">여자</option>
            </S.Select>
          </S.SecondInputWrap>
          <S.ErrorMessageWrap>
              <div>.</div>
            </S.ErrorMessageWrap>

            <L.InputTitle>
                소속 기관
            </L.InputTitle>
            <SearchBar setSearchTerm={setSearchTerm}/>
            <S.ErrorMessageWrap>
              <div>.</div>
            </S.ErrorMessageWrap>
            <L.BottomButton>
              확인
            </L.BottomButton>
            <S.NoAccount>
              <p>이미 계정이 있으신가요? </p>
              <p style={{ color: '#2B2180' }}>
                <S.UnderlinedText>
                  <a href="/"> 로그인</a>
                </S.UnderlinedText>
              </p>
            </S.NoAccount>
          </>
          )}
      </L.Page>
      </L.LoginWrapper>
    </L.AppContainer>
  );
};

export default SignupTchr;