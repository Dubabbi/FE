import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import _ from 'lodash';
import * as W from '../WordTchr/WordStyle';
import Back from '/src/assets/icon/back.svg';
import * as D from '../WordCreateTchr/WordDetailStyle';
import { useNavigate, Link } from 'react-router-dom';
import wordsave from '/src/assets/icon/wordsave.svg';
import placeholderImage from '/src/assets/icon/phimg.svg'; 

export default function WordStd() {
    const [searchValue, setSearchValue] = useState("");
    const [wordSets, setWordSets] = useState([]);
    const navigate = useNavigate(); 
    const [dropdownWordSets, setDropdownWordSets] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);


    useEffect(() => {
        fetchInitialWordSets();
    }, []);

    const fetchInitialWordSets = async () => {
        try {
            const response = await axios.get('https://maeummal.com/word/wordSet/all');
            if (response.data.isSuccess) {
                setWordSets(response.data.data);
                setDropdownWordSets(response.data.data);
            } else {
                setWordSets([]);
                setDropdownWordSets([]);
            }
        } catch (error) {
            console.error('Error fetching initial word sets:', error);
            setWordSets([]);
            setDropdownWordSets([]);
        }
    };

    const debouncedSearch = _.debounce(async (search) => {
        if (search) {
            try {
                const response = await axios.get(`https://maeummal.com/word/title?title=${encodeURIComponent(search)}`);
                if (response.data.isSuccess) {
                    setDropdownWordSets(response.data.data);
                } else {
                    setDropdownWordSets([]);
                }
            } catch (error) {
                console.error('Error during search:', error);
                setDropdownWordSets([]);
            }
        } else {
            setDropdownWordSets(wordSets);
        }
    }, 300);

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchValue(value);
        debouncedSearch(value);
        setShowDropdown(true);
    };

    const handleSubmitSearch = (e) => {
        e.preventDefault(); 
        debouncedSearch.cancel(); 
        debouncedSearch(searchValue); 
    };

    const handleWordClick = (wordSetId) => {
        navigate(`/WordStd/${wordSetId}`);
        setShowDropdown(false);
    };

    const handleSave = (wordSetId, e) => {
        e.stopPropagation();  
        console.log('Saved:', wordSetId);
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
                        <W.StyledForm onSubmit={(e) => e.preventDefault()}>
                            <W.StyledButton type="submit" variant="none"><FaSearch size={15} /></W.StyledButton>
                            <Form.Control
                                type="text"
                                placeholder="Search..."
                                value={searchValue}
                                onChange={handleSearchChange}
                                onFocus={() => setShowDropdown(true)}
                                onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
                            />
                        </W.StyledForm>
                        </W.Line>
                        {showDropdown && (
                            <W.Dropdown>
                                {dropdownWordSets.map((wordSet) => (
                                    <div
                                        key={wordSet.wordSetId}
                                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px', cursor: 'pointer' }}
                                        onClick={() => handleWordClick(wordSet.wordSetId)}
                                    >
                                        <img src={wordSet.wordList && wordSet.wordList.length > 0 ? wordSet.wordList[0].image : placeholderImage} style={{ width: '50px', marginRight: '10px' }} />
                                        <span>{wordSet.title}</span>
                                        <img src={wordsave} alt="Save" style={{ width: '20px' }} onClick={(e) => handleSave(wordSet.wordSetId, e)} />
                                    </div>
                                ))}
                            </W.Dropdown>
                        )}
                    <W.SecondTitle>저장된 낱말 카드</W.SecondTitle>
                    <W.WordList>
                    <W.ChoiceBox>
                    {wordSets.map((wordSet) => (
                            <Link to={`/WordStd/${wordSet.wordSetId}`} key={wordSet.wordSetId}>
                                <W.Word>
                                    <img src={wordSet.wordList[0]?.image || placeholderImage} />
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