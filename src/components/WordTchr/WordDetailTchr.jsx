import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import ModalComponent from '../ImageModal/ImageModal';
import * as W from '../WordTchr/WordStyle';
import * as D from '../WordCreateTchr/WordDetailStyle';
import * as C from '../CreateLesson/CreateLessonStyle';
import Back from '/src/assets/icon/back.svg';
import placeholderImage from '/src/assets/icon/phimg.svg'; 

const WordDetailTchr = () => {
  const navigate = useNavigate();
  const { wordSetId } = useParams();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalCardIndex, setModalCardIndex] = useState(null);
  const [inputModalValue, setInputModalValue] = useState('');
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [generatedImageUrl, setGeneratedImageUrl] = useState(null);
  const [category, setCategory] = useState('');
  const [error, setError] = useState('');
  const [wordSet, setWordSet] = useState({
    title: '',
    category: '',
    description: '',
    wordCards: []
  });
  const categoryOptions = {
    FOOD: '음식',
    ANIMAL: '동물',
    SCHOOL: '학교',
    WEATHER: '날씨'
  };
  
  const [formData, setFormData] = useState({
    numberOfWords: 1 // 초기 낱말 개수를 설정
  });

  useEffect(() => {
    const fetchWordSet = async () => {
      const accessToken = localStorage.getItem("key");
      if (!accessToken) {
        setError('Authentication required');
        return;
      }

      try {
        const response = await axios.get(`https://maeummal.com/word/wordSet?wordSetId=${wordSetId}`, {
          headers: { Authorization: `Bearer ${accessToken}` }
        });

        if (response.data.isSuccess && response.data.data) {
          const { title, category, description, wordList } = response.data.data;
          setWordSet({
            title,
            category,
            description,
            wordCards: wordList || [] // Safe fallback as an empty array
          });
        } else {
          throw new Error(response.data.message || 'Failed to fetch word set');
        }
      } catch (error) {
        console.error('Error fetching word set:', error);
        setError(`Failed to fetch word set: ${error.message}`);
      }
    };

    fetchWordSet();
  }, [wordSetId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setWordSet({ ...wordSet, [name]: value });
    if (name === "numberOfWords") {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleWordCardChange = (wordId, field, value) => {
    const updatedCards = wordSet.wordCards.map(card =>
      card.wordId === wordId ? { ...card, [field]: value } : card
    );
    setWordSet({ ...wordSet, wordCards: updatedCards });
  };

  const toggleModal = (wordId, imagePreviewUrl) => {
    setModalCardIndex(wordId);
    setInputModalValue(imagePreviewUrl || '');
    setModalOpen(!modalOpen);
  };

  const handleModalSubmit = () => {
    const updatedCards = wordSet.wordCards.map(card =>
      card.wordId === modalCardIndex ? { ...card, imagePreviewUrl: inputModalValue } : card
    );
    setWordSet({ ...wordSet, wordCards: updatedCards });
    toggleModal(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedWordCards = wordSet.wordCards.map(card => ({
      wordId: card.wordId,
      meaning: card.meaning,
      description: card.description,
      image: card.imagePreviewUrl,
      prompt: card.prompt
    }));

    const updateData = {
      wordSetDTO: {
        title: wordSet.title,
        description: wordSet.description,
        category: wordSet.category
      },
      wordDTOList: updatedWordCards
    };

    try {
      const response = await axios.patch(`https://thingproxy.freeboard.io/fetch/https://maeummal.com/word/wordSet/${wordSetId}`, updateData, {
        headers: { 'Content-Type': 'application/json' }
      });
      if (response.data.isSuccess) {
        alert('낱말 카드 세트가 성공적으로 수정되었습니다.');
        navigate('/WordTchr');
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.error("Error updating word set:", error);
      alert('낱말 카드 세트 수정에 실패했습니다.');
    }
  };
  const renderWordImage = (currentWordindex) => {
    if (wordSet.wordCards.length > 0) {
      const image = wordSet.wordCards[currentWordindex]?.image || placeholderImage;
      return (
        <img
          src={image}
          alt="Word Image"
          style={{ maxWidth: '200px', borderRadius: '7px', border: '4px solid #ACAACC', width: '100%', height: 'auto' }}
        />
      );
    }
    return <p>No images available</p>;
  };
  
  // 이미지 수정 버튼 클릭 이벤트
  const handleEditImageClick = (index) => {
    setCurrentWordIndex(index);
    const card = wordSet.wordCards[index];
    toggleModal(card.wordId, card.imagePreviewUrl || placeholderImage);
  };
  useEffect(() => {
    if (wordSet.wordCards.length > 0 && currentWordIndex >= wordSet.wordCards.length) {
      setCurrentWordIndex(0); // 인덱스 초기화
    }
  }, [wordSet.wordCards]);

  const handleDeleteTemplate = async () => {
    const confirmDelete = window.confirm('정말 낱말 카드 세트를 삭제하시겠습니까?');
    if (confirmDelete) {
      try {
        const response = await axios.delete(`https://maeummal.com/word/wordSet/${wordSetId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('key')}`
          }
        });

        if (response.status === 204) {
          alert('낱말 세트가 성공적으로 삭제되었습니다.');
          navigate('/wordtchr'); 
        }
      } catch (error) {
        if (error.response) {
          if (error.response.status === 404) {
            alert('낱말 세트를 찾을 수 없습니다.');
          } else if (error.response.status === 403) {
            alert('자신의 낱말 세트만 삭제할 수 있습니다.');
          } else {
            alert(`삭제 실패: ${error.response.data.message}`);
          }
        } else {
          alert(`낱말 세트 삭제 중 오류가 발생했습니다: ${error.message}`);
        }
      }
    }
  };


  return (
    <>
      <D.ImageWrap>
        <a href="/WordTchr"><img src={Back} alt="Back to list" /></a>
      </D.ImageWrap>
      <W.Wrapper>
        <W.Section style={{ marginTop: '4%' }}>
          <h1>낱말 카드 수정</h1>
        </W.Section>
        </W.Wrapper>
        <D.TitleLine>
          <div>
            <D.WordTitle>세트 이름</D.WordTitle>
            <D.TitleText>
              <Form.Control
                type="text"
                name="title"
                value={wordSet.title}
                onChange={handleInputChange}
                placeholder="Enter set name"
              />
            </D.TitleText>
          </div>
          <D.Select>
            <D.WordTitle>낱말 개수</D.WordTitle>
            <Form.Select
              name="numberOfWords"
              value={formData.numberOfWords}
              onChange={handleInputChange}
              style={{ paddingLeft: '10px', paddingRight: '0px', fontSize: '1.5rem', borderRadius: '7px', border: '1px solid #ACAACC', width: '100%', height: '38px', marginLeft: '19%' }}
            >
              {Array.from({ length: 30 }, (_, i) => i + 1).map((number) => (
                <option key={number} value={number}>{number}개</option>
              ))}
            </Form.Select>
          </D.Select>
        </D.TitleLine>
        <D.TitleLine>
          <div>
            <D.WordTitle>설명</D.WordTitle>
            <D.TitleText>
              <Form.Control
                type="text"
                name="description"
                value={wordSet.description}
                onChange={handleInputChange}
                placeholder="Enter description"
              />
            </D.TitleText>
          </div>
        <D.Select>
          <D.WordTitle>카테고리</D.WordTitle>
          <Form.Select
            name="category"
            value={wordSet.category}
            onChange={handleInputChange}
            style={{ paddingLeft: '10px', paddingRight: '0px', fontSize: '1.5rem', borderRadius: '7px', border: '1px solid #ACAACC', width: '100%', height: '38px', marginLeft: '22%' }}
          >
            <option value="">카테고리 선택</option>
            {Object.entries(categoryOptions).map(([key, value]) => (
              <option key={key} value={key}>{value}</option>
            ))}
          </Form.Select>
          </D.Select>
          </D.TitleLine>
        {wordSet.wordCards.map((card, index) => (
          <React.Fragment key={card.wordId}>
            <hr style={{ width: '60%', margin: '80px', marginLeft: '20%' }} />
            <D.Line>
              <D.Box>
                <D.SecondTitle>이미지 수정</D.SecondTitle>
                {wordSet.wordCards.length > 0 ? (
                  <>
                <W.AddImage onClick={() => handleEditImageClick(index)}>
                {renderWordImage(index)}
                </W.AddImage></>
                ) : (
                  <p>No images available</p>
                )}
              </D.Box>
              <D.SecondBox>
                <D.WordTitle>단어</D.WordTitle>
                <D.WordName>
                  <Form.Control
                    type="text"
                    name="meaning"
                    value={card.meaning}
                    onChange={(e) => handleWordCardChange(card.wordId, 'meaning', e.target.value)}
                  />
                </D.WordName>
                <D.WordTitle>단어 설명</D.WordTitle>
                <D.AboutWord
                  as="textarea"
                  name="description"
                  value={card.description}
                  onChange={(e) => handleWordCardChange(card.wordId, 'description', e.target.value)}
                />
              </D.SecondBox>
            </D.Line>
          </React.Fragment>
        ))}
        <ModalComponent
          isOpen={modalOpen}
          toggleModal={() => setModalOpen(false)}
          inputModalValue={inputModalValue}
          handleInputModalChange={(e) => setInputModalValue(e.target.value)}
          handleModalSubmit={handleModalSubmit}
          generatedImageUrl={generatedImageUrl}
        />
        <C.SubmitButton style={{ marginBottom: '15%', marginTop: '5%' }} onClick={handleSubmit}>수정</C.SubmitButton>
    </>
  );
};

export default WordDetailTchr;