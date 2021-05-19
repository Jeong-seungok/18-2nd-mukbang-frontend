import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ImageSlider from './ImageSlider';

const Preview = props => {
  const [isActive, setActive] = useState(false);
  const activeToggle = () => {
    setActive(!isActive);
  };
  const {
    open_status,
    name,
    rate,
    review,
    category,
    introduction,
    images,
  } = props;

  useEffect(() => {
    fetch(`http://10.58.2.56:8000/user/wishlist?store_id=${props.id}`, {
      method: 'POST',
      headers: {
        Authorization: localStorage.getItem('jwt-token'),
      },
    })
      .then(res => {
        return res.json();
      })
      .then(res => {
        console.log(res);
      });
  }, [isActive]);

  return (
    <PreviewStyle>
      <ImageSlider images={images} />
      <Name>
        {name}
        <Label>{open_status}</Label>
        <Button onClick={activeToggle}>{!isActive ? '🤍' : '💖'}</Button>
      </Name>
      <Overview>
        <div>
          <P>평점</P>
          <Span>{rate === null ? 0 : rate.toFixed(1)}/5.0</Span>
        </div>
        <div>
          <P>리뷰</P>
          <Span>{review}건</Span>
        </div>
        <div>
          <P>업종</P>
          <Span>{category}</Span>
        </div>
      </Overview>
      <Description>{introduction}</Description>
    </PreviewStyle>
  );
};

export default Preview;

const Description = styled.div`
  padding: 18px;
`;

const PreviewStyle = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
`;

const Name = styled.div`
  position: relative;
  font-weight: bold;
  font-size: 23px;
  padding: 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 76px;
  border-bottom: 1px solid rgb(238, 238, 238);
`;
const Label = styled.span`
  position: absolute;
  right: 17%;
  bottom: 25px;
  color: #ffa409;
  font-size: 15px;
`;

const Button = styled.button`
  font-size: 20px;
  cursor: pointer;
`;
const Overview = styled.div`
  padding: 18px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 79px;
  line-height: 20px;
  border-bottom: 1px solid rgb(238, 238, 238);
`;

const P = styled.p`
  color: #222222;
  font-size: 12px;
`;

const Span = styled.span`
  color: #2d60a3;
  font-size: 20px;
  font-weight: bold;
`;
