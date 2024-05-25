//Select.jsx
import * as S from './SelectStyle';
import * as L from '../Login/LoginStyle';
import Std from '/src/assets/image/std.svg'
import Tchr from '/src/assets/image/tchr.svg'
import Logo from '/src/assets/image/logo.svg'

export default function Select() {
    return (
        <L.AppContainer>
            <L.Logo>
            <p>마음말</p>
            <img src={Logo} alt = "마음말 로고"/>
            </L.Logo>
        <L.LoginWrapper>
            <L.Page>
            <L.TitleWrap>
            <p>Welcome!</p>
            </L.TitleWrap>
            <S.ChoiceBox>
                <S.OptionLink href="/SignupStd">학생
                    <br/><img src={Std} alt="" /></S.OptionLink>
                <S.OptionLink href="/SignupTchr">교사
                    <br/><img src={Tchr} alt="" /></S.OptionLink>
                </S.ChoiceBox>
                </L.Page>
            </L.LoginWrapper>
        </L.AppContainer>
    );
}