import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Nav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [token, setToken] = useState(localStorage.getItem('access_token'));
  const [points, setPoints] = useState('');

  useEffect(() => {
    setToken(localStorage.getItem('access_token'));
  }, [location.pathname]);

  const logoutToken = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('kakao_token');
    setToken('');
  };

  useEffect(() => {
    token &&
      fetch('http://10.58.5.73:8000/users/point', {
        method: 'GET',
        headers: { Authorization: token },
      })
        .then(res => res.json())
        .then(result => {
          setPoints(result.result);
        });
  }, [token]);

  return (
    <NavUl>
      <NavLi>{token && '포인트: ' + points}</NavLi>
      <NavLi>고객센터</NavLi>
      <NavLi>관심상품</NavLi>
      <NavLi>마이페이지</NavLi>
      <NavLi onClick={token ? logoutToken : () => navigate('/login')}>
        {token ? '로그아웃' : '로그인'}
      </NavLi>
    </NavUl>
  );
};

export default Nav;

const NavUl = styled.ul`
  display: flex;
  position: fixed;
  align-items: center;
  justify-content: flex-end;
  height: 40px;
  width: 100%;
  margin-bottom: 20px;
  border-bottom: 1px solid ${props => props.theme.text};
  color: ${props => props.theme.text};
  background-color: white;
  font-size: 15px;
`;

const NavLi = styled.li`
  margin: 10px;
  float: left;
  :hover {
    cursor: pointer;
  }
  :last-child {
    margin-right: 20px;
  }
`;
