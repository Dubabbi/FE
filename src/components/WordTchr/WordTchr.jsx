//WordTchr.jsx
import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import Form from 'react-bootstrap/Form';
import * as W from './WordStyle';
import word from '../../assets/image/word.svg'
import axios from 'axios';
import add from '../../assets/icon/add.svg';
import Back from '/src/assets/icon/back.svg';
import * as D from '../WordCreateTchr/WordDetailStyle';


export default function WordTchr() {
    const [searchValue, setSearchValue] = useState('');
    const [wordSets, setWordSets] = useState([]);
    useEffect(() => {
        fetchWordSets();
    }, []);

    const fetchWordSets = async () => {
        try {
            const response = await axios.get('http://ec2-3-34-149-148.ap-northeast-2.compute.amazonaws.com:8080/api/word/wordSet/all', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}` // Assuming token is stored in localStorage
                }
            });
            setWordSets(response.data.data);
        } catch (error) {
            console.error('Error fetching word sets:', error);
        }
    };

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
                    <W.AddWord><div><a href="/WordCreateTchr"><img src={add} alt = "단어"/></a></div></W.AddWord>
                    {wordSets.map((wordSet) => (
                            <W.Word key={wordSet.wordSetId}>
                                <img src={wordSet.wordList[0].image} alt={wordSet.title} />
                            </W.Word>
                        ))}

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