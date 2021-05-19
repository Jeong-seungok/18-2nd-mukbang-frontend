import React, { useContext, useEffect, useRef } from 'react';
import Filter from './Filter/Filter';
import { CreateMapMark } from './CreateMapMarks';
import { GlobalContext } from '../../../../GlobalContext';
import bread from './images/bread.png';
import chicken from './images/chicken.png';
import chinese from './images/chinese.png';
import coffee from './images/coffee.png';
import fastfood from './images/fastfood.png';
import fusion from './images/fusion.png';
import korean from './images/korean.png';
import snack from './images/snack.png';
import sushi from './images/sushi.png';
import west from './images/west.png';
import './FoodMap.scss';
import { URL } from '../../../../config';
import { withRouter } from 'react-router';

const { kakao } = window;

export const stringToQuery = query => {
  const [_, params] = query.split('?');
  return params.split('&').reduce((acc, cur) => {
    const [k, v] = cur.split('=');
    return { ...acc, [k]: v };
  }, {});
};
const ClearMark = ClearMarkData => {
  const [markList, overlayList, clusterer] = ClearMarkData;
  markList.forEach(mark => mark.data.setMap(null));
  overlayList.forEach(overlay => overlay.data.setMap(null));
  clusterer.clear();
};
const CreateNewMark = (CreateMarkData, storeData) => {
  const [map, clusterer, handleMarkList] = CreateMarkData;
  const categoryImage = {
    베이커리: bread,
    카페: coffee,
    패스트푸드: fastfood,
    분식: snack,
    차칸: chicken,
    한식: korean,
    일식: sushi,
    중식: chinese,
    퓨전: fusion,
    양식: west,
  };
  const NewMarkers = storeData.map(data => {
    const icon = new kakao.maps.MarkerImage(
      categoryImage[data.category],
      new kakao.maps.Size(35, 35),
      {
        alt: '마커 이미지',
      }
    );
    return {
      id: data.store_id,
      data: new kakao.maps.Marker({
        position: new kakao.maps.LatLng(data.lat, data.lng),
        image: icon,
      }),
    };
  });
  const NewOverlays = NewMarkers.map((mark, index) => {
    return {
      id: mark.id,
      data: CreateMapMark(kakao, map, mark.data, storeData[index]),
    };
  });

  handleMarkList(NewMarkers, NewOverlays);
  clusterer.addMarkers(NewMarkers.map(mark => mark.data));
};
const getStoreData = async (url, ClearMarkData, CreateMarkData) => {
  const data = await fetch(url)
    .then(res => res.json())
    .then(res => res.results);

  ClearMark(ClearMarkData);
  CreateNewMark(CreateMarkData, data);
};

const FoodMap = ({ location }) => {
  const Map = useRef();
  const {
    query: { priceQuery, categoryQuery },
    filter: { price, category },
    map: { markList, overlayList, mapInstance },
    mapAction: { handleMarkList, setMapInstance },
  } = useContext(GlobalContext);
  const FetchURL = `${URL}/store?lat=37.50516782598803&lng=127.04870879368039&scale_level=10&pixel_height=1354&pixel_width=1918${priceQuery}${categoryQuery}`;
  const SearchQueryCheck = location.search.length !== 0;
  const ViewPoint = SearchQueryCheck
    ? { ...stringToQuery(location.search), zoomLevel: 1 }
    : { lat: 37.50516782598803, lng: 127.04870879368039, zoomLevel: 4 };

  useEffect(() => {
    const options = {
      center: new kakao.maps.LatLng(ViewPoint.lat, ViewPoint.lng),
      level: ViewPoint.zoomLevel,
    };
    const map = new kakao.maps.Map(Map.current, options);
    const clusterer = new kakao.maps.MarkerClusterer({
      map: map,
      averageCenter: true,
      minLevel: 4,
      minClusterSize: 2,
      styles: [
        {
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          background: '#fead33',
          color: '#fff',
          fontWeight: 'bold',
          textAlign: 'center',
          lineHeight: '40px',
          opacity: '80%',
        },
      ],
    });

    setMapInstance({ map, clusterer });
  }, []);

  useEffect(() => {
    if (mapInstance) {
      const { map, clusterer } = mapInstance;
      const ClearMarkData = [markList, overlayList, clusterer];
      const CreateMarkData = [map, clusterer, handleMarkList];
      getStoreData(FetchURL, ClearMarkData, CreateMarkData);
    }
  }, [mapInstance, price, category]);

  return (
    <div ref={Map} style={{ height: '100%' }}>
      <Filter />
    </div>
  );
};

export default withRouter(FoodMap);
