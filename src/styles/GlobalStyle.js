import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const GlobalStyle = createGlobalStyle`
  ${reset}
  * {
    box-sizing: border-box;
  }
  body{
    background-color: #ffffff;
    font-family: 'Roboto', sans-serif;
    color: #222222;
  }
  a {
    color: inherit;
    text-decoration: none;
  }
  input, button {
    background-color: transparent;
    border: none;
    outline: none;
  }
  ol, ul, li {
    list-style: none;
  }
  img {
    display: block;
    width: 100%;
    height: 100%;
  }
`;

export default GlobalStyle;
