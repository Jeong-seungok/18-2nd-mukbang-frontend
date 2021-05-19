import React, { useState } from 'react';
import { BiChevronDown, BiChevronUp } from 'react-icons/bi';
import StoreInfo from './StoreInfo';
import Map from './Map';
import Menu from './Menu';
import Review from './Review';
import ReviewImg from './ReviewImg';
import styled from 'styled-components';

const Info = props => {
  const [isActive, setActive] = useState(Array(6).fill(true));

  const activeToggle = index => {
    let toggle = [...isActive];
    toggle[index] = !isActive[index];
    setActive(toggle);
  };

  const INFO = [
    {
      title: '가게 정보',
      content: (
        <StoreInfo
          address={props.address}
          parking={props.parking}
          phone_number={props.phone_number}
          wifi={props.wifi}
          reservation={props.reservation}
          opening_time={props.opening_time}
          sns_url={props.sns_url}
        />
      ),
    },
    {
      title: '메뉴',
      content: (
        <Content>
          <Menu menu_pamphlet={props.menu_pamphlet} menuList={props.menuList} />
        </Content>
      ),
    },
    {
      title: '위치',
      content: (
        <Content>
          {props.address}
          <Map
            openRoadview={props.openRoadview}
            latitude={props.latitude}
            longitude={props.longitude}
          />
        </Content>
      ),
    },
    {
      title: '인근 전철역',
      content: (
        <Content>
          <ul>
            {props.metro_stations.map((data, idx) => (
              <Distance key={idx}>
                {`${data.name}(${data.line})`.toString()}까지 거리:{' '}
                <span>
                  {Number(
                    data.distance_from_store_m.toString().split('.')[0]
                  ).toLocaleString()}
                  m
                </span>
              </Distance>
            ))}
          </ul>
        </Content>
      ),
    },
    {
      title: '방문자 사진',
      content: (
        <Content>
          <ReviewImg visitor_photos={props.visitor_photos} />
        </Content>
      ),
    },
    {
      title: '리뷰',
      content: (
        <Content>
          <Review reviews={props.reviews} id={props.id} />
        </Content>
      ),
    },
  ];

  return (
    <>
      {INFO.map((data, idx) => (
        <Infomation key={idx}>
          <Toggle>
            {data.title}
            <Button onClick={() => activeToggle(idx)}>
              {isActive[idx] ? BiChevronUp() : BiChevronDown()}
            </Button>
          </Toggle>
          {isActive[idx] && data.content}
        </Infomation>
      ))}
    </>
  );
};

export default Info;

const Infomation = styled.div`
  padding: 18px;
  margin-top: 10px;
  background-color: white;
`;

const Toggle = styled.div`
  color: #222222;
  font-size: 18px;
  position: relative;
  padding: 5px 0px;
`;

const Button = styled.button`
  position: absolute;
  right: 0px;
  top: 2px;
  font-size: 30px;
  cursor: pointer;
`;

const Content = styled.div`
  position: relative;
  border-top: 1px solid rgb(238, 238, 238);
  padding: 18px 0px;
  color: #757575;
`;

const Distance = styled.li`
  line-height: 25px;
  & span {
    color: #2d60a3;
    font-weight: bold;
  }
`;
