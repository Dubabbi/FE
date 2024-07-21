// Reward.jsx
import React from 'react';
import styled from 'styled-components';
import reward from '/src/assets/image/reward.svg';

export default function Reward({ onClose }) {
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
    margin-left: 10%;
    cursor: pointer;
  }
`;
