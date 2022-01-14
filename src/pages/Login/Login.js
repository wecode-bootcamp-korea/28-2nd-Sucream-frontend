import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
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
    <LoginStyle>
      <div className="LoginWrap">
        <h2 className="loginTitle">
          <span>Sucream</span>
          <p>KICKS RULE EVERYTHING AROUND ME</p>
        </h2>
        <div className="loginForm">
          <div className="hasButton">
            <h3 className="inputTitle">이메일 주소</h3>
            <input type="email" placeholder="예) sucream@korean.com" />
            <h3 className="inputTitle">비밀번호</h3>
            <input type="password" />
          </div>
          <div className="loginBtnSection">
            <button className="loginBtn">로그인</button>
            <button className="loginKakao">
              <a href={kakaoAuthUrl}>
                <img src="https://developers.kakao.com/tool/resource/static/img/button/login/full/ko/kakao_login_large_wide.png" />
              </a>
            </button>
          </div>
        </div>
      </div>
    </LoginStyle>
  );
};

export default Login;

const LoginStyle = styled.div`
  .LoginWrap {
    height: 80vh;
    margin: 0 auto;
    padding: 160px;
  }

  .loginTitle {
    margin-bottom: 20px;
    text-align: center;
    span {
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
    }
    p {
      margin-top: 20px;
      font-weight: 600;
      font-size: 12px;
    }
  }

  .loginForm {
    width: 400px;
    margin: 0 auto;
  }

  .hasButton {
    margin-top: 50px;
    margin-bottom: 50px;
    input {
      height: 30px;
      width: 400px;
      border-bottom: 1px solid ${props => props.theme.text};
    }
    h3 {
      font-weight: 500;
      margin-top: 20px;
      margin-bottom: 10px;
    }
  }

  .loginBtnSection {
    text-align: center;
    margin-bottom: 20px;

    button {
      :hover {
        cursor: pointer;
      }
      display: block;
      height: 60px;
      width: 400px;
    }
    .loginBtn {
      margin-bottom: 10px;
      border-radius: 10px;
      background-color: #ebebeb;
      font-size: 20px;
      color: ${props => props.theme.white};
    }

    .loginKakao {
      border-radius: 10px;
      background-color: #f9e100;
      color: ${props => props.theme.black};
      font-weight: 700;
    }
  }
`;
