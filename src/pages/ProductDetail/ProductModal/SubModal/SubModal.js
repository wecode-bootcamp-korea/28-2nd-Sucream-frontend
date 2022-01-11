import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { tradeState, subModal, modalName } from '../../../../atom/atom';

const SubModal = ({ typeText }) => {
  const [bidding, setBidding] = useState(0);
  const [trade] = useRecoilState(tradeState);
  const [, setIsModal] = useRecoilState(subModal);
  const [modalType] = useRecoilState(modalName);
  const params = useParams();
  const navigate = useNavigate();

  const MODAL_VALUE = {
    tradeBuy: {
      text: '구매 진행중',
      confirm: '구매 하시겠습니까?',
      button: '구매',
      tradeType: 'trade',
      tradeInfo: trade.buy,
      url: 'http://10.58.5.73:8000/biddings/order',
    },
    tradeSell: {
      text: '판매 진행중',
      confirm: '판매 하시겠습니까?',
      button: '판매',
      tradeType: 'trade',
      tradeInfo: trade.sell,
      url: 'http://10.58.5.73:8000/biddings/order',
    },
    biddingBuy: {
      text: '구매 입찰',
      confirm: '입찰 하시겠습니까?',
      button: '구매 입찰',
      tradeType: 'bidding',
      tradeInfo: trade.buy,
      url: 'http://10.58.5.73:8000/biddings/bidding',
      offer: bidding,
    },
    biddingSell: {
      text: '판매 입찰',
      confirm: '입찰 하시겠습니까?',
      button: '판매 입찰',
      tradeType: 'bidding',
      tradeInfo: trade.sell,
      url: 'http://10.58.5.73:8000/biddings/bidding',
      offer: bidding,
    },
  };

  const { text, confirm, button, tradeType, tradeInfo, url, offer } =
    MODAL_VALUE[modalType];

  const submitTrade = () => {
    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        ...tradeInfo,
        product: params.id,
        ...(offer && { offered_price: offer }),
      }),
    })
      .then(res => res.json())
      .then(
        data => data.message === 'success' && alert(`${button} 하였습니다.`)
      )
      .then(() => navigate('/'))
      .catch(error => console.error(error));
  };

  return (
    <SubModalConatiner>
      <SubModalTitle>{text}</SubModalTitle>
      <SubModalContent>
        <SubModalText>
          <Text>{`즉시 ${typeText}가`}</Text>
          <span>{`${tradeInfo.price.toLocaleString()} 원`}</span>
        </SubModalText>
        <SubModalText>
          <Text>사이즈</Text>
          <span>{tradeInfo.size}</span>
        </SubModalText>
      </SubModalContent>
      {tradeType === 'bidding' && (
        <SubModalInput
          type="number"
          placeholder="가격을 입력하세요."
          value={bidding}
          onChange={e => setBidding(e.target.value)}
        />
      )}
      <SubModalConfirm>{confirm}</SubModalConfirm>
      <SubModalButtonWrap>
        <SubModalBtnStyle type="button" onClick={() => setIsModal(false)}>
          뒤로
        </SubModalBtnStyle>
        <SubModalBtnStyle onClick={submitTrade}>{button}</SubModalBtnStyle>
      </SubModalButtonWrap>
    </SubModalConatiner>
  );
};

const SubModalConatiner = styled.div`
  position: absolute;
  top: 30%;
  width: 100%;
  height: 430px;
  background-color: #fff;
  font-size: 20px;
  z-index: 15;
`;

const SubModalButtonWrap = styled.div`
  display: flex;
  justify-content: center;
`;

const SubModalBtnStyle = styled.button`
  width: 30%;
  margin: 20px;
  padding: 20px;
  border: 1px solid #222;
  background-color: #fff;
  color: #222;
  border-radius: 10px;
  font-size: 16px;

  &:hover {
    background-color: #222;
    color: #fff;
  }
`;

const SubModalTitle = styled.p`
  margin: 10px 0;
  font-weight: bold;
`;

const SubModalContent = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 30px;
  border-bottom: 1px solid #ddd;
`;

const SubModalInput = styled.input`
  width: 70%;
  margin-top: 35px;
  padding: 10px;
  font-size: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  color: #777;

  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    appearance: none;
  }
`;

const SubModalText = styled.span`
  margin-bottom: 30px;
`;

const Text = styled.p`
  font-size: 16px;
  color: #aaa;
`;

const SubModalConfirm = styled.p`
  margin: 50px 0 30px;
`;

export default SubModal;
