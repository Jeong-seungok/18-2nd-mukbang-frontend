import React, { useState } from 'react';
import EmailForm from './Components/emailForm';
import { useHistory } from 'react-router-dom';
import Page from './Components/common/common';
import { URL } from '../../config';

function Email() {
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });

  const onChange = e => {
    const { value, type } = e.target;
    setInputs({
      ...inputs,
      [type]: value,
    });
  };

  let history = useHistory();

  const signupPage = e => {
    const type = e.target.getAttribute('type');
    if (type === 'signup') {
      history.push('/signup/email');
    }
  };

  const goToMain = () => {
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
          history.push('/');
        }
      });
  };

  return (
    <Page>
      <EmailForm
        data={signIn}
        signupPage={signupPage}
        onChange={onChange}
        goToMain={goToMain}
      />
    </Page>
  );
}

export default Email;

const signIn = {
  type: 'signIn',
  image: true,
  title1: '간편하게 로그인하고',
  title2: '다양한 서비스를 이용하세요.',
  inputData: [
    {
      type: 'email',
      text: '이메일주소',
    },
    {
      type: 'password',
      text: '비밀번호',
      display: '표시',
    },
  ],
  idpwsignup: [
    {
      type: 'id',
      text: '아이디 찾기',
    },
    {
      type: 'pw',
      text: '비밀번호 찾기',
    },
    {
      type: 'signup',
      text: '회원가입',
    },
  ],
  text: '시작하기',
};
