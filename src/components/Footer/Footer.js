import React from 'react';
import styled from 'styled-components';

const Footer = () => {
  return (
    <FooterWrap>
      <FooterContents>주식회사 Sucream</FooterContents>
      <FooterContents>
        주소: 서울특별시 강남구 테헤란로 427
        <span> | </span>
        공동 대표: 강현구, 양대영, 유호진, 이정석, 진민욱
      </FooterContents>
    </FooterWrap>
  );
};

export default Footer;

const FooterWrap = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  padding: 10px;
  border-top: 1px solid ${props => props.theme.text};
  background-color: white;
  color: ${props => props.theme.text};
  font-weight: 500;
  align-items: center;
  text-align: center;
  justify-content: center;
`;

const FooterContents = styled.p`
  margin: 15px;
`;
