import React from 'react';
import styled from 'styled-components';

const Products = ({
  brand,
  name,
  korean_name,
  price,
  thumbnail_url,
  handleDetail,
  id,
}) => {
  return (
    <div>
      <div>
        <Img
          onClick={() => {
            handleDetail(id);
          }}
          src={thumbnail_url}
          alt="상품"
        />
      </div>
      <ItemInfo>
        <Brand>{brand}</Brand>
        <Name>{name}</Name>
        <KoreanName>{korean_name}</KoreanName>
        <RetailPrice>{price.toLocaleString()}원</RetailPrice>
      </ItemInfo>
    </div>
  );
};

export default Products;
const Img = styled.img`
  width: 230px;
  height: 230px;
  border-radius: 10px;
  cursor: pointer;
`;

const ItemInfo = styled.div`
  margin-top: 11px;
  margin-bottom: 3.2rem;
  word-break: break-all;
`;

const Brand = styled.p`
  color: #333;
  font-size: 14px;
  font-weight: 700;
`;

const Name = styled.p`
  color: #333;
  margin-top: 2px;
  font-size: 13px;
`;

const KoreanName = styled.p`
  margin-top: 2px;
  color: #b7b7b7;
  font-size: 12px;
`;

const RetailPrice = styled.p`
  margin-top: 6px;
  font-size: 14px;
  font-weight: 700;
`;
