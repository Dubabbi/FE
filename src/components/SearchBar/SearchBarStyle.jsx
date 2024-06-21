import styled from 'styled-components';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export const Search_Container=styled.div`
    display: flex;
    justify-content: center;
    width: 60%;
    margin-left: 20%;
`

export const StyledButton = styled(Button)`
    position: absolute;
    top: 50%;
    right: 10px; /* 오른쪽 여백 설정 */
    transform: translateY(-50%);

    height: 40px; 
    width: 40px; 
    font-size: 16px; 
    background-color: #ACAACC; 
    border-radius: 50px; 
    display: flex;
    justify-content: center;
    align-items: center;
    
    &:hover {
        background: #8C84B0;
        transition: 0.5s;
      }
`;


export const StyledForm = styled(Form)`
    display: flex;
    border-radius: 10px;
    padding: 1.3rem;
    margin-left: 0%;
    width: 100%;
    border: 2px solid #c2c0c0;
    align-items: center;
    position: relative;
    &:focus-within {
        border: 2px solid ${({ invalid }) => invalid ? 'red' : '#ACAACC'};
    }
    .form-control {
        height: 2.5rem;
        font-size: 1.3rem;
        font-weight: 400;
        color: #777777;
        padding-left: 0px;
    }
`;
