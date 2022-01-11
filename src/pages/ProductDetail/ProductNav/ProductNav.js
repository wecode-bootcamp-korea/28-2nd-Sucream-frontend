import React from 'react';
import styled, { keyframes } from 'styled-components';
import Loading from '../../../components/Loading/Loading';
import useProductDetail from '../../../hooks/useProductDetail';
import ProductInterest from '../ProductContent/ProductInterset/ProductInterest';
import ProductTrade from '../ProductContent/ProductTrade/ProductTrade';

const ProductNav = () => {
  const { productData, productError } = useProductDetail();
  const { image_urls, brand, name, korean_name } = productData.result;

  if (productError) return <div>failed to load</div>;
  if (!productData) return <Loading />;

  return (
    <ProductNavContainer>
      <ProductNavi>
        <ProductTextWrap>
          <ProductNavImg alt="nike" src={image_urls[0]} />
          <div>
            <h3>{brand}</h3>
            <p>{name}</p>
            <ProductNavText>{korean_name}</ProductNavText>
          </div>
        </ProductTextWrap>
        <NavBtnWrap>
          <ProductInterest />
          <ProductBtnWrap>
            <ProductTrade />
          </ProductBtnWrap>
        </NavBtnWrap>
      </ProductNavi>
    </ProductNavContainer>
  );
};

const productNavDrop = keyframes`
  from {
    transform: translateY(-15px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const ProductNavContainer = styled.div`
  position: fixed;
  width: 100%;
  height: 100px;
  margin-top: 80px;
  padding: 15px 5%;
  background-color: #fff;
  z-index: 10;
  animation: ${productNavDrop} 0.3s;
`;

const ProductNavi = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ProductTextWrap = styled.div`
  display: flex;
  align-items: center;
`;

const ProductNavImg = styled.img`
  display: inline-block;
  width: 64px;
  height: 64px;
  margin-right: 20px;
  border-radius: 10px;
`;

const ProductNavText = styled.span`
  color: #aaa;
  font-size: 14px;
`;

const NavBtnWrap = styled.div`
  display: flex;
  justify-content: space-between;
  width: 55%;
`;

const ProductBtnWrap = styled.div`
  display: flex;
  justify-content: space-between;
  width: 650px;
  height: 64px;
`;

export default ProductNav;
