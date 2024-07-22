//WordTchr.jsx
import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import * as W from './WordStyle';
import addIcon from '../../assets/icon/add.svg';
import Back from '/src/assets/icon/back.svg';
import * as D from '../WordCreateTchr/WordDetailStyle';

export default function WordTchr() {
    const [searchValue, setSearchValue] = useState('');
    const [wordSets, setWordSets] = useState([]);

    useEffect(() => {
        const fetchWordSets = async () => {
            try {
                const response = await axios.get('https://ec2-3-34-149-148.ap-northeast-2.compute.amazonaws.com:8080/word/wordSet/all');
                if (response.data && response.data.isSuccess) {
                    setWordSets(response.data.data);
                }
            } catch (error) {
                console.error('Error fetching word sets:', error);
            }
        };
        fetchWordSets();
    }, []);

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
                            <W.AddWord><div><a href="/WordCreateTchr"><img src={addIcon} alt="Add new word set"/></a></div></W.AddWord>
                            {wordSets.map((wordSet) => (
                                <W.Word key={wordSet.wordSetId}>
                                    <img src={wordSet.wordList[0].image} alt={wordSet.title} />
                                    <h2>{wordSet.title}</h2>
                                </W.Word>
                            ))}
                        </W.ChoiceBox>

                </W.WordList>
                </W.Section>
        </W.LessonWrapper>
        </>
    );
}