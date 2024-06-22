//FloatingButton.jsx
import React from 'react';
import Pen from '../../assets/icon/pen.svg';

export default function FloatingButton() {
    return (
        <a href ="">
            <img
                src={Pen} 
                width="60vw" 
                height="60vw" 
                style={{position: 'fixed', right: 25, bottom: 25,}}/>
        </a>
    );
}