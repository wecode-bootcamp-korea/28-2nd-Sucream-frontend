import React from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { tradeState } from '../../../../atom/atom';

const ModalItem = ({ typeText, item, handleModalControll }) => {
  const [trade] = useRecoilState(tradeState);
  const tradeCheck = typeText === '구매' ? trade.buy : trade.sell;
  const isClick = typeText !== '사이즈' && item.size === tradeCheck.size;
  const priceCheck = item.price === 0 ? '-' : item.price.toLocaleString();

  return (
    <ModalItemStyle
      isClick={isClick}
      onClick={() =>
        handleModalControll(typeText, item.price, item.size, item.id)
      }
    >
      <p>{item.size || '모든 사이즈'}</p>
      <ModalPrice>{priceCheck}</ModalPrice>
    </ModalItemStyle>
  );
};

export const ModalItemStyle = styled.li`
  width: 30%;
  margin: 5px;
  padding: 5px 10px;
  border: 1px solid #ddd;
  border-radius: 10px;
  cursor: pointer;
  background-color: ${props => (props.isClick ? '#222' : '#fff')};
  color: ${props => (props.isClick ? '#fff' : '#222')};

  &:hover {
    background-color: #222;
    color: #fff;
  }
`;

export const ModalPrice = styled.span`
  color: red;
`;

export default ModalItem;
