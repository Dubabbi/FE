//Select.jsx
import * as S from './SelectStyle';
import * as L from '../Login/LoginStyle';
import Star from '/src/assets/image/starsvg.svg'
import Std from '/src/assets/image/std.svg'
import Tchr from '/src/assets/image/tchr.svg'

export default function Select() {
    return (
        <L.AppContainer>
        <L.LoginWrapper>
            <L.Page>
            <S.ImageWrap>
                <img src={Star} alt="" />
            </S.ImageWrap>
            <S.TitleWrap>
            <p>Welcome!</p>
            </S.TitleWrap>
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