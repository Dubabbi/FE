import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import * as W from '../WordTchr/WordStyle';
import addIcon from '../../assets/icon/add.svg';
import Back from '/src/assets/icon/back.svg';
import * as D from '../WordCreateTchr/WordDetailStyle';
import { useNavigate, Link } from 'react-router-dom';

export default function WordStd() {
    const [searchValue, setSearchValue] = useState("");
    const [wordSets, setWordSets] = useState([]);
    const navigate = useNavigate(); 
    const [error, setError] = useState(''); 

    useEffect(() => {
        axios.get('https://maeummal.com/word/wordSet/all')
          .then(response => {
            console.log(response);
            if (response.data.isSuccess) {
              setWordSets(response.data.data);
              console.log('Data fetched successfully.');
            } else {
              throw new Error('Failed to fetch data');
            }
          })
          .catch(error => {
            console.error('Error fetching data:', error);
            setError(`Failed to load word sets: ${error.message}`);
          });
      }, []);

    useEffect(() => {
        fetchWordSets();
    }, []);

    const fetchWordSets = async () => {
        try {
            const response = await axios.get('https://maeummal.com/word/wordSet/all');
            if (response.data.isSuccess) {
                setWordSets(response.data.data);
            }
        } catch (error) {
            console.error('Error fetching word sets:', error);
        }
    };

    const handleSearch = async (e) => {
        e.preventDefault();  
        try {
            const response = await axios.get(`https://maeummal.com/word/title?title=${encodeURIComponent(searchValue)}`);
            if (response.data.isSuccess) {
                setWordSets(response.data.data);
            }
        } catch (error) {
            console.error('Error during search:', error);
        }
    };

    const handleWordClick = (wordSetId) => {
        navigate(`/Wordstd/${wordSetId}`); 
    };

    return (
        <>
            <D.ImageWrap>
                <a href="/MainTchr"><img src={Back} alt="Back to main" /></a>
            </D.ImageWrap>
            <W.LessonWrapper>
                <W.Section>
                    <W.Section>
                        <h1>낱말 카드 제작</h1>
                    </W.Section>
                    <W.Line>
                        <W.Title>낱말 카드 세트 검색</W.Title>
                        <W.StyledForm onSubmit={handleSearch}>
                            <W.StyledButton type="submit" variant="none"><FaSearch size={15} /></W.StyledButton>
                            <Form.Control
                                type="text"
                                placeholder="Search..."
                                value={searchValue}
                                onChange={(e) => setSearchValue(e.target.value)}
                            />
                        </W.StyledForm>
                    </W.Line>
                    <W.SecondTitle>저장된 낱말 카드</W.SecondTitle>
                    <W.WordList>
                    <W.ChoiceBox>
                            {wordSets.map((wordSet) => (
                                <Link to={`/Wordstd/${wordSet.wordSetId}`} key={wordSet.wordSetId}>
                                <W.Word key={wordSet.wordSetId} onClick={() => handleWordClick(wordSet.wordSetId)}>
                                    <img src={wordSet.wordList[0].image} alt={wordSet.title} />
                                    <h2>{wordSet.title}</h2>
                                </W.Word>
                                </Link>
                            ))}
                        </W.ChoiceBox>
                    </W.WordList>
                </W.Section>
            </W.LessonWrapper>
        </>
    );
}
