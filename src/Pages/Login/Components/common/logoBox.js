import React from 'react';
import styled from 'styled-components';
import LogoImage from '../../../../Image/logo.jpg';

function LogoBox(props) {
  return (
    <Logo bottom>
      {props.data.image && <LogoImg src={LogoImage} />}
      <Title1 px={props.data.image}>{props.data.title1}</Title1>
      <Title2 px={props.data.image} weight={props.data.image}>
        {props.data.title2}
      </Title2>
    </Logo>
  );
}

export default LogoBox;

const Logo = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: ${props => (props.bottom ? '42px' : '30px')};
`;

const LogoImg = styled.img.attrs({
  alt: '로고 이미지',
})`
  margin: 0px auto;
  margin-bottom: 10px;
  height: 60px;
`;

const Title1 = styled.div`
  margin-bottom: 10px;
  font-size: ${props => (props.px ? '22px' : '16px')};
  font-weight: 300;
  text-align: center;
`;

const Title2 = styled(Title1)`
  font-weight: ${props => props.weight && 'bold'};
`;
