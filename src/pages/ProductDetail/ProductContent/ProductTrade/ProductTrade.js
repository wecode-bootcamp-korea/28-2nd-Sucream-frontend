import React from 'react';
import styled from 'styled-components';
import TradeBtn from './TradeBtn/TradeBtn';

const ProductTrade = () => {
  return (
    <TradeContainer>
      {TRADE_DATA.map(item => (
        <TradeBtn key={item.id} {...item} />
      ))}
    </TradeContainer>
  );
};

const TradeContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 10px 0;
`;

const TRADE_DATA = [
  {
    id: 1,
    type: 'buy',
    typeText: '구매',
    text: '즉시 구매가',
  },
  {
    id: 2,
    type: 'sell',
    typeText: '판매',
    text: '즉시 판매가',
  },
];

export default ProductTrade;
