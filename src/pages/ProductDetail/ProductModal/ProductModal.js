import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import styled, { keyframes } from 'styled-components';
import { GrClose } from 'react-icons/gr';
import useProductDetail from '../../../hooks/useProductDetail';
import useSizeData from '../../../hooks/useSizeData';
import useQuote from '../../../hooks/useQuote';
import Loading from '../../../components/Loading/Loading';
import ModalItem from './ModalItem/ModalItem';
import { sizeState, tradeState, subModal } from '../../../atom/atom';
import ModalTradeBtn from './ModalTradeBtn/ModalTradeBtn';
import { ModalItemStyle, ModalPrice } from './ModalItem/ModalItem';

const ProductModal = ({ setIsModal, typeText, type }) => {
  const { productData, productError } = useProductDetail();
  const { sizeData, sizeError } = useSizeData();
  const { quoteData, quoteError } = useQuote();
  const [, setSelectSize] = useRecoilState(sizeState);
  const [trade, setTrade] = useRecoilState(tradeState);
  const [, setIsSubModal] = useRecoilState(subModal);
  const { image_urls, name, korean_name, model_number } = productData.result;

  const handleModalControll = (type, price, size, id) => {
    const actionType = {
      size: '사이즈',
      buy: '구매',
      sell: '판매',
    };

    switch (type) {
      case actionType.size:
        setSelectSize({
          size: size,
          price: price,
        });
        setIsModal(false);
        break;
      case actionType.buy:
        setTrade({
          ...trade,
          buy: {
            id: id,
            size: size,
            price: price,
            is_buyer: true,
          },
        });
        break;
      case actionType.sell:
        setTrade({
          ...trade,
          sell: {
            id: id,
            size: size,
            price: price,
            is_buyer: false,
          },
        });
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  if (productError || sizeError || quoteError) return <div>failed to load</div>;
  if (!productData || !sizeData || !quoteData) return <Loading />;

  const CHECK_SIZE = typeText === '사이즈';
  const CHECK_BUY = typeText === '구매';

  const SIZE_DATA =
    CHECK_SIZE || CHECK_BUY ? sizeData.result.buy : sizeData.result.sell;

  const tradePrice = CHECK_BUY ? trade.buy.price : trade.sell.price;
  const priceTrans = tradePrice.toLocaleString();

  const allBtnControll = () => {
    setSelectSize({ size: '', price: '' });
    setIsModal(false);
  };

  const handleModalClose = () => {
    setIsModal(false);
    setIsSubModal(false);
  };

  return (
    <ModalWrap>
      <Modal>
        <ModalTitle>{`${typeText}`}</ModalTitle>
        <button type="button" onClick={handleModalClose}>
          <ModalIcon>
            <GrClose />
          </ModalIcon>
        </button>
        <ModalProduct>
          <ProductImg alt={name} src={image_urls} />
          <ProductText>
            <ProductModelNum>{model_number}</ProductModelNum>
            <p>{name}</p>
            <ProductName>{korean_name}</ProductName>
          </ProductText>
        </ModalProduct>
        <ModalItems>
          {CHECK_SIZE && (
            <ModalItemStyle type="button" onClick={allBtnControll}>
              <p>모든 사이즈</p>
              <ModalPrice>
                {quoteData.result[0]?.price.toLocaleString() ||
                  productData.result.retail_price}
              </ModalPrice>
            </ModalItemStyle>
          )}
          {SIZE_DATA.map(item => {
            return (
              <ModalItem
                key={item.id}
                typeText={typeText}
                item={item}
                handleModalControll={handleModalControll}
              />
            );
          })}
        </ModalItems>
        {!CHECK_SIZE && (
          <ModalTradeBtn
            type={type}
            typeText={typeText}
            priceTrans={priceTrans}
          />
        )}
      </Modal>
    </ModalWrap>
  );
};

const modalAnimation = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const ModalWrap = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 10;
`;

const Modal = styled.div`
  position: fixed;
  top: 100px;
  left: 550px;
  width: 640px;
  height: 640px;
  padding: 20px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 20px;
  text-align: center;
  z-index: 10;
  animation: ${modalAnimation} 0.7s;
`;

const ModalTitle = styled.h3`
  margin-top: 10px;
  font-size: 26px;
`;

const ModalIcon = styled.i`
  position: absolute;
  top: 20px;
  right: 20px;
  font-size: 26px;
  cursor: pointer;
`;

const ModalProduct = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 1px solid #ddd;
`;

const ProductImg = styled.img`
  width: 100px;
  height: 100px;
  margin-right: 20px;
  border-radius: 20px;
`;

const ProductText = styled.div`
  text-align: left;
  font-size: 18px;
`;

const ProductModelNum = styled.p`
  margin: 10px 0;
`;

const ProductName = styled.p`
  margin: 10px 0;
  color: #aaa;
  font-size: 16px;
`;

const ModalItems = styled.ul`
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
`;

export default ProductModal;
