import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import * as S from './SearchBarStyle';
import { FaSearch } from 'react-icons/fa';

const schoolList = [
    "덕성여자대학교",
    "덕성고등학교",
    "덕성중학교",
    "덕성초등학교",
    "덕성유치원",
];

function SearchBar({ setSearchTerm }) {
    const [searchValue, setSearchValue] = useState('');
    const [schoolSuggestions, setSchoolSuggestions] = useState([]);

    useEffect(() => {
        if (searchValue) {
            const suggestions = schoolList.filter(school =>
                school.includes(searchValue)
            );
            setSchoolSuggestions(suggestions);
        } else {
            setSchoolSuggestions([]);
        }
    }, [searchValue]);

    const handleSubmit = (e) => {
        e.preventDefault(school);
        setSearchTerm(searchValue);
    };

    const handleSelectSchool = (school) => {
        setSearchTerm(school);
        setSearchValue(school);
        setSchoolSuggestions([]);
    };

    return (
        <>
            <S.StyledForm onSubmit={handleSubmit}>
                <Form.Control style={{ height: '2rem' }} type="text"
                    placeholder="학교 검색" size="lg" className="form-control" value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)} />
                <S.StyledButton type="submit" variant="none"><FaSearch size={19} /></S.StyledButton>
            </S.StyledForm>
            {schoolSuggestions.length > 0 && (
                <S.SuggestionsList>
                    {schoolSuggestions.map((school, index) => (
                        <S.SuggestionItem key={index} onClick={() => handleSelectSchool(school)}>
                            <S.Title>{school}</S.Title>
                        </S.SuggestionItem>
                    ))}
                </S.SuggestionsList>
            )}
        </>
    );
}

export default SearchBar;
