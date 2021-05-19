import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import { BsStarFill, BsStar } from 'react-icons/bs';

const Modal = props => {
  const [starFilled, setStar] = useState(Array(5).fill(false));
  const [postData, setPost] = useState({});

  const handleStarFill = index => {
    const click = [...starFilled];
    for (let i = 0; i < 5; i++) {
      click[i] = i <= index;
    }
    setStar(click);
  };

  const rating = starFilled[4]
    ? 5.0
    : starFilled[3]
    ? 4.0
    : starFilled[2]
    ? 3.0
    : starFilled[1]
    ? 2.0
    : starFilled[0]
    ? 1.0
    : 0;

  useEffect(() => {
    setPost({ ...postData, rating: rating });
  }, [starFilled]);

  const handleImgLink = e => {
    setPost({ ...postData, image_url: e.target.value });
  };

  const handleContent = e => {
    setPost({ ...postData, content: e.target.value });
  };

  const token = localStorage.getItem('jwt_token');

  const register = e => {
    // e.preventDefault();
    fetch(`http://10.58.2.56:8000/store/${props.id}/review`, {
      method: 'POST',
      headers: {
        Authorization: token,
      },
      body: JSON.stringify(postData),
    })
      .then(res => res.json())
      .then(res =>
        res.message === 'SUCCESS'
          ? props.createReview()
          : alert('리뷰 내용을 확인해주세요')
      );
  };

  return (
    <>
      <ModalWrap>
        <form>
          <Title>이 가게에 대한 평점을 남겨주세요.</Title>
          <Content>
            <>
              비추천
              <Rating>
                {starFilled.map((data, idx) =>
                  data ? (
                    <BsStarFill key={idx} onClick={() => handleStarFill(idx)} />
                  ) : (
                    <BsStar key={idx} onClick={() => handleStarFill(idx)} />
                  )
                )}
                <p>({rating}점)</p>
              </Rating>
              매우 추천
            </>
          </Content>
          <Title>리뷰 내용을 입력해 주세요 (100자 미만)</Title>
          <Content>
            <Textarea
              className="review"
              placeholder="이곳을 클릭하여 작성해주세요"
              onChange={handleContent}
              value={postData.content}
              maxlength="100"
              size="100"
            ></Textarea>
          </Content>
          <Title>이미지를 첨부해 주세요</Title>
          <Content>
            <Input
              placeholder="이곳에 이미지 링크를 넣어주세요"
              onChange={handleImgLink}
              value={postData.img_url}
            ></Input>
          </Content>
          <CloseBtn onClick={props.createReview}>✖</CloseBtn>
          <Submit onClick={register}>등록</Submit>
        </form>
      </ModalWrap>
    </>
  );
};

export default Modal;

const ModalWrap = styled.div`
  width: 100%;
  height: 490px;
  position: absolute;
  top: 260px;
  left: 250px;
  margin: -250px 0 0 -250px;
  background: #eee;
  z-index: 6;
  padding-top: 20px;
  color: #222222;
`;

const Title = styled.p`
  text-align: center;
  padding: 8px;
`;

const CloseBtn = styled.button`
  position: absolute;
  right: 0;
  top: 0;
  background-color: #ffa409;
  color: white;
  font-size: 15px;
  cursor: pointer;
`;

const Submit = styled.button`
  text-align: center;
  border: 1px solid rgb(238, 238, 238);
  margin-top: 10px;
  height: 47px;
  width: 100%;
  background-color: #ffa409;
  color: white;
  font-size: 16px;
  cursor: pointer;
`;

const Input = styled.input`
  width: 100%;
`;

const Textarea = styled.textarea`
  width: 100%;
  height: 76px;
  border: none;
  outline: none;
`;

const Content = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 10px;
  padding: 20px;
  text-align: center;
  background: white;
  line-height: 20px;
  color: #757575;
`;

const Rating = styled.div`
  margin: 2px;
  color: #ffa409;
`;
