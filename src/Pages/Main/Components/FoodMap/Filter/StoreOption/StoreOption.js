import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { OptionTitleBox, OptionTitle } from '../OptionStyled/OptionStyled';
import { GlobalContext } from '../../../../../../GlobalContext';

const StoreOption = ({ selectOption }) => {
  const sectionCounts = sectionTypes.length; // 카테고리 그룹 갯수
  const [sectionToggle, setSectionToggle] = useState(
    Array(sectionCounts).fill(false)
  );
  const [sectionSelfToggle, setSectionSelfToggle] = useState(
    Array(sectionCounts).fill(false)
  );
  const sectionToggleCheck = sectionToggle.filter(Boolean).length;
  const {
    filter: { category },
    filterAction: { checkCategory },
  } = useContext(GlobalContext);

  const toggleSectionList = () => {
    const toggleCondition = sectionToggleCheck === 0 ? true : false;
    setSectionToggle(Array(sectionCounts).fill(toggleCondition));
  };

  const handleSelfToggle = index => {
    setSectionSelfToggle(
      sectionSelfToggle.map((section, idx) =>
        idx === index ? !section : section
      )
    );
  };

  return (
    <StoreOptionBox selectOption={selectOption}>
      <OptionTitleBox gray>
        <OptionTitle>업종 선택하기</OptionTitle>
        <ToggleBox
          className={sectionToggleCheck !== 0 && 'active'}
          onClick={toggleSectionList}
        >
          <ToggleBtn />
        </ToggleBox>
      </OptionTitleBox>
      {sectionToggleCheck !== 0 &&
        sectionTypes.map((section, sectionIndex) => {
          const selectCategory =
            sectionIndex === 0 ? category.first : category.second;
          const selectCount = selectCategory[0]
            ? selectCategory.length
            : selectCategory.filter(Boolean).length;
          return (
            sectionToggle[sectionIndex] && (
              <ToggleSection
                key={sectionIndex}
                sectionIndex={sectionIndex}
                className={sectionSelfToggle[sectionIndex] && ' active'}
              >
                <ToggleContainer>
                  <CategoryBox>
                    <CategoryTitle>
                      {section.title +
                        (selectCount !== 0 ? `(${selectCount})` : '')}
                    </CategoryTitle>
                    <CategoryDetail>{section.detail}</CategoryDetail>
                    <ToggleArrowBtn
                      onClick={() => {
                        handleSelfToggle(sectionIndex);
                      }}
                      className="arrowBtn"
                    />
                  </CategoryBox>
                </ToggleContainer>
                <ToggleContainer className="categoryListWrap">
                  <CategoryListBox>
                    {section.category.map((category, index) => (
                      <CategoryList
                        className={selectCategory[index] && 'active'}
                        key={index}
                        tabIndex={index}
                        onClick={() => {
                          checkCategory(sectionIndex, index + 1);
                        }}
                      >
                        {category}
                      </CategoryList>
                    ))}
                  </CategoryListBox>
                </ToggleContainer>
              </ToggleSection>
            )
          );
        })}
    </StoreOptionBox>
  );
};

const sectionTypes = [
  {
    title: '휴게음식점',
    detail: '빵, 커피, 배달점, 햄버거 등',
    category: ['전체', '베이커리', '카페', '패스트푸드', '분식', '치킨'],
  },

  {
    title: '일반음식/주류점',
    detail: '한중일 양식, 고기집, 해산물, 기타주점 등',
    category: ['전체', '한식', '일식', '중식', '퓨전', '양식', '기타주점'],
  },
];
const StoreOptionBox = styled.div`
  display: ${props => (props.selectOption === 2 ? 'block' : 'none')};
`;

const ToggleBox = styled.div`
  position: relative;
  width: 40px;
  height: 15px;
  background: #bbb;
  border-radius: 20px;
  cursor: pointer;

  &.active {
    background: #f9940b;

    span {
      left: 80%;
      transform: translate(-50%, -50%);
    }
  }
`;

const ToggleBtn = styled.span`
  display: inline-block;
  position: absolute;
  top: 50%;
  left: 0;
  width: 20px;
  height: 20px;
  background: #fff;
  border-radius: 50%;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.3);
  transform: translate(0, -50%);
  transition: all 0.2s;
  pointer-events: none;
`;
const ToggleSection = styled.section`
  margin-top: 10px;
  background: #fff;
  margin-bottom: ${props => (props.sectionIndex === 1 ? '10px' : 0)};
  &.active {
    .categoryListWrap {
      display: none;
    }
    .arrowBtn {
      transform: rotate(180deg);
    }
  }
`;
const ToggleContainer = styled.div`
  border-top: 1px solid #eee;
  position: relative;
  padding: 0 18px;

  &.categoryListWrap {
    height: initial;
    padding: 13px 18px;
  }
`;
const CategoryBox = styled.div`
  padding: 16px 0;
`;
const CategoryTitle = styled.h1`
  font-size: 18px;
`;
const CategoryDetail = styled.h3`
  font-size: 15px;
  margin-top: 5px;
`;
const ToggleArrowBtn = styled.span`
  position: absolute;
  width: 18px;
  height: 10px;
  top: 50%;
  right: 18px;
  transform: translateY(-50%);
  cursor: pointer;
  transition: all 0.2s;

  &::before,
  &::after {
    content: '';
    position: absolute;
    display: block;
    border-right: 9px solid transparent;
    border-left: 9px solid transparent;
    pointer-events: none;
  }
  &::before {
    top: -1px;
    border-bottom: 9px solid #444;
  }
  &::after {
    top: 1px;
    border-bottom: 9px solid #fff;
    z-index: 2;
  }
`;
const CategoryListBox = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-auto-rows: 35px;
  width: 100%;
  border-top: 1px solid #ccc;
  border-left: 1px solid #ccc;
  font-size: 12px;
`;
const CategoryList = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${props => (props.tabIndex === 0 ? '#f6f6f6' : '#fff')};
  border-bottom: 1px solid #ccc;
  cursor: pointer;
  outline: none;
  &:nth-child(2n) {
    border-right: 1px solid #ccc;
  }
  &:nth-child(2n-1) {
    border-right: 1px solid #ccc;
  }
  &.active {
    background: #444;
    color: #fff;
    font-weight: 700;
  }
`;

export default StoreOption;
