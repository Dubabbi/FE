import styled from 'styled-components';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export const Search_Container=styled.div`
    display: flex;
    justify-content: center;
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
    margin-top: 1%;
    margin-left: 0%;
    width: 60%;
    border: 2px solid #c2c0c0;
    align-items: center;
    position: relative;
    
    .form-control {
        height: 2.5rem;
        font-size: 1.5rem;
        font-weight: 400;
        color: #777777;
        border-radius: 25px;
        padding-left: 0px;
    }
`;
