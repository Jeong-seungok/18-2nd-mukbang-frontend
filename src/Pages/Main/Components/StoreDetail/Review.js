import React, { useState, useEffect } from 'react';
import { BsStarFill, BsStar, BsStarHalf } from 'react-icons/bs';
import styled from 'styled-components';
import Modal from './Modal';

const Review = props => {
  const [moreView, setMore] = useState(false);
  const [reviewList, setList] = useState([]);
  const [modalOpen, setModal] = useState(false);

  useEffect(() => {
    setList([...reviewList, ...props.reviews.slice(0, 1)]);
  }, []);

  const addList = () => {
    setList([...reviewList, ...props.reviews.slice(1, props.reviews.length)]);
    setMore(!moreView);
  };

  const createReview = () => {
    setModal(!modalOpen);
  };

  return (
    <StoreReview>
      <CreateBtn onClick={createReview}>리뷰 남기기</CreateBtn>
      {modalOpen && <Modal createReview={createReview} id={props.id} />}
      {reviewList.map((data, idx) => (
        <ReviewArea key={idx}>
          <UserArea>
            <UserImg src="https://mblogthumb-phinf.pstatic.net/MjAxOTEwMjlfNDUg/MDAxNTcyMzI5NDcwNjIz.aW2F-SaHTjtOHNUlRixK7I_scEWzQDe7k-JHLkxj9_wg.fKoqWcVf8Y-vVCKGpIqUCy--2rC8Na4pHoGawaOwmVcg.PNG.moonkuki/SE-c0ad31f7-b153-4905-9f10-9d81b853e1e6.png?type=w800" />
            <Column>
              <UserId>songbetter</UserId>
              <p>{data.updated_at.split('T')[0]}</p>
            </Column>
          </UserArea>
          {true && <ReviewImg src={data.image_url} />}
          <Rating>
            {RATESTAR[data.rating]} ({data.rating})
          </Rating>
          <p>{data.content}</p>
        </ReviewArea>
      ))}
      {!moreView && <Button onClick={addList}>더보기</Button>}
    </StoreReview>
  );
};

export default Review;

const arr = [BsStar(), BsStarHalf(), BsStarFill()];

const RATESTAR = {
  0.5: [arr[1], arr[0], arr[0], arr[0], arr[0]],
  1.0: [arr[2], arr[0], arr[0], arr[0], arr[0]],
  1.5: [arr[2], arr[1], arr[0], arr[0], arr[0]],
  2.0: [arr[2], arr[2], arr[0], arr[0], arr[0]],
  2.5: [arr[2], arr[2], arr[1], arr[0], arr[0]],
  3.0: [arr[2], arr[2], arr[2], arr[0], arr[0]],
  3.5: [arr[2], arr[2], arr[2], arr[1], arr[0]],
  4.0: [arr[2], arr[2], arr[2], arr[2], arr[0]],
  4.5: [arr[2], arr[2], arr[2], arr[2], arr[1]],
  5.0: [arr[2], arr[2], arr[2], arr[2], arr[2]],
};

const StoreReview = styled.div``;

const UserArea = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 15px;
`;

const UserImg = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50px;
`;

const UserId = styled.p`
  font-weight: bold;
  padding-bottom: 3px;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 10px;
  width: 20em;
`;

const ReviewImg = styled.img`
  width: 100%;
  height: 160px;
`;
const Rating = styled.div`
  margin: 15px 0;
  svg {
    color: #ffa409;
  }
`;

const ReviewArea = styled.div`
  position: relative;
  padding: 10px 0;
  line-height: 20px;
  border-bottom: 1px solid rgb(238, 238, 238);
`;

const CreateBtn = styled.button`
  border-radius: 30px;
  margin-left: 240px;
  font-size: 16px;
  cursor: pointer;
  background-color: #ffa409;
  color: white;
`;

const Button = styled.button`
  text-align: center;
  border: 1px solid rgb(238, 238, 238);
  margin-top: 10px;
  height: 47px;
  width: 100%;
  background-color: white;
  font-size: 16px;
  cursor: pointer;
`;
