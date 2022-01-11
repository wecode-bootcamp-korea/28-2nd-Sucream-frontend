import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import qs from 'qs';
import {
  restApiKey,
  redirectUrl,
  clientSecret,
  kakaoAuthUrl,
} from '../../config';

const Login = () => {
  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');
  const navigate = useNavigate();

  const body = qs.stringify({
    grant_type: 'authorization_code',
    client_id: restApiKey,
    redirect_uri: redirectUrl,
    code: code,
    client_secret: clientSecret,
  });

  const getToken = async () => {
    try {
      await fetch('https://kauth.kakao.com/oauth/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        },
        body,
      })
        .then(res => res.json())
        .then(data => {
          localStorage.setItem('kakao_token', data.access_token);
          sendToken();
          // sendToken(data.access_token);
        });
    } catch (err) {
      console.error(err);
    }
  };

  const sendToken = async () => {
    try {
      await fetch('http://10.58.5.73:8000/users/login', {
        method: 'GET',
        headers: { Authorization: localStorage.getItem('kakao_token') },
      })
        .then(res => res.json())
        .then(data => {
          localStorage.setItem('access_token', data.access_token);
          navigate('/');
        });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    code && getToken();
  }, [code]);

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
            <a href={kakaoAuthUrl}>
              <img
                alt="kakao_login_button"
                src="https://developers.kakao.com/tool/resource/static/img/button/login/full/ko/kakao_login_large_wide.png"
              />
            </a>
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
