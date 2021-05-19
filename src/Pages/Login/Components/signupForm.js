import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import FormLayout from './common/formlayout';
import LogoBox from './common/logoBox';

function SignUpForm(props) {
  const defaultMinute = 5;
  const defaultSeconds = 0;
  const [request, setRequest] = useState(false);
  const [minute, setMinute] = useState(defaultMinute);
  const [seconds, setSeconds] = useState(defaultSeconds);

  const defaultTime = () => {
    setRequest(false);
    setMinute(5);
    setSeconds(0);
  };

  useEffect(() => {
    if (request) {
      const countDown = setInterval(() => {
        if (parseInt(seconds) > 0) {
          setSeconds(parseInt(seconds) - 1);
        }
        if (parseInt(seconds) === 0) {
          if (parseInt(minute) === 0) {
            clearInterval(countDown);
            defaultTime();
          } else {
            setMinute(minute - 1);
            setSeconds(59);
          }
        }
      }, 1000);
      return () => clearInterval(countDown);
    }
  }, [request, minute, seconds]);

  const smsrequest = () => {
    setRequest(true);
  };

  const smscheck = () => {
    alert('인증이 완료되었습니다.');
    defaultTime();
  };

  const smscoderequestplus = () => {
    props.smscoderequest();
    smsrequest();
  };

  const smscodecheckplus = () => {
    props.smscodecheck();
    smscheck();
  };

  const matchFunction = {
    text1: smscoderequestplus,
    text2: smscodecheckplus,
    password: props.visiblepassword,
  };

  return (
    <FormLayout>
      <LogoBox data={props.data} />
      <InputBox inputbottom>
        {props.data.inputData.map((list, index) => (
          <BoxBox>
            <BoxBoxBox
              key={index}
              placeholder={list.text}
              type={list.type}
              onChange={props.onChange}
            ></BoxBoxBox>
            {list.type === 'text1' && request && (
              <TimerBox>
                {minute}:{seconds < 10 ? `0${seconds}` : seconds}
              </TimerBox>
            )}
            {list.display && (
              <Display onClick={matchFunction[list.type]}>
                {list.display}
              </Display>
            )}
          </BoxBox>
        ))}
      </InputBox>
      <ClickButton onClick={props.signUpOk}>
        <Content>{props.data.text}</Content>
      </ClickButton>
    </FormLayout>
  );
}

export default SignUpForm;

const InputBox = styled.div`
  margin-bottom: 29px;
`;

const BoxBox = styled.div`
  display: flex;
  justify-content: center;
  border: 1px solid rgb(225, 225, 225);
  margin-bottom: 10px;
`;

const BoxBoxBox = styled.input`
  width: 100%;
  padding: 0px 13px;
  height: 43px;

  &::placeholder {
    color: #a6a6a6;
  }
`;

const Display = styled.div`
  display: flex;
  align-items: center;
  font-size: 13px;
  width: 50px;
  color: rgb(117, 117, 117);
  cursor: pointer;
`;

const ClickButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  background-color: rgb(250, 149, 11);
  margin-bottom: 10px;
  cursor: pointer;
`;

const Content = styled.div`
  font-weight: bold;
  text-align: center;
  color: rgb(255, 255, 255);
  font-size: 16px;
`;

const TimerBox = styled.div`
  display: flex;
  align-items: center;
  font-size: 12px;
  padding-right: 10px;
  color: red;
`;
