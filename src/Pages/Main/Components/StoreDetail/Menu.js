import { useState, useEffect } from 'react';
import styled from 'styled-components';

const Menu = props => {
  const [moreView, setMore] = useState(false);
  const [pamphlet, setPamphlet] = useState(false);
  const [menuList, setList] = useState([]);

  const openPamphlet = () => {
    setPamphlet(!pamphlet);
  };

  useEffect(() => {
    props.menuList.length > 3
      ? setList([...menuList, ...props.menuList.slice(0, 4)])
      : setList([
          ...menuList,
          ...props.menuList.slice(0, props.menuList.length),
        ]);
  }, []);

  const addList = () => {
    setList([...menuList, ...props.menuList.slice(4, props.menuList.length)]);
    setMore(!moreView);
  };

  return (
    <>
      <Pamphlet onClick={openPamphlet}>
        {!pamphlet ? '메뉴판 보기' : '리스트 보기'}
      </Pamphlet>
      {pamphlet ? (
        props.menu_pamphlet ? (
          <Pamphletimg src={props.menu_pamphlet} />
        ) : (
          <NoImg>메뉴판 이미지가 없습니다.</NoImg>
        )
      ) : (
        <StoreMenu>
          {menuList.map((data, idx) => (
            <MenuList key={idx}>
              <MenuImg src={data.menu_image_url} />
              <p>{data.name}</p>
              <p>{Number(data.price).toLocaleString()}원</p>
            </MenuList>
          ))}
        </StoreMenu>
      )}
      {!moreView && !pamphlet && <Button onClick={addList}>더보기</Button>}
    </>
  );
};
export default Menu;

const StoreMenu = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-top: 10px;
`;

const Pamphlet = styled.button`
  border-radius: 30px;
  margin-left: 240px;
  font-size: 16px;
  cursor: pointer;
  background-color: #ffa409;
  color: white;
`;
const Pamphletimg = styled.img`
  width: 100%;
  margin-top: 10px;
`;
const NoImg = styled.p`
  text-align: center;
  padding: 20px;
`;
const MenuImg = styled.img`
  width: 100%;
  height: 100%;
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

const MenuList = styled.div`
  display: flex;
  flex-direction: column;
  width: 160px;
  line-height: 20px;
`;
