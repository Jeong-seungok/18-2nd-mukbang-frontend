import React, { useState, useEffect } from 'react';
import Roadview from './Roadview';
import Info from './Info';
import Preview from './Preview';
import { BiArrowBack } from 'react-icons/bi';
import styled from 'styled-components';
import { useHistory, withRouter } from 'react-router-dom';
import { URL } from '../../../../config';

const StoreDetail = props => {
  const history = useHistory();
  const [storeData, setData] = useState([]);

  useEffect(() => {
    history.location.pathname.split('/')[3] === props.match.params.id &&
      fetch(`${URL}/store/detail?store_id=${props.match.params.id}`)
        .then(res => res.json())
        .then(res => setData([res.result]));
  }, []);

  const goToStoreList = () => {
    history.push(`/`);
  };

  const [isRoadviewOpen, setOpen] = useState(false);
  const openRoadview = () => {
    setOpen(!isRoadviewOpen);
  };

  return (
    <Detail>
      {storeData.map(data => (
        <React.Fragment key={data.store_id}>
          <Compo>
            <Button onClick={isRoadviewOpen ? openRoadview : goToStoreList}>
              {BiArrowBack()}
            </Button>
            {isRoadviewOpen
              ? '위치보기'
              : `${data.region_2depth_name} ${data.region_3depth_name}`}
          </Compo>
          {isRoadviewOpen ? (
            <Roadview latitude={data.lat} longitude={data.lng} />
          ) : (
            <>
              <Preview
                id={data.store_id}
                introduction={data.one_line_introduction}
                rate={data.rating_average}
                review={data.review_count}
                name={data.store_name}
                category={data.category}
                images={data.store_images}
                open_status={data.open_status}
              />
              <Info
                address={data.full_address}
                phone_number={data.phone_number}
                parking={data.is_parking}
                wifi={data.is_wifi}
                reservation={data.is_reservation}
                reviews={data.reviews}
                opening_time={data.opening_time_description}
                sns_url={data.sns_url}
                metro_stations={data.metro_stations}
                openRoadview={openRoadview}
                latitude={data.lat}
                longitude={data.lng}
                menu_pamphlet={data.menu_pamphlet_image_url}
                menuList={data.menus}
                visitor_photos={data.visitor_photos}
                id={data.store_id}
              />
            </>
          )}
        </React.Fragment>
      ))}
    </Detail>
  );
};

export default withRouter(StoreDetail);

const Compo = styled.div`
  padding: 18px;
  background-color: white;
  display: flex;
  height: 50px;
  position: relative;
`;

const Button = styled.button`
  display: absoulte;
  font-size: 15px;
  cursor: pointer;
`;

const Detail = styled.div`
  position: absolute;
  top: 50px;
  right: 0;
  width: 400px;
  height: calc(100vh - 130px);
  border-left: 1px solid #333;
  background-color: rgb(238, 238, 238);
  overflow-y: scroll;
  z-index: 5;
`;
