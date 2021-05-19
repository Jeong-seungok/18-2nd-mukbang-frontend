import React from 'react';
import LoginInForm from './Components/loginForm';
import { useHistory } from 'react-router-dom';
import Page from './Components/common/common';
import { URL } from '../../config';

function Login(props) {
  let history = useHistory();

  const emailLogin = () => {
    history.push('/login/email');
  };

  const kakaoLogin = () => {
    const { Kakao } = window;

    Kakao.Auth.login({
      success: function (res) {
        const params = res.access_token;

        fetch(`${URL}/user/login/kakao?access_token=${params}`)
          .then(res => res.json())
          .then(data => {
            if (data.token) {
              localStorage.setItem('jwt-token', data.token);
              localStorage.setItem('name', data.nickname);
              history.push('/home');
            } else {
              alert('다시 입력해주세요.');
            }
          });
      },
      fail: function (err) {
        alert('로그인 실패했습니다.');
      },
    });
  };

  return (
    <Page>
      <LoginInForm
        data={signInKaKao}
        emailLogin={emailLogin}
        kakaologin={kakaoLogin}
      />
    </Page>
  );
}

export default Login;

const signInKaKao = {
  type: 'signInkakao',
  image: true,
  title1: '간편하게 로그인하고',
  title2: '다양한 서비스를 이용하세요.',
  text: '카카오톡으로 시작하기',
  another: '다른 방법으로 시작하기',
  anotherimage: [
    '//s.zigbang.com/zigbang-account/prod/_next/static/btn_content_login_fb_36x36-df6b07d3564954ead2a9ed323aa2b8ca.png',
    '//s.zigbang.com/zigbang-account/prod/_next/static/btn_content_login_google_36x36-cd1a611ed48bc787e3acc89a8e876800.png',
    '//s.zigbang.com/zigbang-account/prod/_next/static/btn_content_login_email_36x36-e87aa45322ef0190edc5473519396308.png',
  ],
};
