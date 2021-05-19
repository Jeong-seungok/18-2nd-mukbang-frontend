import styled, { css } from 'styled-components';

export const DetailBox = styled.div`
  padding: 10px 20px;
  border-bottom: 1px solid #d8d8d8;
`;

export const InfoBox = styled.ul`
  font-size: 12px;
  line-height: 20px;
  color: #666;

  &::before {
    content: '';
    display: block;
    position: absolute;
    left: 0;
    top: 50%;
    width: 2px;
    height: 2px;
    border-radius: 2px;
    background: #666;
  }
`;

export const InfoList = styled.li`
  position: relative;
  padding-left: 8px;

  color: ${props => (props.redColor ? 'red' : '#333')};

  &::before {
    content: '';
    display: block;
    position: absolute;
    left: 0;
    top: 50%;
    width: 2px;
    height: 2px;
    border-radius: 2px;
    background: #666;
    transform: translateY(-50%);
  }
`;

export const Warning = styled.p`
  color: red;
`;

export const FormTable = styled.table`
  width: 100%;
  border-top: 2px solid #333;
  border-bottom: 1px solid #999;
  color: #333;
  font-size: 13px;
`;
export const FormTableRow = styled.tr`
  border-bottom: 1px dotted #bbbbbb;
  &:last-child {
    border-bottom: none;
  }
`;
export const FormTalbeBodyTitle = styled.td`
  width: 97px;
  font-weight: 700;
  text-align: center;
  background: #f8f5f4;
`;
export const FormTableBodyWrite = styled.td`
  display: flex;
  align-items: center;
  padding: 7px 10px;
`;
export const FormSelect = styled.select`
  border: 1px solid #a6a6a6;
  font-size: 13px;
`;
export const FormOption = styled.option``;
export const FormInput = styled.input`
  padding: 0;
  background: #fff;
  ${props => {
    const { type } = props;
    if (type === 'text') {
      return css`
        width: ${props => (props.wide ? '100%' : '180px;')};
        height: 22px;
        padding-left: 5px;
        border: 1px solid #a6a6a6;
      `;
    } else if (type === 'radio') {
      return css`
        margin: 0 5px 0 0;
      `;
    }
  }}
  &.address {
    width: 200px;
  }
  &.subway {
    width: 77px;
  }
  &.w50 {
    width: 50%;
  }
  &.w100 {
    width: 100%;
  }
`;
export const FormSpan = styled.span`
  color: #333;
  &.mlr5 {
    margin: 0 5px;
  }
`;
export const FormButton = styled.button`
  padding: 0;
  border: none;
  font-weight: 700;
  background: #333;
  color: #fff;
  text-align: center;
  cursor: pointer;

  &.normal {
    height: 22px;
    padding: 0 10px;
    border: 1px solid #666666;
    font-weight: 400;
    font-size: 9px;
  }

  &.imageBtn {
    position: absolute;
    top: -5px;
    right: -5px;
    width: 20px;
    height: 20px;
    background: ${props => (props.checkValidation ? '#fda500' : '#333')};
    border-radius: 50%;
    font-size: 9px;
    line-height: 20px;
  }

  &.menuBtn {
    width: 100px;
    height: 81px;
    font-size: 14px;
  }

  &.submitBtn {
    width: 260px;
    height: 46px;
    border-radius: 8px;
    background: #f08116;
    font-size: 23px;
    font-weight: 400;
  }

  &.atrm5 {
    position: absolute;
    top: -5px;
    right: -5px;
  }

  &.ml5 {
    margin-left: 5px;
  }

  &.active {
    background: #fda500;
  }

  svg {
    pointer-events: none;
  }
`;

export const RadioLabel = styled.label`
  display: inline-flex;
  align-items: center;
  &:first-child {
    margin-right: 8px;
  }
`;

export const RegistImageBox = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  margin-top: 15px;
  &.menu {
    margin: 0;
    padding: ${props => (props.list === 0 ? 0 : '15px 0px')};
    background: #f6f6f6;
  }
`;

export const ImageBoxList = styled.li`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  height: 81px;
  background: #f8f5f4;
  border: 1px solid #dddddd;
  ${props =>
    props.menu &&
    css`
      width: 142px;
      border-top: none;
      border-bottom: none;
    `};

  &::before {
    content: '';
    display: block;
    position: absolute;
    top: -4px;
    left: -18px;
    border-top: 27px solid #eeebea;
    border-left: 27px solid transparent;
    border-right: 27px solid transparent;
    transform: rotate(135deg);
  }
`;

export const ImageNumber = styled.span`
  position: absolute;
  top: 5px;
  left: 10px;
  font-size: 12px;
  color: #999;
`;

export const ImageTitle = styled.h3`
  margin-bottom: 5px;
  font-size: 12px;
  color: #333;
`;

export const RegisterMenuBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: ${props => (props.list ? 'none' : '1px solid #d8d8d8')};
`;

export const MenuDetailBox = styled.ul`
  flex: 1;
  padding-left: 20px;
`;

export const MenuDetailList = styled.li`
  margin-bottom: 5px;
  &:last-child {
    margin: 0;
  }
`;

export const MenuDetailSpan = styled.span`
  &.ml5 {
    margin-left: 5px;
  }
  &.mr5 {
    margin-right: 5px;
  }
`;

export const FormBottomBox = styled.div`
  text-align: center;
  padding: 30px 0;
  margin-top: 50px;
`;
