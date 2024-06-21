//WordTchr.jsx
import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import Form from 'react-bootstrap/Form';
import * as W from './WordStyle';
import word from '../../assets/image/word.svg'
import add from '../../assets/image/add.svg'
import Back from '/src/assets/image/back.svg';
import * as D from '../WordDetailTchr/WordDetailStyle';

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
          <a href="/MainTchr"><img src={Back} alt="" /></a>
        </D.ImageWrap>
        <W.LessonWrapper>
            <W.Section>
            <W.Section>
                <h1>낱말 카드 제작</h1>
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
                <W.SecondTitle>나의 낱말 카드</W.SecondTitle>
                <W.WordList>
                <W.ChoiceBox>
                    <W.AddWord><div><a href="#"><img src={add} alt = "단어"/></a></div></W.AddWord>
                    <W.Word><img src={word} alt = "단어"/></W.Word>
                    <W.Word><img src={word} alt = "단어"/></W.Word>
                    <W.Word><img src={word} alt = "단어"/></W.Word>
                    <W.Word><img src={word} alt = "단어"/></W.Word>
                    <W.Word><img src={word} alt = "단어"/></W.Word>
                </W.ChoiceBox>
                </W.WordList>
                </W.Section>
        </W.LessonWrapper>
        </>
    );
}