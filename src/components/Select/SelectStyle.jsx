//SelectStyle.jsx

import styled from 'styled-components';

export const SelectWrapper = styled.div`
    color: black;
    font-size: 4rem;
    text-align: center;
    margin: 5%;
    @media (max-width: 1024px) {
        max-width: 90%;
    }
`;

export const ChoiceBox = styled.div`
    display: flex;
    justify-content: center;
    gap: 3%;
    margin-top: 10%;
`;


export const OptionLink = styled.a`
    display: block;
    background-color: #ACAACC;
    text-align: center;
    line-height: 1.7;
    padding: 8%;
    margin-bottom: 30%;
    border-radius: 10px;
    text-decoration: none;
    color: #EEFFFF;
    font-size: 2rem;
    transition: background-color 0.3s;

    &:hover {
        background-color: #8C84B0;
    }
`;

export const ImageWrap = styled.div`
    display: flex;
    justify-content: center;
    img {
        margin: 7% auto 0;
        max-width: 50%;
    }
`

