import Form from 'react-bootstrap/Form';
import * as S from './SearchBarStyle';
import { FaSearch } from 'react-icons/fa';
import { useState } from 'react';

function SearchBar({ setSearchTerm }) {
    const [searchValue, setSearchValue] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setSearchTerm(searchValue);
        setSearchValue('');
    };

    return (
        <>
            <S.Search_Container>
                <S.StyledForm onSubmit={handleSubmit}>
                    <Form.Control style={{height: '2rem'}} type="text"
                        placeholder="학교 검색"size="lg" className="form-control" value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}/>
                        <S.StyledButton type="submit" variant="none"><FaSearch size={19} /></S.StyledButton>
                </S.StyledForm>
            </S.Search_Container>
        </>
      );
}

export default SearchBar;
