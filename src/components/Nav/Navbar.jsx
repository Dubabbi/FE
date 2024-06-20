import React from 'react';
import { Link } from 'react-router-dom';
import Avvvatars from 'avvvatars-react';
import * as N from './NavbarStyle';
import Logo from '/src/assets/image/logo.svg'

export default function Nav() {
return(
    <>
        <N.TopWrapper>
            <N.Header>
            <Link to="/MainTchr"><N.Title> {/* 사용자 정보에 따라 다르게 리다이렉션하기 */}
              <img src={Logo} alt = "마음말 로고"/>
                마음말
              </N.Title></Link>
            </N.Header>
          <N.LinkWrapper>
          <Link to="#"><N.Avatar><Avvvatars style="shape" size={40}/></N.Avatar></Link> {/* 마이페이지로*/}
          </N.LinkWrapper>
        </N.TopWrapper>
    </>
)
}