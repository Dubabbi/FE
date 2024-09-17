// Reward5.jsx
import React from 'react';
import styled from 'styled-components';
import reward from '/src/assets/image/Reward/reward5.svg';

export default function Reward5({ onClose }) {
  return (
    <RewardWrapper onClick={onClose}>
      <img src={reward} alt='보상' />
    </RewardWrapper>
  );
}

const RewardWrapper = styled.div`
  display: flex;
  max-width: 100%;
  height: 100vh;
  align-items: center;
  justify-content: center;
  img {
    max-width: 80%;
    margin: 10%;
    cursor: pointer;
  }
`;
