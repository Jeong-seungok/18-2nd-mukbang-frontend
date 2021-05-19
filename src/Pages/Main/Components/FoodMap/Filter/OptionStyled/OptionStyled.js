import styled from 'styled-components';

export const OptionTitleBox = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 15px 10px;
  color: #222;
  height: 46px;
  background: ${props => (props.gray ? '#f6f6f6' : '#fff')};
`;

export const OptionTitle = styled.h2`
  font-size: 14px;
`;
