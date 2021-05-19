import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faApple, faGooglePlay } from '@fortawesome/free-brands-svg-icons';
import { withRouter } from 'react-router-dom';
import searchIcon from './images/search_icon.png';
import slideImage1 from './images/slide_img1.jpeg';
import appBannerImg from './images/phone_banner.png';
import wecodeLogo from './images/wecode.jpeg';
import selectIcon from './images/select.png';
import banana from './images/banana.jpeg';
import fusion from './images/fusion.jpeg';
import pear from './images/pear.jpeg';
import Salad from './images/Salad.jpeg';
import { faUtensils } from '@fortawesome/free-solid-svg-icons';
import { URL } from '../../config';

const Home = props => {
  const [tabIndex, setTabIndex] = useState(0);
  const [bannerIndex, setBannerIndex] = useState(0);
  const [searchInput, setSearchInput] = useState('');
  const [searchData, setSearchData] = useState([]);

  const BannerImages = [
    { target: banana },
    { target: fusion },
    { target: pear },
    { target: Salad },
  ];

  const handleSelectType = index => {
    setTabIndex(index);
  };

  const getSearchData = e => {
    searchInput !== '' &&
      fetch(`${URL}/store/search?q=${searchInput}`)
        .then(res => res.json())
        .then(res => {
          setSearchData(res.results === undefined ? [] : res.results);
        });
  };

  const movePlace = (lat, lng) => {
    props.history.push(`/?lat=${lat}&lng=${lng}`);
  };

  useEffect(() => {
    const autoBanner = setTimeout(() => {
      const target =
        bannerIndex >= BannerImages.length - 1 ? 0 : bannerIndex + 1;
      setBannerIndex(target);
    }, 4000);
    return () => clearTimeout(autoBanner);
  }, [BannerImages]);

  return (
    <HomeMainWrap>
      <BannerBox activeBanner={BannerImages[bannerIndex].target}>
        <BlurBox />
        <SearchContainer>
          <SearchTitle>어떤 맛집을 찾고 계세요?</SearchTitle>
          <SelectBox>
            {selectType.map((select, index) => {
              return (
                <SelectItem
                  key={index}
                  onClick={() => {
                    handleSelectType(index);
                  }}
                >
                  <SelectTargetText activeCheck={tabIndex === index}>
                    {select.title}
                  </SelectTargetText>
                </SelectItem>
              );
            })}
            <SelectTargetIcon tabIndex={tabIndex} />
          </SelectBox>
          <SearchInputBox>
            <SearchInput
              type="text"
              placeholder="원하시는 지역명, 지하철역, 가게명을 입력해주세요"
              value={searchInput}
              onChange={e => {
                setSearchInput(e.target.value);
              }}
              onKeyUp={getSearchData}
            />
            <SearchBtn onClick={getSearchData}>
              <SearchBtnIcon />
            </SearchBtn>
            <SearchListBox>
              {searchData.length !== 0 &&
                searchInput.length !== 0 &&
                searchData.map((data, index) => {
                  const {
                    store_name,
                    full_address,
                    lat,
                    lng,
                    near_metro_stations,
                  } = data;
                  return (
                    <SearchListItem
                      key={index}
                      onClick={() => {
                        movePlace(lat, lng);
                      }}
                    >
                      <FontAwesomeIcon icon={faUtensils} />
                      <SearchName>
                        {store_name}
                        {near_metro_stations.length !== 0 &&
                          near_metro_stations.map((station, index) => (
                            <SearchStation key={index}>
                              [{station}]
                            </SearchStation>
                          ))}
                      </SearchName>
                      <SearchPlace>{full_address}</SearchPlace>
                    </SearchListItem>
                  );
                })}
            </SearchListBox>
          </SearchInputBox>
        </SearchContainer>
      </BannerBox>
      <SectionBox>
        <NoticeBox>
          {NoticeData.map((notice, index) => {
            return (
              <NoticeItem key={index} leftSpace={index === 0}>
                <NoticeHeader>{notice.title}</NoticeHeader>
                <NoticeContent>
                  {index === 0 ? (
                    <NoticeImage src={slideImage1} alt="광고 이미지" />
                  ) : (
                    <NoticeListBox>
                      {notice.sub.map((text, index) => (
                        <NoticeListItem key={index}>{text}</NoticeListItem>
                      ))}
                    </NoticeListBox>
                  )}
                </NoticeContent>
              </NoticeItem>
            );
          })}
        </NoticeBox>
      </SectionBox>
      <SectionBox odd>
        <NoticeBox>
          <ImageBannerBox>
            <ImageBanner src={wecodeLogo} alt="위코드 로고" />
          </ImageBannerBox>
          <AppBannerBox>
            <AppBannerTitle>먹방앱을 다운받으세요!</AppBannerTitle>
            <AppBox>
              {title.map((title, index) => {
                const firstList = index === 0;
                return (
                  <AppList key={index} firstList={firstList}>
                    <FontAwesomeIcon
                      icon={firstList ? faGooglePlay : faApple}
                    />
                    {title}
                  </AppList>
                );
              })}
            </AppBox>
          </AppBannerBox>
        </NoticeBox>
      </SectionBox>
    </HomeMainWrap>
  );
};

const NoticeData = [
  { title: '소개할게요' },
  {
    title: '뉴스',
    sub: [
      '집을 찾다, 나를 찾다',
      '먹방 TVCF 보러가기',
      '지겨운 먹방, 권태기 극복하기',
      'VR로 먹방 하기',
      '먹방에서 신한카드로 월세 내세요',
    ],
  },
  {
    title: '공지사항',
    sub: [
      '[공지] 먹방 개인정보처리방침(2021/04/09) 개정 안내',
      '[공지] 먹방 개인정보처리방침(2021/04/07) 개정 안내',
      '[공지] 먹방 개인정보처리방침(2021/04/05) 개정 안내',
      '[공지] 먹방 서비스 이용약관(2021/04/03) 개정 안내',
      '[공지] 먹방 서비스 이용약관(2021/04/01) 개정 안내',
    ],
  },
];

const selectType = [
  { title: '카페' },
  { title: '베이커리' },
  { title: '한식' },
  { title: '퓨전요리' },
  { title: '기타주점' },
];

const title = ['Google Play', 'App Store'];

const HomeMainWrap = styled.main`
  padding-top: 80px;
`;

const BannerBox = styled.section`
  position: relative;
  height: 460px;
  background: url(${props => props.activeBanner}) no-repeat;
  background-size: cover;
  background-position: center;
  transition: all 1s;
  color: #000;
`;

const BlurBox = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(6px);
`;

const SearchContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  width: 574px;
  height: 100%;
  margin: 0 auto;
  z-index: 2;
`;

const SearchTitle = styled.h2`
  font-size: 40px;
  font-weight: 700;
`;

const SelectBox = styled.ul`
  display: flex;
  position: relative;
  width: 100%;
  margin-top: 60px;
  border-radius: 8px;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  font-size: 17px;
`;

const SelectItem = styled.li`
  position: relative;
  flex: 1;
  height: 40px;
  text-align: center;
  cursor: pointer;
`;

const SelectTargetIcon = styled.span`
  display: inline-block;
  position: absolute;
  left: ${props => props.tabIndex * 20}%;
  width: 115px;
  height: 48px;
  background: url(${selectIcon}) no-repeat;
  background-size: 115px 48px;
  transition: all 0.2s;
`;
const SelectTargetText = styled.em`
  display: inline-block;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  transform: translate(-50%, -50%);
  color: ${props => (props.activeCheck ? '#2d60a3' : '#fff')};
  font-weight: ${props => (props.activeCheck ? '700' : '400')};
  transition: all 0.2s;
  z-index: 2;
`;

const SearchInputBox = styled.div`
  position: relative;
  width: 100%;
  margin: 25px 0 70px;
  background: #f2f2f2;
  border-radius: 8px;
`;

const SearchInput = styled.input`
  width: 100%;
  height: 60px;
  padding: 19px 28px;
  font-size: 16px;
`;

const SearchBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  right: 0;
  width: 66px;
  height: 100%;
  background: #f9940b;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
  font-size: 28px;
  color: #fff;
  cursor: pointer;
`;

const SearchBtnIcon = styled.span`
  display: inline-block;
  width: 28px;
  height: 28px;
  background: url(${searchIcon}) no-repeat;
  background-size: 28px;
`;

const SectionBox = styled.section`
  padding: ${props => (props.odd ? '40px 0 0' : '40px 0 27px')};
  background: ${props => (props.odd ? '#f6f6f6' : '#fff')};
`;

const NoticeBox = styled.div`
  display: flex;
  width: 840px;
  margin: 0 auto;
`;
const NoticeItem = styled.div`
  flex: 1;
  margin-left: ${props => (props.leftSpace ? '0px' : '30px')};
`;

const NoticeHeader = styled.h1`
  padding: 4px 0 10px;
  font-weight: 700;
  border-bottom: 1px solid #e1e1e1;
`;

const NoticeContent = styled.div`
  margin-top: 8px;
`;

const NoticeListBox = styled.ul`
  font-size: 12px;
`;

const NoticeListItem = styled.li`
  max-width: 260px;
  height: 32px;
  line-height: 32px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
  &:hover {
    background: #f6f6f6;
  }
`;

const NoticeImage = styled.img`
  width: 100%;
  height: 152px;
  padding-top: 10px;
  object-fit: cover;
`;

const ImageBannerBox = styled.div`
  position: relative;
  flex: 1;
  height: 280px;
  background: url(${appBannerImg}) no-repeat;
  background-size: 250px;
  background-position: 55px 0;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    right: 55px;
    display: block;
    width: 161px;
    height: 252px;
    background: #000;
    border-top-left-radius: 17px;
    border-top-right-radius: 17px;
  }
`;
const ImageBanner = styled.img`
  position: absolute;
  bottom: 55px;
  right: 75px;
  width: 120px;
  height: 120px;
  z-index: 1;
`;
const AppBannerBox = styled.div`
  width: 520px;
`;
const AppBannerTitle = styled.h2`
  margin: 100px 0 40px;
  font-size: 17px;
  font-weight: 700;
`;
const AppBox = styled.ul`
  display: flex;
`;
const AppList = styled.li`
  width: 190px;
  height: 52px;
  margin-left: ${props => (props.firstList ? '0px' : '15px')};
  background: #eeeeee;
  font-size: 20px;
  font-weight: 700;
  text-align: center;
  line-height: 52px;
  cursor: pointer;
  &:hover {
    background: rgba(0, 0, 0, 0.1);
  }

  svg {
    margin-right: 8px;
  }
`;

const SearchListBox = styled.ul`
  position: absolute;
  top: 70px;
  width: 100%;
  max-height: 400px;
  background: #fff;
  border-radius: 5px;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.5);
  overflow-y: auto;
`;

const SearchListItem = styled.li`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  margin: 3px 0;
  padding: 3px 15px 3px 52px;
  cursor: pointer;

  &:hover {
    background: #f6f6f6;
  }
  svg {
    position: absolute;
    top: 50%;
    left: 20px;
    transform: translateY(-50%);
  }
`;

const SearchName = styled.span``;
const SearchStation = styled.span`
  font-size: 14px;
  margin-left: 2px;
`;
const SearchPlace = styled.span`
  font-size: 13px;
`;
export default withRouter(Home);
