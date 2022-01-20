import { useState } from 'react';
import styled from 'styled-components';

const SortBar = ({ handleSort }) => {
  const [click, setClick] = useState('');
  return (
    <Container>
      <SortCategory>
        {SORT_BTNS.map(sortName => (
          <SortItem
            key={sortName.id}
            isClick={click === sortName.name}
            onClick={() => {
              handleSort(sortName.conditions);
              setClick(sortName.name);
            }}
          >
            {sortName.name}
          </SortItem>
        ))}
      </SortCategory>
    </Container>
  );
};
const Container = styled.div`
  width: 1200px;
  margin: 0 auto;
`;

const SortCategory = styled.ul`
  margin-bottom: 10px;
  text-align: right;
`;

const SortItem = styled.li`
  display: inline-block;
  margin: 0 10px;
  color: ${props => (props.isClick ? '#33333' : '#b7b7b7')};
  font-size: 1px;
  cursor: pointer;
`;

const SORT_BTNS = [
  {
    id: 1,
    name: '신상품순',
    conditions: [{ key: 'order', value: 'recent' }],
  },
  {
    id: 2,
    name: '즉시구매순',
    conditions: [
      { key: 'order', value: 'low_price' },
      { key: 'is_buyer', value: '1' },
    ],
  },
  {
    id: 3,
    name: '즉시판매순',
    conditions: [
      { key: 'order', value: 'hight_price' },
      { key: 'is_buyer', value: '0' },
    ],
  },
];

export default SortBar;
