import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "../SignupTchr/SignupTchrStyle";
import * as L from "../Login/LoginStyle";
import Back from "/src/assets/icon/back.svg";
import Logo from "/src/assets/image/logo.svg";
import axios from "axios";

const SignupStd = () => {
  const [formData, setFormData] = useState({
    email: '',
    emailValid: false,
    call: '',
    callValid: false,
    pw: '',
    pwValid: false,
    name: '',
    nameValid: false,
    confirmPw: '',
    confirmPwMsg: '',
    iq: '',
    gender: '',
    birthdate: '',
  });
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
      [`${name}Valid`]: validateField(name, value, prev.pw)
    }));
  };

  function validateField(name, value, password) {
    switch(name) {
      case 'email':
        return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(value);
      case 'call':
        return /^01[016789]-?\d{3,4}-?\d{4}$/.test(value);
      case 'pw':
        return /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/.test(value);
      case 'name':
        return /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9].{1,6}$/.test(value);
      case 'confirmPw':
        return value === password ? "" : "비밀번호가 일치하지 않습니다.";
      default:
        return true;
    }
  }

  const handleNextClick = () => {
    if (formData.emailValid && formData.pwValid && formData.nameValid && !formData.confirmPwMsg) {
      setStep(2);
    } else {
      alert("모든 필드를 올바르게 입력하세요.");
    }
  };

  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      emailValid: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(prev.email),
      callValid: /^01[016789]-?\d{3,4}-?\d{4}$/.test(prev.call),
      pwValid: /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/.test(prev.pw),
      nameValid: /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9].{1,6}$/.test(prev.name),
      confirmPwMsg: prev.confirmPw === prev.pw ? "" : (prev.confirmPw.length >= 1 && prev.pw.length >= 1) ? "비밀번호가 일치하지 않습니다." : ""
    }));
  }, [formData.email, formData.call, formData.pw, formData.name, formData.confirmPw]);

  const handleSignupClick = async () => {
    const genderMapping = {
      "남자": "MALE",
      "여자": "FEMALE"
    };

    const iqMapping = {
      "35~49(중증도)": "SEVERE",
      "50~70(경도)": "MILD"
    };

    try {
      const response = await axios.post("https://maeummal.com/auth/signup/student", {
        name: formData.name,
        email: formData.email,
        password: formData.pw,
        phoneNumber: formData.call,
        birthDay: formData.birthdate,
        gender: genderMapping[formData.gender],
        iq: iqMapping[formData.iq]
      });
      if (response.status === 200) {
        navigate("/");
        console.log("Signup successful");
        alert("회원가입에 성공했습니다.");
      }
    } catch (error) {
      console.error("Error while signing up:", error);
    }
  };

  return (
    <L.AppContainer>
      <L.Logo>
        <p>마음말</p>
        <img src={Logo} alt="마음말 로고" />
      </L.Logo>
      <L.LoginWrapper>
        <L.Page>
          <div style={{width: '100%'}}>
          {step === 1 && (
            <>
              <S.ImageWrap>
                <a href="/Select">
                  <img src={Back} alt="" />
                </a>
              </S.ImageWrap>
              <S.TitleWrap>
                <p>회원가입</p>
              </S.TitleWrap>
              <L.InputTitle>이름</L.InputTitle>
              <S.InputWrap $invalid={!formData.nameValid && formData.name.length > 0}>
                <S.Input
                  type="name"
                  name="name"
                  placeholder="이름"
                  value={formData.name}
                  onChange={handleChange}
                />
              </S.InputWrap>
              <S.ErrorMessageWrap $show={!formData.nameValid && formData.name.length > 0}>
                올바른 이름 형식으로 입력해 주세요.
              </S.ErrorMessageWrap>
              <L.InputTitle>이메일</L.InputTitle>
              <S.InputWrap $invalid={!formData.emailValid && formData.email.length > 0}>
                <S.Input
                  type="email"
                  name="email"
                  placeholder="이메일 주소"
                  value={formData.email}
                  onChange={handleChange}
                />
              </S.InputWrap>
              <S.ErrorMessageWrap $show={!formData.emailValid && formData.email.length > 0}>
                올바른 이메일 형식으로 입력해주세요.
              </S.ErrorMessageWrap>
              <L.InputTitle>비밀번호</L.InputTitle>
              <S.InputWrap $invalid={!formData.pwValid && formData.pw.length > 0}>
                <S.Input
                  type="password"
                  name="pw"
                  placeholder="숫자, 특수기호 포함 8자 이상 20자 이하"
                  value={formData.pw}
                  onChange={handleChange}
                />
              </S.InputWrap>
              <S.ErrorMessageWrap $show={!formData.pwValid && formData.pw.length > 0}>
                <div>영문, 숫자, 특수기호 조합 8자 이상으로 입력해주세요.</div>
              </S.ErrorMessageWrap>
              <L.InputTitle>비밀번호 확인</L.InputTitle>
              <S.InputWrap $invalid={formData.confirmPwMsg !== ""}>
                <S.Input
                  type="password"
                  name="confirmPw"
                  placeholder="비밀번호 확인"
                  value={formData.confirmPw}
                  onChange={handleChange}
                />
              </S.InputWrap>
              <S.ErrorMessageWrap
                $show={formData.confirmPwMsg && <div>{formData.confirmPwMsg}</div>}
              >
                <div>비밀번호가 일치하지 않습니다.</div>
              </S.ErrorMessageWrap>
              <L.BottomButton onClick={handleNextClick}>다음</L.BottomButton>
              <S.NoAccount>
                <p>이미 계정이 있으신가요? </p>
                <p style={{ color: "#2B2180" }}>
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
                <a href="/Select">
                  <img src={Back} alt="" />
                </a>
              </S.ImageWrap>
              <S.TitleWrap>
                <p>회원가입</p>
              </S.TitleWrap>
              <L.InputTitle>휴대폰 번호</L.InputTitle>
              <S.InputWrap $invalid={!formData.callValid && formData.call.length > 0}>
                <S.Input
                  type="text"
                  name="call"
                  placeholder="010-1234-5678"
                  value={formData.call}
                  onChange={handleChange}
                />
              </S.InputWrap>
              <S.ErrorMessageWrap $show={!formData.callValid && formData.call.length > 0}>
                <div>올바른 휴대폰 번호 형식으로 입력해주세요.</div>
              </S.ErrorMessageWrap>
              <L.InputTitle>생년월일</L.InputTitle>
              <S.InputWrap>
                <S.Input
                  type="date"
                  name="birthdate"
                  value={formData.birthdate}
                  onChange={handleChange}
                  style={{ width: "100%", fontSize: "16px" }}
                />
              </S.InputWrap>
              <S.ErrorMessageWrap>
                <div>.</div>
              </S.ErrorMessageWrap>
              <L.InputTitle>성별</L.InputTitle>
              <S.InputWrap>
                <S.Select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                >
                  {!formData.gender && <option value="">성별</option>}
                  <option value="남자">남자</option>
                  <option value="여자">여자</option>
                </S.Select>
              </S.InputWrap>
              <S.ErrorMessageWrap>
                <div>.</div>
              </S.ErrorMessageWrap>
              <L.InputTitle>지능지수 선택</L.InputTitle>
              <S.InputWrap>
                <S.Select
                  name="iq"
                  value={formData.iq}
                  onChange={handleChange}
                  onBlur={() => setFormData(prev => ({ ...prev, iq: prev.iq || "35~49(중증도)" }))}
                >
                  {!formData.iq && <option value="">지능지수 선택</option>}
                  <option value="35~49(중증도)">35~49(중증도)</option>
                  <option value="50~70(경도)">50~70(경도)</option>
                </S.Select>
              </S.InputWrap>
              <S.ErrorMessageWrap>
                <div>.</div>
              </S.ErrorMessageWrap>
              <L.BottomButton onClick={handleSignupClick}>확인</L.BottomButton>
              <S.NoAccount>
                <p>이미 계정이 있으신가요? </p>
                <p style={{ color: "#2B2180" }}>
                  <S.UnderlinedText>
                    <a href="/"> 로그인</a>
                  </S.UnderlinedText>
                </p>
              </S.NoAccount>
            </>
          )}</div>
        </L.Page>
      </L.LoginWrapper>
    </L.AppContainer>
  );
};

export default SignupStd;
