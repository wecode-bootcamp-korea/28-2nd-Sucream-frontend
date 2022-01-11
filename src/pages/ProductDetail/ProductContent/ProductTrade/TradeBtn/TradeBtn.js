import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { sizeState } from '../../../../../atom/atom';
import useSizeData from '../../../../../hooks/useSizeData';
import ProductModal from '../../../ProductModal/ProductModal';
import Loading from '../../../../../components/Loading/Loading';

const TradeBtn = ({ type, typeText, text }) => {
  const [isModal, setIsModal] = useState(false);
  const { sizeData, sizeError } = useSizeData();
  const [selectSize] = useRecoilState(sizeState);

  if (sizeError) return <div>failed to load</div>;
  if (!sizeData) return <Loading />;

  const selectBuyPrice = sizeData.result.buy.filter(
    item => item.size === selectSize.size
  );
  const selectSellPrice = sizeData.result.sell.filter(
    item => item.size === selectSize.size
  );

  const instantPrice =
    type === 'buy' ? sizeData.result.instant_buy : sizeData.result.instant_sell;

  const selectPrice =
    selectSize.size === ''
      ? instantPrice
      : type === 'buy'
      ? selectBuyPrice[0].price
      : selectSellPrice[0].price;

  return (
    <>
      <TradeButton
        type="button"
        category={typeText}
        onClick={() => setIsModal(true)}
      >
        {typeText}
        <TradeTextWrap>
          <p>{`${selectPrice.toLocaleString()} 원`}</p>
          <TradeText>{text}</TradeText>
        </TradeTextWrap>
      </TradeButton>
      {isModal && (
        <ProductModal
          title={text}
          typeText={typeText}
          setIsModal={setIsModal}
          type={type}
        />
      )}
    </>
  );
};

export const TradeButton = styled.button`
  display: flex;
  align-items: center;
  width: 49%;
  height: 60px;
  padding: 10px;
  background-color: ${props =>
    props.category === '구매' ? props.theme.btnred : props.theme.btngreen};
  border-radius: 12px;
  color: #fff;
  font-size: 20px;
  cursor: pointer;

  &:hover {
    background-color: ${props =>
      props.category === '구매' ? '#f64d3e' : '#2eaf6a'};
  }
`;

const TradeTextWrap = styled.div`
  margin-left: 10px;
  padding: 10px 12px;
  border-left: 1px solid #fff;
  font-size: 18px;
  text-align: left;
`;

const TradeText = styled.span`
  font-size: 15px;
  color: #eee;
`;

export default TradeBtn;
