import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './SignupTchrStyle';
import * as L from '../Login/LoginStyle';
import Back from '/src/assets/icon/back.svg';
import Logo from '/src/assets/image/logo.svg';
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
  const [call, setCall] = useState('');
  const [callValid, setCallValid] = useState(false);
  const [gender, setGender] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [showSelectionScreen, setShowSelectionScreen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const handleConfirmPw = (e) => { 
    setConfirmPw(e.target.value); 
  }; 
  
  const handleName = (n) => {
    setName(n.target.value);
    const regex = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|].{1,6}$/i;
    if (regex.test(n.target.value)) {
      setNameValid(true);
    } else {
      setNameValid(false);
    }
  };

  const handleCall = (e) => {
    setCall(e.target.value);
    const regex =
    /^01[016789]-?\d{3,4}-?\d{4}$/;
    if (regex.test(e.target.value)) {
      setCallValid(true);
    } else {
      setCallValid(false);
    }
  };

const handleEmail = (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);
    const regex =
    /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
    if (regex.test(e.target.value)) {
      setEmailValid(true);
    } else {
      setEmailValid(false);
    }
  };

const handlePw = (e) => {
    const pwValue = e.target.value;
    setPw(pwValue);
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


  const handleNextClick = () => {
    if (emailValid && pwValid && nameValid && confirmPw === pw) {
        setStep(2);
    } else {
        alert("모든 필드를 올바르게 입력하세요.");
        console.log("Email Valid:", emailValid);
        console.log("Password Valid:", pwValid);
        console.log("Name Valid:", nameValid);
        console.log("Passwords Match:", confirmPw === pw);
    }
};

const handleSignupClick = async () => {
    if (step === 2 && callValid && birthdate && gender && organization) {
        try {
            const response = await axios.post('/api/auth/signup', {
                email, password: pw
            });
            if (response.status === 201) {
                console.log('Signup successful');
                navigate('/');  // 성공 시 홈 페이지로 리디렉션
            }
        } catch (error) {
            console.error('Error while signing up:', error);
        }
    } else {
        alert("모든 필드를 올바르게 입력하세요.");
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
      {step === 1 && (
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
      <S.SecondInputWrap $invalid={!nameValid && name.length > 0}>
            <S.Input
                type="name"
                placeholder="이름"
                value={name}
                onChange={handleName}
              />
          </S.SecondInputWrap>
          <S.ErrorMessageWrap $show={!nameValid && name.length > 0}>
              올바른 이름 형식으로 입력해 주세요.
          </S.ErrorMessageWrap>

          <L.InputTitle>
            이메일
          </L.InputTitle>
          <S.SecondInputWrap $invalid={!emailValid && email.length > 0}>
          <S.Input 
            type="email"
            placeholder="이메일 주소"
            value={email}
            onChange={handleEmail}
          />
          </S.SecondInputWrap>
          <S.ErrorMessageWrap $show={!emailValid && email.length > 0}>
            올바른 이메일 형식으로 입력해주세요.
          </S.ErrorMessageWrap>
          <L.InputTitle>
            비밀번호
          </L.InputTitle>
          <S.SecondInputWrap $invalid={!pwValid && pw.length > 0}>
            <S.Input
              type="password"
              placeholder="숫자, 특수기호 포함 8자 이상 20자 이하"
              value={pw}
              onChange={handlePw}
            />
            </S.SecondInputWrap>
            <S.ErrorMessageWrap $show={!pwValid && pw.length > 0}>
              <div>영문, 숫자, 특수기호 조합 8자 이상으로 입력해주세요.</div>
            </S.ErrorMessageWrap>
            <L.InputTitle>
            비밀번호 확인
          </L.InputTitle>
          <S.SecondInputWrap $invalid={confirmPwMsg !== ''}>
            <S.Input
              type="password"
              placeholder="비밀번호 확인"
              value={confirmPw}
              onChange={handleConfirmPw}
            />
          </S.SecondInputWrap>
          <S.ErrorMessageWrap $show={confirmPwMsg && <div>{confirmPwMsg}</div>}>
              <div>비밀번호가 일치하지 않습니다.</div>
            </S.ErrorMessageWrap>
            <L.BottomButton onClick={handleNextClick}>
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
          )}
          {step === 2 && (
            <>
              <S.ImageWrap>
                <a href="/Select"><img src={Back} alt="" /></a>
              </S.ImageWrap>
              <S.TitleWrap>
                <p>회원가입</p>
              </S.TitleWrap>
              <L.InputTitle>
            휴대폰 번호
        </L.InputTitle>
          <S.SecondInputWrap $invalid={!callValid && call.length > 0}>
            <S.Input
              type="text"
              placeholder="010-1234-5678"
              value={call}
              onChange={handleCall}
            />
          </S.SecondInputWrap>
          <S.ErrorMessageWrap $show={!callValid && call.length > 0}>
            <div>올바른 휴대폰 번호 형식으로 입력해주세요.</div>
          </S.ErrorMessageWrap>
              <L.InputTitle>생년월일</L.InputTitle>
              <S.SecondInputWrap>
                <S.Input
                  type="date"
                  value={birthdate}
                  onChange={(e) => setBirthdate(e.target.value)}
                  style={{ width: '100%', fontSize: '16px' }}
                />
              </S.SecondInputWrap>
              <S.ErrorMessageWrap>
                <div>.</div>
              </S.ErrorMessageWrap>
              <L.InputTitle>성별</L.InputTitle>
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
              <L.InputTitle>소속 기관</L.InputTitle>
              <SearchBar setSearchTerm={setSearchTerm} />
              <S.ErrorMessageWrap>
                <div>.</div>
              </S.ErrorMessageWrap>
              <L.BottomButton onClick={handleSignupClick}>
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
