import React, { useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import styled, { keyframes } from 'styled-components';

const CautionContent = ({ info }) => {
  const [isClick, setIsClick] = useState(false);
  const { title, text, subText } = info;

  return (
    <CautionWrap onClick={() => setIsClick(prevIsClick => !prevIsClick)}>
      <CautionTitle>{title}</CautionTitle>
      <CautionIcon>
        <IoIosArrowDown />
      </CautionIcon>
      <CautionList isView={isClick}>
        <CautionText>{text}</CautionText>
        <CautionSubText>{subText}</CautionSubText>
      </CautionList>
    </CautionWrap>
  );
};

const CautionWrap = styled.li`
  position: relative;
  padding: 20px 0;
  border-bottom: 1px solid #ddd;
`;

const CautionTitle = styled.p`
  font-size: 17px;
`;

const CautionIcon = styled.i`
  position: absolute;
  top: 20px;
  right: 0;
  font-size: 20px;
  color: #aaa;
`;

const cautionRate = keyframes`
  from {
    transform: translateY(-10px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const CautionList = styled.div`
  display: ${props => (props.isView ? 'block' : 'none')};
  margin-top: 20px;
  animation: ${cautionRate} 1s;
`;

const CautionText = styled.p`
  margin-bottom: 10px;
`;

const CautionSubText = styled.span`
  color: #aaa;
`;

export default CautionContent;
