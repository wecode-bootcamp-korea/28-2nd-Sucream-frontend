import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { IoCaretDownCircleOutline } from 'react-icons/io5';
import styled from 'styled-components';
import { sizeState } from '../../../../atom/atom';
import ProductModal from '../../ProductModal/ProductModal';

const ProductSize = () => {
  const [isModal, setIsModal] = useState(false);
  const [selectSize] = useRecoilState(sizeState);

  return (
    <Size>
      <SizeTitle>사이즈</SizeTitle>
      <SizeBtn type="button" onClick={() => setIsModal(true)}>
        {selectSize.size || '모든 사이즈'}
        <i>
          <IoCaretDownCircleOutline />
        </i>
      </SizeBtn>
      {isModal && <ProductModal typeText="사이즈" setIsModal={setIsModal} />}
    </Size>
  );
};

const Size = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #dddddd;
`;

const SizeTitle = styled.span`
  color: #777;
`;

const SizeBtn = styled.button`
  font-size: 21px;
  font-weight: bold;
  cursor: pointer;
`;

export default ProductSize;
