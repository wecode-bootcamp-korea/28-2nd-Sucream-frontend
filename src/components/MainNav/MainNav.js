import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const MainNav = () => {
  const [clickedBtn, setClickedBtn] = useState('');
  return (
    <Header>
      <Logo>
        <Link to="/">
          <LogoText>Sucream</LogoText>
        </Link>
      </Logo>
      <div>
        <ul>
          <NavList
            isClick={clickedBtn === 'Style'}
            onClick={() => {
              setClickedBtn('Style');
            }}
          >
            Style
          </NavList>
          <Link to="/">
            <NavList
              isClick={clickedBtn === 'Shop'}
              onClick={() => {
                setClickedBtn('Shop');
              }}
            >
              Shop
            </NavList>
          </Link>
          <NavList
            isClick={clickedBtn === 'About'}
            onClick={() => {
              setClickedBtn('About');
            }}
          >
            About
          </NavList>
        </ul>
      </div>
    </Header>
  );
};
const Header = styled.div`
  display: flex;
  width: 100%;
  height: 80px;
  margin: 0 auto;
  text-align: center;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled.span`
  margin-left: 50px;
`;

const LogoText = styled.h1`
  display: flex;
  width: 100%;
  margin: 0 auto;
  padding: 5.5px 12px 0 5px;
  color: #ffffff;
  background-color: #ee2c29;
  font-size: 3em;
  font-weight: 900;
  font-style: italic;
  align-items: center;
`;

const NavList = styled.li`
  display: inline-block;
  margin: 0 50px;
  font-size: 20px;
  /* text-decoration: underline; */
  text-decoration: ${props => (props.isClick ? 'underline' : '')};

  text-underline-position: under;
  cursor: pointer;
`;
