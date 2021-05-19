import React from 'react';
import {
  FormTable,
  FormTableRow,
  FormTalbeBodyTitle,
  FormTableBodyWrite,
  FormInput,
  FormButton,
  FormSpan,
} from '../StyleData/StyleData';
import styled from 'styled-components';

const RegisterAddress = ({
  address,
  storeInput,
  subwayData,
  handleDaumPost,
  handleStoreInput,
  handleSubwayList,
  removeSubwayList,
}) => {
  return (
    <>
      <FormTable>
        <FormTableRow>
          <FormTalbeBodyTitle>주소</FormTalbeBodyTitle>
          <FormTableBodyWrite>
            <FormInput
              className="text address"
              type="text"
              value={address.length !== 0 ? address : null}
              disabled
              placeholder="우편번호 찾기를 통해 등록해주세요."
            />
            <FormButton className="normal ml5" onClick={handleDaumPost}>
              우편번호 찾기
            </FormButton>
          </FormTableBodyWrite>
        </FormTableRow>
        <FormTableRow>
          <FormTalbeBodyTitle>주변역</FormTalbeBodyTitle>
          <FormTableBodyWrite>
            <FormInput
              className="text subway"
              name="station"
              type="text"
              value={storeInput.station}
              onChange={handleStoreInput}
            />
            <FormSpan className="mlr5">(역)</FormSpan>
            <FormInput
              className="text subway"
              name="line"
              type="text"
              value={storeInput.line}
              onChange={handleStoreInput}
            />
            <FormSpan className="mlr5">(호선)</FormSpan>
            <FormButton className="normal" onClick={handleSubwayList}>
              등록하기
            </FormButton>
          </FormTableBodyWrite>
        </FormTableRow>
      </FormTable>
      <SubwayBox list={subwayData.length === 0}>
        {subwayData?.map((subway, index) => (
          <SubwayList
            key={index}
            onClick={() => {
              removeSubwayList(subway.name);
            }}
          >{`${subway.name} ${subway.line}`}</SubwayList>
        ))}
      </SubwayBox>
    </>
  );
};

const SubwayBox = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: ${props => (props.list ? '0px' : '5px 10px')};
  border-bottom: 1px solid #333;
  background: #f6f6f6;
`;
const SubwayList = styled.span`
  font-size: 12px;
  border-radius: 5px;
  color: #fff;
  background: #333;
  padding: 5px 10px;
  margin-right: 5px;
  cursor: pointer;
`;

export default RegisterAddress;
