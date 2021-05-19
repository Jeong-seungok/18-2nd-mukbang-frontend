import { useEffect } from 'react';
import styled from 'styled-components';

const Rodeview = props => {
  /*global kakao*/
  useEffect(() => {
    const roadviewContainer = document.getElementById('roadview');
    const roadview = new kakao.maps.Roadview(roadviewContainer);
    const roadviewClient = new kakao.maps.RoadviewClient();
    const position = new kakao.maps.LatLng(props.latitude, props.longitude);

    roadviewClient.getNearestPanoId(position, 50, function (panoId) {
      roadview.setPanoId(panoId, position);
    });
  });
  return <View id="roadview" />;
};

export default Rodeview;

const View = styled.div`
  width: 100%;
  height: calc(100% - 50px);
`;
