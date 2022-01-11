import React from 'react';
import styled from 'styled-components';
import { BsBookmark, BsBookmarkFill } from 'react-icons/bs';
import useProductDetail from '../../../../hooks/useProductDetail';
import Loading from '../../../../components/Loading/Loading';

const ProductInterest = () => {
  const { productData, productError } = useProductDetail();

  if (productError) return <div>failed to load</div>;
  if (!productData) return <Loading />;
  return (
    <Interest>
      <InterestBtn>
        <InterestIcon>
          {productData.result.like ? <BsBookmarkFill /> : <BsBookmark />}
        </InterestIcon>
        <IntersetText>관심상품</IntersetText>
        <IntersetText>{productData.result.like_count}</IntersetText>
      </InterestBtn>
    </Interest>
  );
};

const Interest = styled.div`
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  text-align: center;
`;

const InterestBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  font-size: 18px;
  font-weight: 300;
`;

const InterestIcon = styled.i`
  font-size: 20px;
`;

const IntersetText = styled.span`
  margin-left: 5px;
  font-weight: 400;
  color: #222;
`;

export default ProductInterest;
