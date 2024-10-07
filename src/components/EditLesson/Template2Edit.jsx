import React, { useState, useEffect } from 'react';
import * as C from '../CreateLesson/CreateLessonStyle';
import * as L from '../LessonTchr/LessonStyle';
import * as D from '../WordCreateTchr/WordDetailStyle';
import Back from '/src/assets/icon/back.svg';
import add from '../../assets/icon/add.svg';
import ModalComponent from '../ImageModal/ImageModal';
import axios from 'axios';
import { AiFillDelete } from 'react-icons/ai';  
import { useLocation, useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';

const Template2Edit = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // location.state에서 templateId 가져오기
  const { templateId } = location.state || {};

  // 상태 초기화
  const [title, setTitle] = useState('');
  const [level, setLevel] = useState('');  
  const [description, setDescription] = useState(''); 
  const [hint, setHint] = useState(''); 
  const [storyCards, setStoryCards] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalCardIndex, setModalCardIndex] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // 템플릿 데이터 로드
  useEffect(() => {
    if (!templateId) {
      console.error('Template ID is missing');
      return;
    }

    const fetchTemplateData = async () => {
      try {
        const response = await axios.get(`https://maeummal.com/template2/get?template2Id=${templateId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("key")}` }
        });
        if (response.data.isSuccess) {
          const fetchedData = response.data.data;
          setTitle(fetchedData.title);  
          setLevel(fetchedData.level);  
          setDescription(fetchedData.description);  
          setHint(fetchedData.hint);  
          setStoryCards(fetchedData.storyCardEntityList || []);  
        } else {
          throw new Error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTemplateData();
  }, [templateId]);

  const toggleModal = (index) => {
    setModalCardIndex(index);
    setModalOpen(!modalOpen);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleModalSubmit();
    }
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleHintChange = (e) => {
    setHint(e.target.value);
  };

  const handleModalSubmit = async () => {
    try {
      const response = await axios.post('https://maeummal.com/ai/image', { prompt: inputValue });
      if (response.status === 200 && response.data) {
        const newStoryCards = [...storyCards];
        newStoryCards[modalCardIndex].image = response.data;
        setStoryCards(newStoryCards);
        setModalOpen(false);
      }
    } catch (error) {
      console.error('Error generating image:', error);
      alert('이미지 생성에 실패했습니다.');
    }
  };

  const handleSubmit = async () => {
    const payload = {
      title: title,  
      description: description,  
      level: level,  
      hint: hint,  
      imageNum: storyCards.length,
      storyCardEntityList: storyCards.map(card => ({
        image: card.image,
        answerNumber: card.answerNumber
      }))
    };

    try {
      const response = await axios.put(
        `https://thingproxy.freeboard.io/fetch/https://maeummal.com/template2/update/${templateId}`,  
        payload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('key')}`,
          },
        }
      );
      alert('템플릿이 성공적으로 수정되었습니다.');
      navigate('/lessontchr');
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
      alert('템플릿 수정에 실패했습니다.');
    }
  };

  // 템플릿 삭제 함수
  const handleDeleteTemplate = async () => {
    const confirmDelete = window.confirm('정말 템플릿을 삭제하시겠습니까?');
    if (confirmDelete) {
      try {
        const response = await axios.delete(`https://maeummal.com/template2/${templateId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('key')}`
          }
        });

        // 상태 코드에 따라 다른 메시지를 출력
        if (response.status === 204) {
          alert('템플릿이 성공적으로 삭제되었습니다.');
          navigate('/lessontchr'); 
        }
      } catch (error) {
        if (error.response) {
          if (error.response.status === 404) {
            alert('템플릿을 찾을 수 없습니다.');
          } else if (error.response.status === 403) {
            alert('자신의 템플릿만 삭제할 수 있습니다.');
          } else {
            alert(`삭제 실패: ${error.response.data.message}`);
          }
        } else {
          alert(`템플릿 삭제 중 오류가 발생했습니다: ${error.message}`);
        }
      }
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;  
  }

  return (
    <>
      <D.ImageWrap>
        <a href="/MainTchr"><img src={Back} alt="" /></a>
      </D.ImageWrap>
      <L.LessonWrapper>
        <L.Section>
          <h1>이미지 순서 배열하기</h1>
          <p>순서대로 이미지를 생성해 주세요.</p>
        </L.Section>
        <C.Line>
          {storyCards.map((card, index) => (
            <C.Box key={index} style={{ border: card.image ? 'none' : '5px solid #ACAACC' }}>
              <div onClick={() => toggleModal(index)}>
                <img
                  style={{
                    width: card.image ? '100%' : '40%',
                    height: 'auto',
                    borderRadius: '1rem',
                    border: card.image ? '5px solid #ACAACC' : 'none'
                  }}
                  src={card.image || add}
                  alt="Add Image"
                />
              </div>
            </C.Box>
          ))}
        </C.Line>
      </L.LessonWrapper>
      <C.HintWrapper>
        <C.HintGroup>
          <C.Label>타이틀</C.Label>
          <C.HintBox style={{ minWidth: '200px' }}>
            <Form.Control
              type="text"
              placeholder="타이틀을 입력하세요"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}  
            />
          </C.HintBox>
        </C.HintGroup>

        <C.HintGroup>
          <C.Label>난이도</C.Label>
          <C.HintBox style={{ minWidth: '200px' }}>
          <Form.Control
              type="number"
              placeholder="레벨을 입력하세요"
              value={level}
              min={1} 
              max={5} 
              onChange={(e) => setLevel(e.target.value)} 
            />
          </C.HintBox>
        </C.HintGroup>

        <C.HintGroup>
          <C.Label>해설</C.Label>
          <C.HintBox style={{ minWidth: '200px' }}>
            <Form.Control
              type="text"
              placeholder="해설을 입력하세요"
              name="description"
              value={description}
              onChange={handleDescriptionChange}  
            />
          </C.HintBox>
        </C.HintGroup>

        <C.HintGroup>
          <C.Label>힌트</C.Label>
          <C.HintBox style={{ minWidth: '200px' }}>
            <Form.Control
              type="text"
              placeholder="문제 힌트를 입력하세요"
              name="hint"
              value={hint}
              onChange={handleHintChange}  
            />
          </C.HintBox>
        </C.HintGroup>
      </C.HintWrapper>
      {modalOpen && (
        <ModalComponent
          isOpen={modalOpen}
          toggleModal={() => setModalOpen(false)}
          inputModalValue={inputValue}
          handleInputModalChange={handleInputChange}
          handleKeyPress={handleKeyPress}
          handleModalSubmit={handleModalSubmit}
          generatedImageUrl={storyCards[modalCardIndex]?.image}
        />
      )}

      <C.ButtonContainer>
      <C.DeleteButton onClick={handleDeleteTemplate}>
            삭제
            <AiFillDelete style={{ marginLeft: '5px' }} />
          </C.DeleteButton>
      <C.EditButton onClick={handleSubmit}>수정</C.EditButton>
      </C.ButtonContainer>
    </>
  );
};

export default Template2Edit;
