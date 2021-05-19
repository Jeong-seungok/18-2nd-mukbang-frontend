import React from 'react';
import styled from 'styled-components';
import './Login.scss';

const Login = () => {
  const KakaoLogin = () => {
    const { Kakao } = window;
    Kakao.Auth.login({
      success: function (res) {
        const params = res.access_token;
        console.log(params);
        fetch(`http://10.58.2.56:8000/user/login/kakao?access_token=${params}`)
          .then(res => res.json())
          .then(data => {
            if (data.token) {
              localStorage.setItem('Login-token', data.token);
            }
          });
      },
    });
  };

  return (
    <LoginPage>
      <LoginBox>
        <LoginSesction>
          <Logo>
            <TitleLogo>
              <Title>먹방</Title>
            </TitleLogo>
            <LoginMessageA>간편하게 로그인 하고</LoginMessageA>
            <LoginMessageB>다양한 서비스를 이용하세요.</LoginMessageB>
          </Logo>
          <Button>
            <KakoaImg>
              <img
                src="https://new-version.download/wp-content/uploads/%EC%B9%B4%EC%B9%B4%EC%98%A4%ED%86%A1-PC%EB%B2%84%EC%A0%84.png"
                alt="카카오 이미지"
              />
            </KakoaImg>
            <Kakao onClick={KakaoLogin}>카카오톡으로 시작</Kakao>
          </Button>
          <Another>
            <AnotherText>다른 방법으로 시작하기</AnotherText>
            <SNSImg>
              <img
                className="one"
                src="//s.zigbang.com/zigbang-account/prod/_next/static/btn_content_login_fb_36x36-df6b07d3564954ead2a9ed323aa2b8ca.png"
                alt="페이스북으로 로그인"
              />
              <img
                className="two"
                src="//s.zigbang.com/zigbang-account/prod/_next/static/btn_content_login_google_36x36-cd1a611ed48bc787e3acc89a8e876800.png"
                alt="구글로 로그인"
              />
              <img
                className="three"
                src="//s.zigbang.com/zigbang-account/prod/_next/static/btn_content_login_email_36x36-e87aa45322ef0190edc5473519396308.png"
                alt="먹방으로 로그인"
              />
            </SNSImg>
          </Another>
        </LoginSesction>
      </LoginBox>
    </LoginPage>
  );
};

export default Login;

const LoginPage = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginBox = styled.div`
  width: 380px;
  height: 488px;
`;

const LoginSesction = styled.section`
  padding: 30px 23px 0px;
  border: 1px solid rgb(225, 225, 225);
  border-radius: 6px;
`;

const Logo = styled.div`
  margin-top: 45px;
  margin-bottom: 30px;
`;
const TitleLogo = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const Title = styled.div`
  font-size: 28px;
`;
const LoginMessageA = styled.div`
  display: flex;
  justify-content: center;
  font-size: 22px;
  color: rgb(34, 34, 34);
`;
const LoginMessageB = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
  font-size: 22px;
  font-weight: bold;
`;

const Button = styled.div`
  display: flex;
  position: relative;
  margin-bottom: 130px;
  background-color: rgb(254, 229, 0);
  border-radius: 25px;
  height: 45px;
  cursor: pointer;
`;

const KakoaImg = styled.div`
  display: flex;
  align-items: center;
  img {
    position: absolute;
    left: 85px;
    height: 30px;
  }
`;

const Kakao = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 120px;
  font-size: 16px;
`;

const Another = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
`;

const AnotherText = styled.div`
  font-size: 12px;
  color: rgba(166, 166, 166, 1);
`;

const SNSImg = styled.div`
  margin-top: 15px;

  .one {
    width: 36px;
    height: 36px;
    cursor: pointer;
  }
  .two {
    width: 36px;
    height: 36px;
    margin-left: 20px;
    cursor: pointer;
  }
  .three {
    width: 36px;
    height: 36px;
    margin-left: 20px;
    cursor: pointer;
  }
`;
