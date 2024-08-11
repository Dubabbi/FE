import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import Back from '/src/assets/icon/back.svg';

const WordDetailTchr = () => {
  const navigate = useNavigate();
  const { setId } = useParams(); 
  const [wordSet, setWordSet] = useState({
    title: '',
    wordCards: []
  });

  useEffect(() => {
    fetchWordSet();
  }, [setId]);

  const fetchWordSet = async () => {
    try {
      const response = await axios.get(`https://maeummal.com/word/wordSet?wordSetId=${setId}`);
      if (response.data.isSuccess) {
        setWordSet({
          title: response.data.data.title,
          wordCards: response.data.data.wordList
        });
      }
    } catch (error) {
      console.error('Error fetching word set:', error);
      alert('Failed to load word set.');
    }
  };

  const handleChange = (index, field, value) => {
    const updatedWordCards = wordSet.wordCards.map((card, idx) => {
      if (idx === index) {
        return { ...card, [field]: value };
      }
      return card;
    });
    setWordSet({ ...wordSet, wordCards: updatedWordCards });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(`https://maeummal.com/word/wordSet/${setId}`, {
        title: wordSet.title,
        wordList: wordSet.wordCards
      });
      alert('Word set updated successfully.');
      navigate('/'); 
    } catch (error) {
      console.error('Error updating word set:', error);
      alert('Failed to update word set.');
    }
  };

  return (
    <div>
      <a href="/"><img src={Back} alt="Back to list" /></a>
      <h1>Edit Word Set</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Set Name</Form.Label>
          <Form.Control
            type="text"
            value={wordSet.title}
            onChange={e => setWordSet({ ...wordSet, title: e.target.value })}
          />
        </Form.Group>
        {wordSet.wordCards.map((card, index) => (
          <div key={index}>
            <Form.Group>
              <Form.Label>Word</Form.Label>
              <Form.Control
                type="text"
                value={card.meaning}
                onChange={e => handleChange(index, 'meaning', e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                value={card.description}
                onChange={e => handleChange(index, 'description', e.target.value)}
              />
            </Form.Group>
          </div>
        ))}
        <button type="submit">Update</button>
      </Form>
    </div>
  );
};

export default WordDetailTchr;
