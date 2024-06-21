//WordTchr.jsx
import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import Form from 'react-bootstrap/Form';
import * as W from '../WordTchr/WordStyle';
import * as D from '../WordDetailTchr/WordDetailStyle';
import word from '../../assets/image/word.svg'
import Back from '/src/assets/image/back.svg';

export default function WordTchr() {
    const [searchValue, setSearchValue] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Search:', searchValue);
        setSearchValue('');
    };
    
    return (
        <>
        <D.ImageWrap>
          <a href="/MainStd"><img src={Back} alt="" /></a>
        </D.ImageWrap>
        <W.LessonWrapper>
            <W.Section>
            <W.Section>
                <h1>낱말 카드 학습</h1>
            </W.Section>
                <W.Line>
                <W.Title>낱말 카드 세트 검색</W.Title>
                <W.StyledForm onSubmit={handleSubmit}>
                <W.StyledButton type="submit" variant="none"><FaSearch size={15} /></W.StyledButton>
                <Form.Control
                    type="text"
                    placeholder="Search..."
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                />
                </W.StyledForm>
                </W.Line> 
                <W.SecondTitle>최근 학습한 낱말 카드</W.SecondTitle>
                <W.WordList>
                <W.ChoiceBox>
                    <W.Word><a href="/WordDetailStd"><img src={word} alt = "단어"/></a></W.Word>
                    <W.Word><a href="/WordDetailStd"><img src={word} alt = "단어"/></a></W.Word>
                    <W.Word><a href="/WordDetailStd"><img src={word} alt = "단어"/></a></W.Word>
                    <W.Word><a href="/WordDetailStd"><img src={word} alt = "단어"/></a></W.Word>
                    <W.Word><a href="/WordDetailStd"><img src={word} alt = "단어"/></a></W.Word>
                </W.ChoiceBox>
                </W.WordList>
                </W.Section>
        </W.LessonWrapper>
        </>
    );
}