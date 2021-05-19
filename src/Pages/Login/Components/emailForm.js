import React from 'react';
import styled from 'styled-components';
import FormLayout from './common/formlayout';
import LogoBox from './common/logoBox';

function EmailForm(props) {
  return (
    <FormLayout>
      <LogoBox data={props.data} />
      <InputBox>
        {props.data.inputData.map((list, index) => (
          <DisplayBox>
            <WriteBox
              key={index}
              placeholder={list.text}
              type={list.type}
              onChange={props.onChange}
            />
            {list.display && <Display>{list.display}</Display>}
          </DisplayBox>
        ))}
        <IDPWBOX>
          {props.data.idpwsignup.map((list, index) => (
            <Idpw key={index}>
              <Box onClick={props.signupPage} type={list.type}>
                {list.text}
              </Box>
              {props.data.idpwsignup.length - 1 > index && (
                <IdPwNullBox key={props.data.idpwsignup} />
              )}
            </Idpw>
          ))}
        </IDPWBOX>
      </InputBox>

      <ClickButton onClick={props.goToMain}>
        <Content>{props.data.text}</Content>
      </ClickButton>
    </FormLayout>
  );
}

export default EmailForm;

const InputBox = styled.div`
  margin-bottom: 88px;
`;

const DisplayBox = styled.div`
  display: flex;
  justify-content: center;
  border: 1px solid rgb(225, 225, 225);
  margin-bottom: 10px;
`;

const WriteBox = styled.input`
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
`;

const IDPWBOX = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 10px 12px;
  cursor: pointer;
`;

const Idpw = styled.div`
  display: flex;
`;

const Box = styled.div`
  color: rgb(117, 117, 117);
  font-size: 12px;
`;

const IdPwNullBox = styled.div`
  width: 1px;
  height: 18px;
  background-color: rgb(225, 225, 225);
  margin-left: 20px;
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
