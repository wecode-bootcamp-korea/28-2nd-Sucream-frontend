import React from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai';
import { sizeState } from '../../../../atom/atom';
import useQuote from '../../../../hooks/useQuote';
import useProductDetail from '../../../../hooks/useProductDetail';
import useSizeData from '../../../../hooks/useSizeData';
import Loading from '../../../../components/Loading/Loading';

const RecentPrice = () => {
  const { quoteData, quoteError } = useQuote();
  const { productData, productError } = useProductDetail();
  const { sizeData, sizeError } = useSizeData();
  const [selectSize] = useRecoilState(sizeState);

  if (quoteError || sizeError || productError) return <div>failed to load</div>;
  if (!quoteData || !sizeData || !productData) return <Loading />;

  const quotePrice = quoteData.result[0]?.price || 0;
  const recentPrice = selectSize.size === '' ? quotePrice : selectSize.size;

  const recentQuote =
    quoteData.result.filter(item => item.size === selectSize.size)[0]?.price ||
    productData.result.retail_price;

  const differencePrice =
    quoteData.result.filter(quoteSize => quoteSize.size === selectSize.size)[0]
      ?.price || recentPrice;

  const differenceCheck = differencePrice > productData.result.retail_price;
  const priceDifference = Math.abs(
    differencePrice - productData.result.retail_price
  );
  const pricePercent = (priceDifference / differencePrice) * 100;
  return (
    <Recentprice>
      <PriceTitle>최근 거래가</PriceTitle>
      <div>
        <Price>{`${quotePrice ? recentQuote.toLocaleString() : '-'} 원`}</Price>
        <PriceTextWrap difference={differenceCheck}>
          <i>{differenceCheck ? <AiFillCaretUp /> : <AiFillCaretDown />}</i>
          <span>{`${
            quotePrice ? priceDifference.toLocaleString() : '-'
          } 원`}</span>
          <span>{` (${quotePrice ? pricePercent.toFixed(2) : 0} %)`}</span>
        </PriceTextWrap>
      </div>
    </Recentprice>
  );
};

const Recentprice = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
`;

const PriceTitle = styled.span`
  color: #777;
`;

const Price = styled.p`
  margin-bottom: 10px;
  font-size: 20px;
  font-weight: bold;
`;

const PriceTextWrap = styled.div`
  color: ${props =>
    props.difference ? props.theme.btnred : props.theme.btngreen};
`;

export default RecentPrice;
