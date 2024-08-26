import React, { useState } from 'react';
import * as C from '../CreateLesson/CreateLessonStyle';
import * as D from '../WordCreateTchr/WordDetailStyle';
import * as L from '../LessonTchr/LessonStyle';
import Back from '/src/assets/icon/back.svg';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const FeedbackTem1 = () => {
    return (
        <>
            <D.ImageWrap>
                <a href="/MainTchr"><img src={Back} alt="Back to main" /></a>
            </D.ImageWrap>
            <L.LessonWrapper>
                <L.Section>
                    <h1>강의 제목</h1>
                </L.Section>
            </L.LessonWrapper>
        </>
    );
};

export default FeedbackTem1;
