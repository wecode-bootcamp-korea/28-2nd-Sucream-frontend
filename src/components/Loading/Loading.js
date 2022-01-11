import React from 'react';
import styled from 'styled-components';

const Loading = () => {
  return <LoadingWrap>...</LoadingWrap>;
};

const LoadingWrap = styled.div`
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Loading;
