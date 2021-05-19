import React from 'react';
import { withRouter } from 'react-router-dom';
import FoodMap from './Components/FoodMap/FoodMap';
import StoreList from './Components/StoreList/StoreList';
import StoreDetail from './Components/StoreDetail/StoreDetail';
import { GlobalProvider } from '../../GlobalContext';
import styled from 'styled-components';

const Main = ({ location }) => {
  const PATH = location.pathname;

  return (
    <MainSection>
      <GlobalProvider>
        <FoodMap />
        {PATH === '/' ? <StoreList /> : <StoreDetail />}
      </GlobalProvider>
    </MainSection>
  );
};

const MainSection = styled.main`
  position: relative;
  height: calc(100vh - 80px);
  margin-top: 80px;
`;

export default withRouter(Main);
