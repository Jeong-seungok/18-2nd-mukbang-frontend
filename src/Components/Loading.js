import React from 'react';
import styled, { keyframes } from 'styled-components';

const Loading = () => {
  return (
    <LoadingBox>
      {Array(3)
        .fill(0)
        .map((circle, index) => (
          <LoaindgCricle key={index} circleIndex={index} />
        ))}
    </LoadingBox>
  );
};

export default Loading;

const bounce = keyframes`
    0%,
    100% {
      transform: scale(0);
    }
    40% {
      transform: scale(1);
    }
  }
`;
const LoadingBox = styled.div`
  position: absolute;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90px;
  z-index: 5;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const LoaindgCricle = styled.span`
  display: inline-block;
  width: 20px;
  height: 20px;
  background: #f9940b;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.3);
  border-radius: 50%;
  animation: ${bounce} 1.5s infinite ease-in-out both;
  animation-delay: ${props =>
    props.circleIndex === 0
      ? '-0.30s'
      : props.circleIndex === 1
      ? '-0.15s'
      : '0s'};
`;
