import styled from 'styled-components';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export const StyledButton = styled(Button)`
    position: absolute;
    top: 50%;
    right: 10px; 
    right: 10px; 
    transform: translateY(-50%);

    height: 35px; 
    width: 35px; 
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
`;


export const StyledForm = styled(Form)`
    display: flex;
    border-radius: 10px;
    width: 60%;
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
