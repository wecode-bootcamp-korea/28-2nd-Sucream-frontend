import React from 'react';
import styled from 'styled-components';
import ProductTitle from './ProductTitle/ProductTitle';
import RecentPrice from './RecentPrice/RecentPrice';
import ProductTrade from './ProductTrade/ProductTrade';
import ProductInterest from './ProductInterset/ProductInterest';
import ProductSize from './ProductSize/ProductSize';
import ProductInfo from './ProductInfo/ProductInfo';
import ProductQuote from './ProductQuote/ProductQuote';
import ProductCaution from './ProductCaution/ProductCaution';
import ProductLaw from './ProductLaw/ProductLaw';

const ProductContent = () => {
  return (
    <Content>
      <ProductTitle />
      <ProductSize />
      <RecentPrice />
      <ProductTrade />
      <ProductInterest />
      <ProductInfo />
      <ProductQuote />
      <ProductCaution />
      <ProductLaw />
    </Content>
  );
};

const Content = styled.section`
  position: relative;
  width: 50%;
  padding-left: 40px;
  margin-top: 50px;
  border-left: 1px solid #dddddd;
`;

export default ProductContent;
