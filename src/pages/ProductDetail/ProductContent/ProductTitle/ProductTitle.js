import React from 'react';
import styled from 'styled-components';
import useProductDetail from '../../../../hooks/useProductDetail';
import Loading from '../../../../components/Loading/Loading';

const ProductTitle = () => {
  const { productData, productError } = useProductDetail();

  if (productError) return <div>failed to load</div>;
  if (!productData) return <Loading />;

  return (
    <Title>
      <TitleHead>{productData.result.brand}</TitleHead>
      <p>{productData.result.name}</p>
      <TitleText>{productData.result.korean_name}</TitleText>
    </Title>
  );
};

const Title = styled.div`
  margin-bottom: 10px;
  font-size: 24px;
`;

const TitleHead = styled.h3`
  margin-bottom: 10px;
  font-weight: bold;
  text-decoration: underline;
`;

const TitleText = styled.span`
  font-size: 16px;
  color: #aaa;
`;

export default ProductTitle;
