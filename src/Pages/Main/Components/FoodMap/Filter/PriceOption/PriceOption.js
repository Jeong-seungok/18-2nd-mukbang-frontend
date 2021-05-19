import React, { useContext, useEffect, useState } from 'react';
import { Slider } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { OptionTitleBox, OptionTitle } from '../OptionStyled/OptionStyled';
import { GlobalContext } from '../../../../../../GlobalContext';
import styled from 'styled-components';
import FilterBtn from '../Images/Filter.png';

const marks = [
  { value: 0, label: '최소' },
  { value: 5000, label: '5천원' },
  { value: 10000, label: '1만원' },
  { value: 15000, label: '1만5천원' },
  { value: 20000, label: '최대' },
];

const PriceSlider = withStyles({
  root: {
    width: '100%',
    margin: 0,
    padding: 0,
    height: '30px',
    boxSizing: 'border-box',
  },
  mark: { backgroundColor: '#e1e1e1', height: 7, width: 1, top: '10px' },
  thumb: {
    width: '34px',
    height: '34px',
    background: `url(${FilterBtn})`,
    backgroundSize: '34px',
    boxShadow: 'none !important',
    top: '-10px',
    transform: 'translateX(-33.5%)',
  },
  markLabel: { top: '20px', fontSize: '10px', color: '#ccc' },
  track: { height: 4, background: '#444', borderRadius: '6px' },
  rail: { height: 4, background: '#ccc', borderRadius: '6px' },
})(Slider);

const PriceOption = ({ selectOption }) => {
  const [title, setTitle] = useState('');
  const [changePrice, setChangePrice] = useState([0, 20000]);
  const {
    filter: { price },
    filterAction: { handlePrice },
  } = useContext(GlobalContext);

  const handleCurrentPrice = (e, newValue) => {
    setChangePrice(newValue);
  };

  useEffect(() => {
    if (price !== changePrice) setChangePrice(price);
    if (price[0] === 0 && price[1] === 20000) return setTitle('전체');
    if (price[0] === 0)
      return setTitle(`${Number(price[1]).toLocaleString()}원 이하`);
    if (price[1] === 20000)
      return setTitle(`${Number(price[0]).toLocaleString()}원 이상`);

    setTitle(
      `${Number(price[0]).toLocaleString()}원 ~ ${Number(
        price[1]
      ).toLocaleString()}원`
    );
  }, [price]);

  return (
    <PriceOptionBox selectOption={selectOption}>
      <OptionTitleBox>
        <OptionTitle>가격범위</OptionTitle>
        <OptionSelectTitle>{title}</OptionSelectTitle>
      </OptionTitleBox>
      <RangeSliderBox>
        <PriceSlider
          min={0}
          max={20000}
          step={1000}
          value={changePrice}
          marks={marks}
          aria-labelledby="range-slider"
          onChange={handleCurrentPrice}
          onMouseUp={() => {
            handlePrice(changePrice);
          }}
        />
      </RangeSliderBox>
    </PriceOptionBox>
  );
};

const PriceOptionBox = styled.div`
  display: ${props => (props.selectOption === 1 ? 'block' : 'none')};
`;

const OptionSelectTitle = styled.strong`
  color: #fa880b;
  font-weight: 700;
`;

const RangeSliderBox = styled.div`
  padding: 20px 20px 0;
  background: #fff;
`;

export default PriceOption;
