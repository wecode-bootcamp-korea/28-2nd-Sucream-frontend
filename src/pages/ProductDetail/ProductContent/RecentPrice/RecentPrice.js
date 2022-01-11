import React from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai';
import { sizeState } from '../../../../atom/atom';
import useQuote from '../../../../hooks/useQuote';
import useSizeData from '../../../../hooks/useSizeData';
import Loading from '../../../../components/Loading/Loading';

const RecentPrice = () => {
  const { quoteData, quoteError } = useQuote();
  const { sizeData, sizeError } = useSizeData();
  const [selectSize] = useRecoilState(sizeState);

  if (quoteError || sizeError) return <div>failed to load</div>;
  if (!quoteData || !sizeData) return <Loading />;

  const selectSizeInit = selectSize.size || 230;

  const sizePrice = sizeData.result.buy.filter(
    item => item.size === selectSizeInit
  );
  const quotePrice = quoteData.result[0]?.price;
  const recentPrice = selectSize.size === '' ? quotePrice : selectSize.price;
  const selectPrice = sizePrice[0]?.price || recentPrice;

  const differencePrice =
    quoteData.result.filter(quoteSize => quoteSize.size === selectSize.size)[0]
      ?.price || recentPrice;

  const differenceCheck = differencePrice < selectPrice;
  const priceDifference = Math.abs(differencePrice - selectPrice);
  const pricePercent = (priceDifference / differencePrice) * 100;
  return (
    <Recentprice>
      <PriceTitle>최근 거래가</PriceTitle>
      <div>
        <Price>{`${recentPrice.toLocaleString() || '-'} 원`}</Price>
        <PriceTextWrap difference={differenceCheck}>
          <i>{differenceCheck ? <AiFillCaretUp /> : <AiFillCaretDown />}</i>
          <span>{`${priceDifference.toLocaleString()} 원`}</span>
          <span>{` (${pricePercent.toFixed(2)} %)`}</span>
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
