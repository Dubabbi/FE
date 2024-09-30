import React, { useState, useEffect } from 'react';
import * as C from '../CreateLesson/CreateLessonStyle';
import * as L from '../LessonTchr/LessonStyle';
import * as D from '../WordCreateTchr/WordDetailStyle';
import Upload from '/src/assets/icon/uploadphoto.svg';
import Back from '/src/assets/icon/back.svg';
import My from '/src/assets/icon/phimg.svg'; 
import UploadPhoto from '../CreateLesson/UploadPhoto';
import axios from 'axios';
import { AiFillDelete } from 'react-icons/ai';  
import { useLocation } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';

const Template4Edit = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // 상태 추가
  const [title, setTitle] = useState(''); 
  const [level, setLevel] = useState('');
  const [description, setDescription] = useState(''); 
  const [hint, setHint] = useState(''); 
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [modalCardIndex, setModalCardIndex] = useState(null); 
  const [storyCards, setStoryCards] = useState([
    { image: '', answerNumber: 1, imagePreviewUrl: My, description: '' },
    { image: '', answerNumber: 2, imagePreviewUrl: My, description: '' },
    { image: '', answerNumber: 3, imagePreviewUrl: My, description: '' },
  ]);
  
  useEffect(() => {
    const template4Id = 1; // 템플릿 ID (해당 ID를 설정)
    const fetchTemplateData = async () => {
      const accessToken = localStorage.getItem('key');
      if (!accessToken) {
        console.log('Authentication required');
        return;
      }
  
      try {
        const response = await axios.get(`https://maeummal.com/template4/get?template4Id=${template4Id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
  
        if (response.data.isSuccess && response.data.data) {
          const templateData = response.data.data;
          setTitle(templateData.title); 
          setLevel(templateData.level); 
          setDescription(templateData.description);
          setHint(templateData.hint);
          setStoryCards(templateData.storyCardEntityList || []);
        } else {
          throw new Error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchTemplateData();
  }, [location.state?.template4Id]);
  
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleHintChange = (e) => {
    setHint(e.target.value);
  };

  const toggleUploadModal = (index) => {
    setModalCardIndex(index);
    setIsUploadModalOpen(true);
  };

  const handleAddImage = (file) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newStoryCards = [...storyCards];
        newStoryCards[modalCardIndex].imagePreviewUrl = reader.result;
        setStoryCards(newStoryCards);
        setIsUploadModalOpen(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleStoryCardChange = (index, value) => {
    const newStoryCards = [...storyCards];
    newStoryCards[index].description = value;
    setStoryCards(newStoryCards);
  };

  const handleSubmit = async () => {
    const payload = {
      title, 
      level,  
      description,
      hint,
      storyCardEntityList: storyCards.map(card => ({
        image: card.image,
        answerNumber: card.answerNumber,
        description: card.description
      })),
    };

    try {
      const template4Id = 1; 
      const response = await axios.patch(
        `https://thingproxy.freeboard.io/fetch/https://maeummal.com/template4/update?template4Id=${template4Id}`, 
        payload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('key')}`,
          },
        }
      );
      if (response.data.isSuccess) {
        console.log('Response:', response.data);
        alert('템플릿이 성공적으로 수정되었습니다.');
        navigate('/lessontchr');
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      alert('템플릿 수정에 실패했습니다.');
    }
  };

  const handleDeleteTemplate = async () => {
    const confirmDelete = window.confirm('정말 템플릿을 삭제하시겠습니까?');
    if (confirmDelete) {
      const template4Id = 1; // 삭제할 템플릿 ID
  
      try {
        const response = await axios.delete(`https://maeummal.com/template4/delete?template4Id=${template4Id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
  
        if (response.data.isSuccess) {
          alert('템플릿이 삭제되었습니다.');
          navigate('/lessontchr'); 
        } else {
          alert(`삭제 실패: ${response.data.message}`);
        }
      } catch (error) {
        alert(`템플릿 삭제 중 오류가 발생했습니다: ${error.message}`);
      }
    }
  };

  return (
    <>
      <D.ImageWrap>
        <a href="/MainTchr">
          <img src={Back} alt="Back" />
        </a>
      </D.ImageWrap>
      
      <L.LessonWrapper>
        <L.Section>
          <h1>이야기 순서 배열하기</h1>

        </L.Section>
        
        <C.StoryWrap>
          <C.CardContainer>
            {storyCards.map((card, index) => (
              <C.SelectCard key={index}>
                <C.SelectBox>
                  <img
                    src={card.imagePreviewUrl}
                    alt="Preview"
                    style={{
                      borderRadius: '7px',
                      border: '4px solid #ACAACC',
                      width: 'auto',
                      height: '93%',
                      maxWidth: '93%',
                      objectFit: 'cover',
                      maxHeight: '100%',
                      marginLeft: '0px'
                    }}
                  />
                </C.SelectBox>
                <C.StoryField
                  type="text"
                  placeholder="이야기 입력"
                  as="textarea"
                  value={card.description}
                  onChange={(e) => handleStoryCardChange(index, e.target.value)}
                  style={{ backgroundColor: '#FCFBFB'}}
                />
              </C.SelectCard>
            ))}
          </C.CardContainer>
          <div style={{ width: '86%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginLeft: '7%', marginTop: '2%' }}>
            {storyCards.map((_, index) => (
              <C.Upload
                key={index}
                src={Upload}
                alt="Upload Photo"
                onClick={() => toggleUploadModal(index)}
              />
            ))}
          </div>
        </C.StoryWrap>
      </L.LessonWrapper>

      {/* 템플릿 삭제 버튼 */}
      <C.SubmitButton onClick={handleDeleteTemplate}>
        <AiFillDelete style={{ marginRight: '8px' }} />
        템플릿 삭제
      </C.SubmitButton>

      <C.HintWrapper style={{marginTop: '3%'}}>
          {/* 타이틀 수정 필드 */}
         <C.HintGroup controlId="formTitle">
            <C.Label>타이틀</C.Label>
            <C.HintBox style={{ minWidth: '200px' }}>
            <Form.Control
              type="text"
              placeholder="타이틀을 입력하세요"
              value={title}
              onChange={(e) => setTitle(e.target.value)} // 타이틀 수정
            />
            </C.HintBox>
          </C.HintGroup>

          {/* 레벨 수정 필드 */}
          <C.HintGroup controlId="formLevel">
            <C.Label>레벨</C.Label>
            <C.HintBox style={{ minWidth: '200px' }}>
            <Form.Control
              type="number"
              placeholder="레벨을 입력하세요"
              value={level}
              min={1} // 최소값 1 설정
              max={5} // 최대값 5 설정
              onChange={(e) => setLevel(e.target.value)} // 레벨 수정
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
      <C.SubmitButton onClick={handleSubmit}>제출</C.SubmitButton>

      <UploadPhoto
        isOpen={isUploadModalOpen}
        toggleModal={() => setIsUploadModalOpen(false)}
        handleAddImage={handleAddImage}
      />
    </>
  );
};

export default Template4Edit;
