import React from 'react';
import {
  FormTable,
  FormTableRow,
  FormTalbeBodyTitle,
  FormTableBodyWrite,
  FormSelect,
  FormOption,
  FormInput,
  RadioLabel,
} from '../StyleData/StyleData';

const StoreDetail = ({ handleStoreInput }) => {
  return (
    <FormTable>
      {formList.map((list, index) => {
        const optionList = index === 0 ? cateogryList : status;
        const wideInput = index === 3 || index === 6;
        const checkList = ['가능', '불가능'];
        return (
          <FormTableRow>
            <FormTalbeBodyTitle>{list.title}</FormTalbeBodyTitle>
            <FormTableBodyWrite>
              {index <= 1 ? (
                <FormSelect name={list.name} onChange={handleStoreInput}>
                  {optionList.map((option, index) => (
                    <FormOption key={index} value={option}>
                      {option}
                    </FormOption>
                  ))}
                </FormSelect>
              ) : index <= 6 ? (
                <FormInput
                  type="text"
                  name={list.name}
                  wide={wideInput}
                  onChange={handleStoreInput}
                />
              ) : (
                <>
                  {checkList.map((check, index) => (
                    <RadioLabel key={index}>
                      <FormInput
                        type="radio"
                        name={list.name}
                        value={index}
                        onChange={handleStoreInput}
                      />
                      {check}
                    </RadioLabel>
                  ))}
                </>
              )}
            </FormTableBodyWrite>
          </FormTableRow>
        );
      })}
    </FormTable>
  );
};

const formList = [
  { title: '업종', name: 'category' },
  { title: '가게 상태', name: 'status' },
  { title: '가게 이름', name: 'storeName' },
  { title: '한줄 소개', name: 'introduce' },
  { title: '영업 시간', name: 'workTime' },
  { title: '휴대폰 번호', name: 'phone' },
  { title: 'SNS 주소', name: 'SNS' },
  { title: '예약', name: 'reserve' },
  { title: '주차', name: 'park' },
  { title: 'WIFI', name: 'wifi' },
];

const cateogryList = [
  '선택하세요',
  '베이커리',
  '카페',
  '패스트푸드',
  '분식',
  '치킨',
  '한식',
  '일식',
  '중식',
  '퓨전',
  '양식',
  '주점',
];

const status = ['선택하세요', '오픈중', '브레이크타임', '영업종료'];

export default StoreDetail;
