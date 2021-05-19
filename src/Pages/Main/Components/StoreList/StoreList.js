import React, { useContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import Loading from '../../../../Components/Loading';
import { URL } from '../../../../config';
import { GlobalContext } from '../../../../GlobalContext';
import { stringToQuery } from '../FoodMap/FoodMap';

const { kakao } = window;

const StoreList = ({ location, history }) => {
  const SearchQueryCheck = location.search.length !== 0;
  const ViewPoint = SearchQueryCheck
    ? { ...stringToQuery(location.search), zoomLevel: 1 }
    : { lat: 37.50516782598803, lng: 127.04870879368039, zoomLevel: 4 };
  const [data, setData] = useState({ stores: [] });
  const [offset, setOffset] = useState(0);
  const [review, setReview] = useState(false);
  const [rating, setRating] = useState(false);
  const [center, setCenter] = useState(ViewPoint);
  const CURRENT_DATA = useRef([]);
  const OFFSET = useRef(0);
  const {
    query: { priceQuery, categoryQuery },
    filter: { price, category },
    map: { mapInstance },
  } = useContext(GlobalContext);
  const boundData = mapInstance && {
    lat: center.lat,
    lng: center.lng,
    scale_level: mapInstance.map.getLevel(),
    pixel_width: window.innerWidth,
    pixel_height: window.innerHeight - 130,
  };
  const boundQuery =
    mapInstance &&
    Object.entries(boundData)
      .map((data, index) => `${index === 0 ? '?' : '&'}${data[0]}=${data[1]}`)
      .join('');
  const LIMIT = Math.ceil((window.innerHeight - 215) / 120);
  const query = `${URL}/store${boundQuery}${priceQuery}${categoryQuery}&limit=${LIMIT}&offset=${offset}`;
  const fetchData = (url, reset) => {
    fetch(url)
      .then(res => res.json())
      .then(storeData => {
        const nextData = reset
          ? { stores: storeData.results }
          : {
              stores: [...data.stores, ...storeData.results],
            };
        CURRENT_DATA.current = storeData.results;
        reset && setOffset(0);
        setData(nextData);
      });
  };
  const reviewClick = e => {
    if (e.target.innerText === '평점순') {
      setRating(!rating);
    }
    if (e.target.innerText === '리뷰순') {
      setReview(!review);
    }
  };

  useEffect(() => {
    if (mapInstance) {
      const { map } = mapInstance;
      const handleViewPoint = () => {
        const centerPoint = map.getCenter();
        const mapLevel = map.getLevel();
        setCenter({
          ...center,
          lat: centerPoint.Ma,
          lng: centerPoint.La,
          zoomLevel: mapLevel,
        });
      };
      kakao.maps.event.addListener(map, 'tilesloaded', handleViewPoint);
      fetchData(query, true);
    }
  }, [mapInstance]);

  useEffect(() => {
    if (mapInstance) {
      fetchData(query, true);
    }
  }, [center, price, category]);

  useEffect(() => {
    if (mapInstance) {
      // 필터, 정렬시 offset 은 초기화됌
      const reset = offset !== OFFSET.current;
      fetchData(query, reset);
    }
  }, [offset]);

  useEffect(() => {
    if (mapInstance && data.stores.length !== 0) {
      const review_count = `review_category=review_count`;
      fetchData(
        `${query}&${review_count}&${review ? 'reverse=1' : 'reverse=0'}`,
        true
      );
    }
  }, [review]);

  useEffect(() => {
    if (mapInstance && data.stores.length !== 0) {
      const rating_average = `review_category=rating_average`;
      fetchData(
        `${query}&${rating_average}&${rating ? 'reverse=1' : 'reverse=0'}`,
        true
      );
    }
  }, [rating]);

  const onScroll = e => {
    const { scrollHeight, scrollTop, clientHeight } = e.target;
    // CURRENT_DATA가 없으면 마지막 offset 데이터까지 받음
    if (
      scrollTop + clientHeight === scrollHeight &&
      CURRENT_DATA.current.length !== 0
    ) {
      setOffset(offset + 1);
      OFFSET.current = offset + 1;
    }
  };

  const goToStoreDetail = id => {
    history.push(`/main/items/${id}`);
  };

  return (
    <Store>
      {data.stores.length === 0 && offset === 0 ? (
        <Loading />
      ) : (
        <>
          <Header>
            <HeaderInfo> 가게 목록 {0}개</HeaderInfo>
          </Header>
          <StoreLists onScroll={onScroll}>
            <Sorting>
              <Grade onClick={reviewClick}>평점순</Grade>
              <Review onClick={reviewClick}>리뷰순</Review>
            </Sorting>
            {data.stores.map(store => (
              <StoreBox
                onClick={() => {
                  goToStoreDetail(store.store_id);
                }}
                key={store.store_id}
              >
                <ImgBox>
                  <img src={store.store_images[0]} alt="가게 대표 사진" />
                </ImgBox>
                <InfoBox>
                  <Category>{store.category}</Category>
                  <StoreName>{store.store_name}</StoreName>
                  <BottomContent>
                    평점 - {store.rating_average ? store.rating_average : 0}/5,
                    리뷰 {store.review_count}건
                  </BottomContent>
                  <BottomContent>
                    {store.full_address.substring(0, 5)}
                  </BottomContent>
                  <BottomContent>{store.one_line_introduction}</BottomContent>
                </InfoBox>
              </StoreBox>
            ))}
          </StoreLists>
        </>
      )}
    </Store>
  );
};

export default withRouter(StoreList);

const Store = styled.div`
  position: absolute;
  top: 50px;
  right: 0;
  width: 400px;
  height: calc(100vh - 130px);
  border-left: 1px solid #e1e1e1;
  background: #fff;
  z-index: 1;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  height: 50px;
  border-bottom: 1px solid #e1e1e1;
`;

const HeaderInfo = styled.div`
  width: 100%;
  padding: 0px 18px;
  font-size: 18px;
`;

const Sorting = styled.div`
  display: flex;
  padding: 10px 18px;
  border-bottom: 1px solid #e1e1e1;
`;

const Review = styled.div`
  font-size: 15px;
  cursor: pointer;
`;

const Grade = styled(Review)`
  margin-right: 15px;
`;

const StoreLists = styled.section`
  position: relative;
  width: 100%;
  height: calc(100% - 50px);
  overflow-y: auto;
`;
const InfoBox = styled.div``;
const ImgBox = styled.div`
  display: flex;
  padding: 15px;
  height: 120px;
  img {
    width: 100%;
    height: 100%;
    border-radius: 5px;
    object-fit: cover;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.5);
  }
`;
const StoreBox = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;
  &:hover {
    ${ImgBox} {
      padding: 0;
      img {
        border-radius: 0;
      }
    }
    ${InfoBox} {
      position: absolute;
      bottom: 10px;
      left: 50%;
      transform: translateX(-50%);
      text-align: center;
      div {
        display: none;
      }
      div:nth-child(2) {
        display: block;
        font-size: 20px;
        font-weight: 700;
        color: #fff;
      }
    }
  }
`;
const Category = styled.div`
  font-size: 9px;
`;
const StoreName = styled.div`
  font-size: 16px;
  line-height: 25px;
`;
const BottomContent = styled.div`
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  width: 200px;
  font-size: 12px;
  line-height: 18px;
`;
