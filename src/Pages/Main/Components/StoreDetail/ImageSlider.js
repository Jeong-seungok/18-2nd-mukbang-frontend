import { useState } from 'react';
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri';
import styled from 'styled-components';

const ImageSlider = props => {
  const [index, setIndex] = useState(0);

  const slideImage = e => {
    e.target.value === RiArrowLeftSLine()
      ? index && setIndex((index - 1) % props.images.length)
      : setIndex((index + 1) % props.images.length);
  };

  return (
    props.images.length && (
      <ImgSlider>
        <Left onClick={slideImage}>{RiArrowLeftSLine()}</Left>
        <Img src={props.images[index]} />
        <Right onClick={slideImage}>{RiArrowRightSLine()}</Right>
      </ImgSlider>
    )
  );
};

export default ImageSlider;

const ImgSlider = styled.div`
  position: relative;
  display: flex;
  justify-content: space-around;
`;

const Img = styled.img`
  width: 100%;
  height: 200px;
  transition-property: width;
  transition-duration: 2ms;
`;

const Left = styled.div`
  position: absolute;
  padding-top: 21%;
  left: 0;
  height: 100%;
  width: 10%;
  cursor: pointer;
  background-color: #ffa409;
  opacity: 0.2;
  font-size: 50px;
  color: white;
  :hover {
    opacity: 0.8;
  }
`;

const Right = styled.div`
  position: absolute;
  text-align: center;
  padding-top: 21%;
  right: 0;
  height: 100%;
  width: 10%;
  cursor: pointer;
  background-color: #ffa409;
  opacity: 0.2;
  font-size: 50px;
  color: white;
  :hover {
    opacity: 0.8;
  }
`;
