import React, { useEffect, useState } from 'react';
import * as S from '../SignupTchr/SignupTchrStyle';
import * as L from '../Login/LoginStyle';
import Back from '/src/assets/icon/back.svg';
import Logo from '/src/assets/image/logo.svg';

const ShowMsg = () => {

  return (
    <L.AppContainer>
      <L.Logo>
        <p>마음말</p>
        <img src={Logo} alt="마음말 로고"/>
      </L.Logo>
      <L.LoginWrapper>
        <L.Page>
            <S.ImageWrap>
                <a href="/Select"><img src={Back} alt="" /></a>
            </S.ImageWrap>
                <S.TitleWrap style={{marginTop: "6%", fontSize: "3.2vw"}}>
                  <p>👋</p> 
                </S.TitleWrap>
                <S.TitleWrap style={{marginTop: "6%", marginBottom: "10%", fontSize: "1vw"}}>
                  <p>OOO님 환영합니다</p> <br/>   
                  <p>마음말 서비스에서 즐거운 학습을 이어가세요!</p> <br/>   
                  <p>버튼을 누르면 로그인 화면으로 이동합니다.</p>   
                </S.TitleWrap>
            <a href='/'>
            <L.BottomButton>
                로그인
            </L.BottomButton>
            </a>
        </L.Page>
      </L.LoginWrapper>
    </L.AppContainer>
  );
};

export default ShowMsg;
