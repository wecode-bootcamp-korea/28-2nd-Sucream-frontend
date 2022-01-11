import React from 'react';
import styled from 'styled-components';

const ProductLaw = () => {
  return (
    <Raw>
      <span>
        크림(주)는 통신판매 중개자로서 통신판매의 당사자가 아닙니다. 본 상품은
        개별판매자가 등록한 상품으로 상품, 상품정보, 거래에 관한 의무와 책임은
        각 판매자에게 있습니다. 단, 거래과정에서 검수하고 보증하는 내용에 대한
        책임은 크림(주)에 있습니다.
      </span>
    </Raw>
  );
};

const Raw = styled.div`
  padding: 50px 0 10px;
  font-size: 14px;
  color: #aaa;
`;

export default ProductLaw;
