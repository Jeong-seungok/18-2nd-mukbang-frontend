import { useState, useEffect } from 'react';
import styled from 'styled-components';

const ReviewImg = props => {
  const [moreView, setMore] = useState(false);
  const [imgList, setList] = useState([]);

  const handleMoreView = () => {
    setMore(!moreView);
  };

  useEffect(() => {
    props.visitor_photos.length > 8
      ? setList([...imgList, ...props.visitor_photos.slice(0, 9)])
      : setList([
          ...imgList,
          ...props.visitor_photos.slice(0, props.visitor_photos.length),
        ]);
  }, []);

  const addList = () => {
    setList([
      ...imgList,
      ...props.visitor_photos.slice(9, props.visitor_photos.length),
    ]);

    handleMoreView();
  };

  return (
    <>
      <StoreImg>
        {imgList.map((data, idx) => (
          <Img key={idx} src={data} />
        ))}
      </StoreImg>
      {!moreView && <Button onClick={addList}>더보기</Button>}
    </>
  );
};
export default ReviewImg;

const StoreImg = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 2px;
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

const Img = styled.img`
  width: 110px;
  height: 80px;
`;
