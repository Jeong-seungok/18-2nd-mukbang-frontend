import React, { useState } from 'react';
import SignUpFrom from './Components/signupForm';
import { useHistory } from 'react-router-dom';
import Page from './Components/common/common';
import { URL } from '../../config';

function SignUp() {
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
    repassword: '',
    text: '',
  });

  const onChange = e => {
    const { value, type } = e.target;
    setInputs({
      ...inputs,
      [type]: value,
    });
  };

  let history = useHistory();

  const smscoderequest = () => {
    fetch(`${URL}/user/smscoderequest`, {
      method: 'POST',
      body: JSON.stringify({
        auth_phone: inputs.text,
      }),
    })
      .then(res => res.json())
      .then(result => {
        console.log(result);
        if (result.hased_random_code)
          localStorage.setItem('smscode', result.hased_random_code);
      });
  };

  const code = localStorage.getItem('smscode');

  const smscodecheck = () => {
    fetch(`${URL}/user/smscodecheck`, {
      method: 'POST',
      body: JSON.stringify({
        auth_code: inputs.text,
        hased_random_code: code,
      }),
    })
      .then(res => res.json())
      .then(result => {
        console.log(result);
        if (result.auth_token) {
          localStorage.setItem('jwt_token', result.auth_token);
        }
      });
  };

  const visiblePasswordInput = e => {
    const inputSelector = e.target.parentElement.querySelector('input');
    const displayDiv = e.target;
    if (inputSelector.getAttribute('type') === 'password') {
      inputSelector.setAttribute('type', 'text');
      displayDiv.innerText = '숨김';
    } else {
      inputSelector.setAttribute('type', 'password');
      displayDiv.innerText = '표시';
    }
  };

  const jwt_token = localStorage.getItem('jwt_token');

  const signUpOk = () => {
    fetch(`${URL}/user/signup`, {
      method: 'POST',
      body: JSON.stringify({
        email: inputs.email,
        password: inputs.password,
        auth_token: jwt_token,
      }),
    }).then(() => {
      fetch(`${URL}/user/signin`, {
        method: 'POST',
        body: JSON.stringify({
          email: inputs.email,
          password: inputs.password,
        }),
      })
        .then(res => res.json())
        .then(result => {
          console.log(result);
          if (result.message === 'SUCCESS_SIGNIN') {
            localStorage.setItem('jwt-token', result.token);
            localStorage.setItem('email', inputs.email);
            history.push('/home');
          }
        });
    });
  };

  return (
    <Page>
      <SignUpFrom
        data={signUp}
        onChange={onChange}
        smscoderequest={smscoderequest}
        smscodecheck={smscodecheck}
        visiblepassword={visiblePasswordInput}
        signUpOk={signUpOk}
      />
    </Page>
  );
}

export default SignUp;

const signUp = {
  type: 'signUp',
  image: false,
  title1: '간편하게 로그인하고',
  title2: '다양한 서비스를 이용하세요.',
  inputData: [
    {
      type: 'email',
      text: '이메일 주소',
    },
    {
      type: 'password',
      text: '영문,숫자 포함 8자 이상',
      display: '표시',
    },
    {
      type: 'password',
      text: '비밀번호 재입력',
      display: '표시',
    },
    {
      type: 'text1',
      text: '문자 인증',
      display: '요청',
    },
    {
      type: 'text2',
      text: '코드 번호',
      display: '인증',
    },
  ],
  text: '완료',
};
