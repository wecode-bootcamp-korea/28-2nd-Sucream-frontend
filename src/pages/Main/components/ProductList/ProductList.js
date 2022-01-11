import React from 'react';
import styled from 'styled-components';
import Product from '../Product/Product';
import { Filter } from '../Filter/Filter';

const ProductList = ({
  productList,
  handleFiter,
  handleSize,
  handleDetail,
}) => {
  // console.log(productList.id);
  return (
    <Container>
      <Filter
        productList={productList}
        handleFiter={handleFiter}
        handleSize={handleSize}
      />
      <Products>
        {productList.map(item => {
          const { id } = item;
          // console.log(id);
          return (
            <Product
              handleDetail={handleDetail}
              productList={productList}
              key={id}
              id={id}
              {...item}
            />
          );
        })}
      </Products>
    </Container>
  );
};

const Products = styled.div`
  display: grid;
  width: 100%;
  margin: auto;
  margin-top: 20px;
  margin-left: 30px;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-column-gap: 20px;
`;

const Container = styled.div`
  display: flex;
  width: 1200px;
  margin: auto;
`;

export default ProductList;
