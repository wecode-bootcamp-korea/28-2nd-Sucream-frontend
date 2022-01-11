import React from 'react';
import styled from 'styled-components';

const BrandItem = ({ title, name, price, img }) => {
  return (
    <li>
      <ItemImgWrap>
        <ItemImg alt={name} src={img} />
      </ItemImgWrap>
      <ItemTitle>{title}</ItemTitle>
      <ItemName>{name}</ItemName>
      <ItemPrice>{`${price.toLocaleString()} 원`}</ItemPrice>
      <ItemText>즉시 구매가</ItemText>
    </li>
  );
};

const ItemImgWrap = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 20px;
  overflow: hidden;
`;

const ItemImg = styled.img`
  border-radius: 20px;
  width: 100%;
  height: 100%;
  transition: 1s;

  &:hover {
    transform: scale(120%);
  }
`;

const ItemTitle = styled.p`
  margin: 15px 0 10px;
  font-size: 19px;
  font-weight: bold;
  text-decoration: underline;
`;

const ItemName = styled.p`
  margin-bottom: 5px;
`;

const ItemPrice = styled.p`
  margin-bottom: 5px;
  font-size: 18px;
  font-weight: bold;
`;

const ItemText = styled.span`
  font-size: 14px;
  color: #aaa;
`;

export default BrandItem;
