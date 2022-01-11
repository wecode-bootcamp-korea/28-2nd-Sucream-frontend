import React from 'react';
import styled from 'styled-components';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';
import useProductDetail from '../../../hooks/useProductDetail';
import Loading from '../../../components/Loading/Loading';
import BrandItem from './BrandItem/BrandItem';

const ProductBrand = () => {
  const { productData, productError } = useProductDetail();

  if (productError) return <div>failed to load</div>;
  if (!productData) return <Loading />;

  return (
    <Container>
      <BrandTitle>{productData.result.brand}의 다른 제품</BrandTitle>
      <div>
        <BrandText>더보기</BrandText>
        <BrandIcon>
          <MdOutlineKeyboardArrowRight />
        </BrandIcon>
      </div>
      <ItemsList>
        {BRAND_ITEMS.map(item => (
          <BrandItem key={item.name} {...item} />
        ))}
      </ItemsList>
    </Container>
  );
};

const Container = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  margin: 0 15% 200px;
  padding: 30px 0;
  border-top: 1px solid #ddd;
`;

const BrandTitle = styled.h3`
  font-size: 24px;
  font-weight: bold;
`;

const BrandText = styled.span`
  color: #aaa;
`;

const BrandIcon = styled.i`
  color: #aaa;
`;

const ItemsList = styled.ul`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 30px;
`;

const BRAND_ITEMS = [
  {
    title: 'Nike',
    name: 'Nike zero',
    img: 'https://images.unsplash.com/photo-1628253747716-0c4f5c90fdda?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
    price: 65000,
  },
  {
    title: 'Nike',
    name: 'Nike oeo',
    img: 'https://images.unsplash.com/photo-1521093470119-a3acdc43374a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
    price: 165000,
  },
  {
    title: 'Nike',
    name: 'Nike twice',
    img: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
    price: 235000,
  },
  {
    title: 'Nike',
    name: 'Nike eclipse',
    img: 'https://images.unsplash.com/photo-1526765992122-6abcb1e0f4fa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
    price: 55000,
  },
  {
    title: 'Nike',
    name: 'Nike solor',
    img: 'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=930&q=80',
    price: 123000,
  },
];

export default ProductBrand;
