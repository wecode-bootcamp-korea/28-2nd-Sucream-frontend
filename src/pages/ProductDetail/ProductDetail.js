import React from 'react';
import { RecoilRoot } from 'recoil';
import styled from 'styled-components';
import useScroll from '../../hooks/useScroll';
import ProductImg from './ProductImg/ProductImg';
import ProductContent from './ProductContent/ProductContent';
import ProductBrand from './ProductBrand/ProductBrand';
import ProductNav from './ProductNav/ProductNav';

const ProductDetail = () => {
  const { isNavOn } = useScroll();

  return (
    <RecoilRoot>
      {isNavOn && <ProductNav />}
      <ProductMain>
        <ProductImg />
        <ProductContent />
      </ProductMain>
      <ProductBrand />
    </RecoilRoot>
  );
};

const ProductMain = styled.main`
  display: flex;
  margin: 80px 15%;
  padding: 20px;
`;

export default ProductDetail;
