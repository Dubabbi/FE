import styled from 'styled-components';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export const StyledButton = styled(Button)`
    position: absolute;
    top: 50%;
    right: 10px; 
    transform: translateY(-50%);
    height: 35px; 
    width: 35px; 
    font-size: 16px; 
    background-color: #ACAACC; 
    border-radius: 50px; 
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover {
        background: #CDCBE4;
        background: #CDCBE4;
        transition: 0.5s;
      }
    p{
     justify-content: center;
    }
`;


export const StyledForm = styled(Form)`
    display: flex;
    border-radius: 10px;
    width: 60%;
    z-index: 10;
    margin-left: 20%;
    padding: 1.3rem;
    background-color: #E1E4E7;
    align-items: center;
    position: relative;
    .form-control {
        height: 2.5rem;
        font-size: 1.3rem;
        font-weight: 400;
        color: #777777;
        padding-left: 0px;
    }
    @media (max-width: 1024px) {
        width: 70%;
        margin-left: 15%;
    }
`;

export const SuggestionsList = styled.ul`
    list-style-type: none;
    position: absolute;
    z-index: 10;
    width: 60%;
    margin-left: 20%;
    padding: 1.3rem;
    background-color: #E1E4E7;    
    margin-top: -5.5px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    border-top: none;
    max-height: 150px;
    overflow-y: auto;
        @media (max-width: 1024px) {
        width: 69%;
        margin-left: 14%;
    }
        &::-webkit-scrollbar {
        width: 7px;
    }

    &::-webkit-scrollbar-track {
        background: #f1f1f1;
    }

    &::-webkit-scrollbar-thumb {
        background: #888; /* 스크롤바 핸들 */
        border-radius: 10px;
    }

    &::-webkit-scrollbar-thumb:hover {
        background: #555;
    }

    @media (max-width: 1024px) {
        width: 69%;
        margin-left: 14%;
    }
`;

export const SuggestionItem = styled.li`
    padding: 1.1rem;
    cursor: pointer;
    text-align: center;
    &:hover {
        background-color: #f0f0f0;
    }
`;

export const Title = styled.span`
    display: block;
`;