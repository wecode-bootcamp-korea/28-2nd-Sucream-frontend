import React from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { subModal, modalName } from '../../../../atom/atom';
import SubModal from '../SubModal/SubModal';

const ModalTradeBtn = ({ type, typeText, priceTrans }) => {
  const [isModal, setIsModal] = useRecoilState(subModal);
  const [, setModalType] = useRecoilState(modalName);

  const handleModal = type => {
    setIsModal(true);
    setModalType(type);
  };

  const CHECK_MODAL = [
    {
      name: `즉시 ${typeText}`,
      type: 'tradeBuy',
      subType: '구매',
      tradeType: 'isTrade',
    },
    {
      name: `즉시 ${typeText}`,
      type: 'tradeSell',
      subType: '판매',
      tradeType: 'isTrade',
    },
    {
      name: `${typeText} 입찰`,
      type: 'biddingBuy',
      subType: '구매',
      tradeType: 'isSuggest',
    },
    {
      name: `${typeText} 입찰`,
      type: 'biddingSell',
      subType: '판매',
      tradeType: 'isSuggest',
    },
  ];

  const buttonDisable = item =>
    priceTrans === '0' && item.tradeType === 'isTrade';
  return (
    <ButtonWrap>
      {CHECK_MODAL.filter(check => check.subType === typeText).map(item => (
        <TradeBtn
          key={item.type}
          type={type}
          onClick={() => !buttonDisable(item) && handleModal(item.type)}
        >
          {item.tradeType === 'isTrade' && (
            <TradeBtnPrice>{priceTrans} 원</TradeBtnPrice>
          )}
          <span>{item.name}</span>
        </TradeBtn>
      ))}
      {isModal && <SubModal typeText={typeText} />}
    </ButtonWrap>
  );
};

const ButtonWrap = styled.div`
  display: flex;
  justify-content: center;
`;

const TradeBtn = styled.button`
  width: 45%;
  height: 64px;
  margin: 220px 10px;
  background-color: ${props =>
    props.type === 'buy' ? props.theme.btnred : props.theme.btngreen};
  border-radius: 10px;
  color: #fff;
  font-size: 16px;
  opacity: 0.7;
  cursor: pointer;

  &:hover {
    opacity: 1;
  }
`;

const TradeBtnPrice = styled.p`
  font-size: 18px;
`;

export default ModalTradeBtn;
