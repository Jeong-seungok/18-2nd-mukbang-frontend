import styled from 'styled-components';

const StoreInfo = props => {
  const STOREINFO = [
    { title: '주소', content: `${props.address}` },
    { title: '전화번호', content: `${props.phone_number}` },
    { title: '이용시간', content: `${props.opening_time}` },
    { title: '주차', content: `${props.parking > 0 ? '가능' : '불가능'}` },
    {
      title: '예약',
      content: `${props.reservation > 0 ? '가능' : '불가능'}`,
    },
    { title: '와이파이', content: `${props.wifi > 0 ? '가능' : '불가능'}` },
    {
      title: 'SNS 주소',
      content: `${props.sns_url}`,
    },
  ];

  return (
    <ul>
      {STOREINFO.map((data, idx) => (
        <List key={idx}>
          <span>{data.title}</span>
          <span>{data.content}</span>
        </List>
      ))}
    </ul>
  );
};

export default StoreInfo;

const List = styled.li`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 6px 0px;
  border-bottom: 1px solid rgb(238, 238, 238);
  color: #757575;
  line-height: 20px;
`;
