import React from "react";
import styled from 'styled-components';

const StyledFooter = styled.div`
    background-color: #666666;
    margin-bottom: 0;
    bottom: 0;
    width: 100%;
    left: 0;
`;

const FooterContent = styled.div`
    display: flex;
    flex-direction: column;
    padding: 2rem 2rem;
    align-items: center; 
    justify-content: center; 
`;

const FooterText = styled.p`
    font-size: 13px;
    line-height: 15px;
    color: rgb(255, 255, 255);
    font-weight: 600;
`;

const responsive = {
    large: `@media (max-width: 850px)`,
    small: `@media (max-width: 550px)`
};

const FooterHeading = styled.h1`
    ${responsive.large} {
        font-size: 44px;
        line-height: 50px;
    }
    ${responsive.small} {
        font-size: 34px;
        line-height: 42px;
    }
`;

export default function Footer() {
    return (
        <StyledFooter>
            <FooterContent>
                <FooterText>&copy; 마음말</FooterText>
            </FooterContent>
        </StyledFooter>
    );
}