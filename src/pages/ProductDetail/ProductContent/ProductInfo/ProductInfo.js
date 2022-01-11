import React from 'react';
import styled from 'styled-components';
import useProductDetail from '../../../../hooks/useProductDetail';
import Loading from '../../../../components/Loading/Loading';

const ProductInfo = () => {
  const { productData, productError } = useProductDetail();

  if (productError) return <div>failed to load</div>;
  if (!productData) return <Loading />;

  const PRODUCT_INFO = [
    {
      name: '모델번호',
      value: productData.result.model_number,
    },
    {
      name: '출시일',
      value: productData.result.release_at,
    },
    {
      name: '컬러',
      value: productData.result.color,
    },
    {
      name: '발매가',
      value: `${productData.result.retail_price.toLocaleString()} ₩`,
    },
  ];

  return (
    <Info>
      <InfoTitle>상품 정보</InfoTitle>
      <div>
        <InfoList>
          {PRODUCT_INFO.map(item => {
            return (
              <InfoItem key={item.name}>
                <InfoItemName>{item.name}</InfoItemName>
                <InfoItemContent>{item.value}</InfoItemContent>
              </InfoItem>
            );
          })}
        </InfoList>
      </div>
    </Info>
  );
};

const Info = styled.div`
  margin: 40px 0;
`;

const InfoTitle = styled.h3`
  margin: 20px 0;
  font-size: 20px;
  font-weight: bold;
`;

const InfoList = styled.ul`
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
  border-top: 1px solid #dddddd;
  border-bottom: 1px solid #dddddd;
`;

const InfoItem = styled.li`
  width: 25%;
  padding-left: 20px;
  border-left: 1px solid #dddddd;

  :first-child {
    border: none;
  }
`;

const InfoItemName = styled.span`
  font-size: 14px;
  color: #aaa;
`;

const InfoItemContent = styled.p`
  margin-top: 10px;
  font-size: 14px;
`;

export default ProductInfo;
