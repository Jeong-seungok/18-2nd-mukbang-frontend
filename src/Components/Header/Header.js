import React from 'react';
import styled from 'styled-components';
import { Link, withRouter } from 'react-router-dom';
import { useState, useEffect } from 'react';
import logo from './images/logo.jpg';

const Header = ({ location }) => {
  const name = localStorage.getItem('name');
  const emailAdd = localStorage.getItem('email');
  const email = emailAdd && emailAdd.split('@', 1)[0];
  const idOrEmail = name ? name : email;
  const kakaoRemoveItem = ['name', 'Login-token'];
  const emailRemoveItem = ['email', 'token'];

  const { pathname } = location;
  const [tabIndex, setTabIndex] = useState(0);
  const handleTab = (e, tabIndex) => {
    setTabIndex(tabIndex);
  };
  useEffect(() => {
    const pathList = ['/', '/favorite', '/register'];
    const pathCondition = pathList.includes(pathname);
    pathCondition && setTabIndex(1);
  }, [pathname]);

  //추가
  const logOut = () => {
    idOrEmail === name
      ? kakaoRemoveItem.forEach(item => localStorage.removeItem(item))
      : emailRemoveItem.forEach(item => localStorage.removeItem(item));
  };

  return (
    <HeaderBox>
      <InnerTop>
        <LogoWrap>
          <Link to="/home">
            <LogoImage src={logo} alt="로고 이미지" />
          </Link>
        </LogoWrap>
        <GnbContainer>
          {menuData.map((menu, menuindex) => {
            return (
              <GnbList key={menuindex}>
                <NavTitle>{menu.title}</NavTitle>
                <NavDetail>{menu.detail}</NavDetail>
                <SubNavBox>
                  {menu.sub.map((sub, subindex) => (
                    <SubNavList key={subindex}>
                      <Link to={sub.link}>{sub.title}</Link>
                    </SubNavList>
                  ))}
                </SubNavBox>
              </GnbList>
            );
          })}
        </GnbContainer>
        <LoginBox>
          <LoginButton>
            <Link to={idOrEmail ? '#' : '/login'}>
              {idOrEmail ? idOrEmail : '로그인 및 회원가입'}
            </Link>
          </LoginButton>
          {idOrEmail && (
            <SubNavBox>
              <SubNavList>
                <Link onClick={logOut}>설정 (로그아웃)</Link>
              </SubNavList>
            </SubNavBox>
          )}
        </LoginBox>
        <QuestionBox>
          <QuestionTitle>
            위코더 먹방 가입
            <br />및 광고문의
          </QuestionTitle>
        </QuestionBox>
      </InnerTop>
      {pathname !== '/favorite' && pathname !== '/register' && (
        <TabBox>
          {subTab.map((list, subtabIndex) => (
            <TabList
              key={subtabIndex}
              active={subtabIndex + 1 === tabIndex}
              onClick={e => {
                handleTab(e, subtabIndex + 1);
              }}
            >
              <Link to={list.link}>{list.title}</Link>
            </TabList>
          ))}
        </TabBox>
      )}
    </HeaderBox>
  );
};
export default withRouter(Header);
const menuData = [
  {
    title: '카페/베이커리',
    detail: '휴게음식점',
    sub: [
      { title: '맛집찾기', link: '/' },
      { title: '찜한맛집', link: '/favorite' },
      { title: '맛집내놓기', link: '/register' },
    ],
  },
  {
    title: '한식/중식/일식',
    detail: '일반음식',
    sub: [
      { title: '맛집찾기', link: '/' },
      { title: '찜한맛집', link: '/favorite' },
      { title: '맛집내놓기', link: '/register' },
    ],
  },
  {
    title: '퓨전',
    detail: '일반음식',
    sub: [
      { title: '맛집찾기', link: '/' },
      { title: '찜한맛집', link: '/favorite' },
      { title: '맛집내놓기', link: '/register' },
    ],
  },
  {
    title: '양식',
    detail: '일반음식',
    sub: [
      { title: '맛집찾기', link: '/' },
      { title: '찜한맛집', link: '/favorite' },
      { title: '맛집내놓기', link: '/register' },
    ],
  },
  {
    title: '기타주점',
    detail: '주류점',
    sub: [
      { title: '맛집찾기', link: '/' },
      { title: '찜한맛집', link: '/favorite' },
      { title: '맛집내놓기', link: '/register' },
    ],
  },
];
const subTab = [
  { title: '맛집 찾기', link: '/' },
  { title: '찜한 맛집', link: '/favorite' },
  { title: '맛집 내놓기', link: '/register' },
];
const HeaderBox = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  max-height: 130px;
  background: #fff;
  z-index: 10;
`;
const InnerTop = styled.div`
  display: flex;
  border-bottom: 1px solid #e1e1e1;
  height: 80px;
`;
const LogoWrap = styled.div`
  padding: 15px 8px 14px 20px;
  margin-right: 10px;
`;
const LogoImage = styled.img`
  width: 112px;
  height: 50px;
`;
const GnbContainer = styled.ul`
  display: flex;
  color: #222;
`;
const NavTitle = styled.h2`
  font-size: 17px;
  font-weight: 700;
`;
const NavDetail = styled.span`
  font-size: 12px;
`;
const SubNavBox = styled.ul`
  position: absolute;
  top: 0;
  left: 0;
  min-width: 179px;
  padding: 8px 0;
  margin-top: 80px;
  background: #fff;
  border: 1px solid #eee;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.3);
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s;
  z-index: 3;
`;
const GnbList = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  position: relative;
  height: 80px;
  padding: 19px 15px 17px;
  margin-right: 15px;
  cursor: pointer;
  &:hover {
    ${NavTitle},${NavDetail} {
      color: #fa880b;
    }
    ${SubNavBox} {
      visibility: visible;
      opacity: 1;
    }
  }
`;
const SubNavList = styled.li`
  a {
    display: block;
    padding: 9px 15px;
    color: #000;
    font-size: 13px;
    white-space: nowrap;
    &:hover {
      background: #f6f6f6;
    }
  }
`;
const LoginBox = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin-left: auto;
  ${SubNavBox} {
    margin-top: 55px;
  }
  &:hover {
    ${SubNavBox} {
      visibility: visible;
      opacity: 1;
    }
  }
`;
const LoginButton = styled.button`
  display: block;
  padding: 0;
  background: #eeeeee;
  border-radius: 4px;
  border: 1px solid #e1e1e1;
  font-size: 12px;
  cursor: pointer;
  :hover {
    background: rgba(0, 0, 0, 0.1);
  }
  a {
    display: block;
    color: #222;
    padding: 5px 8px 5px;
  }
`;
const QuestionBox = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  width: 160px;
  padding: 21px 21px 20px 13px;
  margin-left: 15px;
  cursor: pointer;
  :hover {
    background: #eee;
    h2 {
      &::after {
        border-top: 8px solid #eee;
      }
    }
  }
`;
const QuestionTitle = styled.h2`
  font-weight: 700;
  color: #2c60a3;
  line-height: 20px;
  text-align: right;
  &::after,
  &::before {
    content: '';
    position: absolute;
    display: block;
    border-top: 8px solid #2c60a3;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    top: 50%;
    right: 18px;
    transform: translateY(-50%) rotate(-90deg);
  }
  &::after {
    border-top: 8px solid #fff;
    right: 21px;
    z-index: 2;
  }
`;
const TabBox = styled.ul`
  display: flex;
  align-items: center;
  padding-left: 40px;
  border-bottom: 1px solid #e1e1e1;
`;
const TabList = styled.li`
  a {
    position: relative;
    display: inline-block;
    padding: 17px 20px;
    font-weight: ${props => (props.active ? '700' : '400')};
    color: ${props => (props.active ? '#444' : '#A6A6A6')};
    font-size: 15px;
    &::after {
      content: '';
      display: ${props => (props.active ? 'block' : 'none')};
      position: absolute;
      width: 100%;
      height: 2px;
      background: #444;
      left: 0;
      bottom: 0;
    }
  }
  &:hover {
    a {
      color: #000;
    }
  }
`;
