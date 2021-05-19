import React from 'react';
import { useEffect, useState } from 'react/cjs/react.development';
import styled from 'styled-components';

const Favorite = () => {
  const [selectList, setSelect] = useState([]);
  const [index, setIndex] = useState(0);
  const [checkTrue, setCheck] = useState(false);
  const selectAll = e => {
    setCheck(!checkTrue);
  };
  const delectAll = e => {
    setSelect([]);
    setIndex(0);
  };
  useEffect(() => {
    fetch('http://10.58.2.56:8000/user/wishlist', {
      headers: {
        Authorization: localStorage.getItem('jwt-token'),
      },
    })
      .then(res => res.json())
      .then(res => setSelect([...res.results]));
  }, []);

  useEffect(() => {
    setIndex(selectList.length);
  }, [selectList]);

  return (
    <FavoriteMain>
      <section className="main">
        <Title main>💖 내가 찜한 식당 ({index})</Title>
        <Rayout>
          <Select onClick={selectAll}>전체선택</Select>
          <Select onClick={delectAll}>삭제</Select>
          {selectList.map(data => (
            <WishStore key={data.id}>
              <Checkbox
                type="checkbox"
                checked={checkTrue ? true : false}
              ></Checkbox>
              <WishInfo>
                <WishTitle>
                  <Title first>{data.store_name}</Title>
                  <Title sec>
                    평점:{data.rating}/5, 리뷰 {data.review}건
                  </Title>
                  <Title third>{data.category}</Title>
                </WishTitle>
                <Content grey>{data.full_address}</Content>
                <Content>{data.one_line_introduction}</Content>
              </WishInfo>
              <StoreImg src={data.image_url} />
            </WishStore>
          ))}
        </Rayout>
      </section>
    </FavoriteMain>
  );
};
export default Favorite;

const FavoriteMain = styled.main`
  margin-top: 130px;
`;
const Title = styled.span`
  padding: ${props => (props.main ? '0 0 0 10px' : '0 5px 0 0')};
  align-self: baseline;
  font-size: ${props => (props.first ? '23px' : props.sec ? '15px' : '15px')};
  font-weight: bold;
  color: ${props => (props.first ? 'red' : props.sec ? '#ffa409' : 'black')};
`;
const Rayout = styled.div`
  width: 50%;
  height: 100%;
  padding: 20px;
`;
const WishStore = styled.div`
  display: flex;
  padding: 10px;
  margin: 10px 0;
  width: 1000px;
  height: 100px;
  border: solid 1px lightgrey;
`;
const Checkbox = styled.input`
  align-self: center;
  width: 150px;
`;
const WishInfo = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 25px;
  width: 100%;
  height: 30%;
`;
const Content = styled.p`
  color: ${props => (props.grey ? 'grey' : 'black')};
`;
const WishTitle = styled.div`
  display: flex;
  line-height: 30px;
`;
const Select = styled.button`
  color: grey;
  font-size: 15px;
  cursor: pointer;
`;
const StoreImg = styled.img`
  height: 100%;
  width: 300px;
`;
