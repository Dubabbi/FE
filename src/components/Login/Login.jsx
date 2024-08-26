import { useAuth } from '/contexts/AuthContext'; // useAuth 훅 가져오기
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
import * as L from "./LoginStyle";
import Logo from "/src/assets/image/logo.svg";
const Login = () => {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);
  const { login } = useAuth();

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePw = (e) => {
    setPw(e.target.value);
  };

  const onClickConfirmButton = async () => {
    try {
      const response = await axios.post(
        "https://maeummal.com/auth/signin",
        {
          email: email,
          password: pw,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      const { token, id } = response.data.data;
      if (response.status === 200 && token ) {
        // 로그인 성공 시
        alert("로그인에 성공했습니다.");
        console.log("토큰:", token);
        login(token, id);
        navigate("/maintchr");
      } else {
        alert("로그인에 실패했습니다.");
      }
    } catch (error) {
      console.error("로그인 요청 중 오류 발생:", error);
      if (error.response) {
        if (error.response.status === 400) {
          alert("등록되지 않은 회원입니다.");
        } else if (error.response.status === 401) {
          alert("인증에 실패하였습니다. 이메일과 비밀번호를 확인하세요.");
        } else {
          alert("로그인에 실패했습니다. 서버 오류 발생.");
        }
      } else {
        alert("로그인에 실패했습니다. 네트워크 오류가 발생했습니다.");
      }
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
          <L.TitleWrap>
            <p>로그인</p>
          </L.TitleWrap>
          <L.InputTitle>이메일</L.InputTitle>
          <L.InputWrap>
            <L.Input
              value={email}
              type="text"
              placeholder="email"
              onChange={handleEmail}
            />
          </L.InputWrap>
          <L.InputTitle>
            <p>비밀번호</p>
          </L.InputTitle>
          <L.InputWrap>
            <L.Input
              value={pw}
              type="password"
              placeholder="password"
              onChange={handlePw}
            />
          </L.InputWrap>
          <L.BottomButton onClick={onClickConfirmButton}>로그인</L.BottomButton>
          <L.NoAccount>
           <a href="/forgotid">아이디 찾기</a>
            <p>|</p>
            <a href="/resetpw">비밀번호 찾기</a>
            <p>|</p>
            <a href="/Select">회원가입</a>
          </L.NoAccount>
        </L.Page>
      </L.LoginWrapper>
    </L.AppContainer>
  );
};
export default Login;