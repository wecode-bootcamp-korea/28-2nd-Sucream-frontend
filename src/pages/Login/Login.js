import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import qs from 'qs';
import { restApiKey } from '../../config';
import { redirectUrl } from '../../config';
import { clientSecret } from '../../config';
import { kakaoAuthUrl } from '../../config';

const Login = () => {
  let params = new URLSearchParams(document.location.search);
  let code = params.get('code');
  // console.log(code);
  const navigate = useNavigate();

  const [tokenData, setTokenData] = useState('');

  const getToken = async () => {
    try {
      await fetch('https://kauth.kakao.com/oauth/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        },
        body: qs.stringify({
          grant_type: 'authorization_code',
          client_id: restApiKey,
          redirect_uri: redirectUrl,
          code: code,
          client_secret: clientSecret,
        }),
      })
        .then(res => res.json())
        .then(data => setTokenData(data.access_token));
    } catch (err) {
      console.error(err);
    }
  };

  const sendToken = async () => {
    try {
      await fetch('http://10.58.7.139:8000/users/login', {
        method: 'GET',
        headers: { Authorization: tokenData },
      })
        .then(res => res.json())
        .then(data => localStorage.setItem('access_token', data.access_token))
        .then(navigate('/'));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getToken();
    if (tokenData) {
      sendToken();
    }
  });

  return (
    <LoginWrap>
      <LoginTitle>
        <LogoTitle>Sucream</LogoTitle>
        <SubLogo>KICKS RULE EVERYTHING AROUND ME</SubLogo>
      </LoginTitle>

      <LoginForm>
        <LoginInputWrapper>
          <InputTitle>이메일 주소</InputTitle>
          <LoginInput type="email" placeholder="예) sucream@korean.com" />
          <InputTitle>비밀번호</InputTitle>
          <LoginInput type="password" />
        </LoginInputWrapper>

        <LoginBtnSection>
          <LoginBtn>로그인</LoginBtn>
          <LoginKakaoBtn>
            <KakaoLink href={kakaoAuthUrl}>
              <KakaoBtnImg src="https://developers.kakao.com/tool/resource/static/img/button/login/full/ko/kakao_login_large_wide.png" />
            </KakaoLink>
          </LoginKakaoBtn>
        </LoginBtnSection>
      </LoginForm>
    </LoginWrap>
  );
};

export default Login;

const LoginWrap = styled.section`
  height: 80vh;
  margin: 0 auto;
  padding: 160px;
`;

const LoginTitle = styled.h1`
  margin-bottom: 20px;
  text-align: center;
`;

const LogoTitle = styled.span`
  width: 100%;
  margin: 0 auto;
  padding-top: 5.5px;
  padding-left: 5px;
  padding-right: 12px;
  background-color: #ee2c29;
  font-size: 4em;
  font-weight: 900;
  font-style: italic;
  color: #ffffff;
`;

const SubLogo = styled.p`
  margin-top: 20px;
  font-weight: 600;
  font-size: 12px;
`;

const LoginForm = styled.div`
  width: 400px;
  margin: 0 auto;
`;

const LoginInputWrapper = styled.div`
  margin-top: 50px;
  margin-bottom: 50px;
`;

const InputTitle = styled.h3`
  font-weight: 500;
  margin-top: 20px;
  margin-bottom: 10px;
`;

const LoginInput = styled.input`
  height: 30px;
  width: 400px;
  border-bottom: 1px solid ${props => props.theme.text};
`;

const LoginBtnSection = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

const LoginBtn = styled.button`
  :hover {
    cursor: pointer;
  }
  display: block;
  height: 60px;
  width: 400px;
  margin-bottom: 10px;
  border-radius: 10px;
  background-color: #ebebeb;
  font-size: 20px;
  color: ${props => props.theme.white};
`;

const LoginKakaoBtn = styled.button`
  border-radius: 10px;
  background-color: #f9e100;
  color: ${props => props.theme.black};
  font-weight: 700;
`;

const KakaoLink = styled.a``;

const KakaoBtnImg = styled.img``;
