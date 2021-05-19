import React from 'react';
import styled from 'styled-components';
import FormLayout from './common/formlayout';
import LogoBox from './common/logoBox';

function LoginInForm(props) {
  return (
    <FormLayout>
      <LogoBox data={props.data} />
      <ClickButton onClick={props.kakaologin}>
        <img
          src="https://new-version.download/wp-content/uploads/%EC%B9%B4%EC%B9%B4%EC%98%A4%ED%86%A1-PC%EB%B2%84%EC%A0%84.png"
          alt="카카오 사진"
        />
        <Content>{props.data.text}</Content>
      </ClickButton>
      <AnotherImgBox>
        <AnotherBox>{props.data.another}</AnotherBox>
        <BoxBox>
          {props.data.anotherimage.map((list, index) => (
            <BoxBoxBox>
              {index === 2 ? (
                <img
                  onClick={props.emailLogin}
                  key={index}
                  src={list}
                  alt="이미지"
                />
              ) : (
                <img key={index} src={list} alt="이미지" />
              )}
            </BoxBoxBox>
          ))}
        </BoxBox>
      </AnotherImgBox>
    </FormLayout>
  );
}

export default LoginInForm;

const ClickButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  background-color: rgb(254, 229, 0);
  border-radius: 25px;
  text-align: center;
  height: 50px;
  margin-bottom: 170px;
  cursor: pointer;

  img {
    position: absolute;
    height: 30px;
    margin-left: -150px;
  }
`;

const Content = styled.div`
  color: rgba(65, 47, 47, 1);
  font-size: 14px;
  font-weight: bold;
  margin-left: 35px;
`;

const AnotherImgBox = styled.div`
  img {
    width: 36px;
    height: 36px;
    cursor: pointer;
  }
`;

const AnotherBox = styled.div`
  display: flex;
  justify-content: center;
  font-size: 12px;
  color: rgba(166, 166, 166, 1);
  margin-bottom: 6px;
`;

const BoxBox = styled.div`
  display: flex;
  justify-content: center;
`;

const BoxBoxBox = styled.div`
  padding: 10px 10px;
`;
