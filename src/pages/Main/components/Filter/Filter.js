import { useState, useEffect } from 'react';
import styled from 'styled-components';

export const Filter = ({ handleFiter, handleSize }) => {
  const [filterInfo, setFilterInfo] = useState([]);
  const [clickeBtn, setClickedBtn] = useState('');

  const brandBtn = filterInfo.brand;
  const sizeBtn = filterInfo.size;

  useEffect(() => {
    fetch('http://10.58.5.73:8000/products/filter')
      .then(res => res.json())
      .then(res => setFilterInfo(res.result));
  }, []);

  return (
    <SideFilter>
      <div>
        <BrandStyled onClick={() => {}}>브랜드</BrandStyled>
        <div>
          <ul>
            {brandBtn?.map(brand => (
              <List
                key={brand.id}
                onClick={() => {
                  handleFiter(brand.id);
                }}
              >
                {brand.name}
              </List>
            ))}
          </ul>
        </div>
      </div>
      <Size>
        <SizeStyle>사이즈</SizeStyle>

        <SizeList>
          {sizeBtn?.map(size => (
            <SizeBtn
              key={size.id}
              isClick={clickeBtn === size.id}
              onClick={() => {
                handleSize(size.id);

                setClickedBtn(prev => (prev === size.id ? '' : size.id));
                setClickedBtn(size.id);
              }}
            >
              {size.name}
            </SizeBtn>
          ))}
        </SizeList>
      </Size>
    </SideFilter>
  );
};

const SideFilter = styled.div`
  min-width: 150px;
  margin: 20px 20px 0 0;
  color: black;
`;

const Size = styled.div``;

const SizeStyle = styled.h2`
  margin-bottom: 10px;
  font-size: 30px;
  font-weight: 600;
`;

const SizeList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  grid-column-gap: 10px;
  grid-row-gap: 10px;
`;

const SizeBtn = styled.button`
  display: block;
  width: 63px;
  height: 32px;
  color: ${props => (props.isClick ? '#33333' : '#b7b7b7')};
  color: ${props => props.color};
  border: 1px solid #b7b7b7;
  font-size: 13px;
  cursor: pointer;
`;

const BrandStyled = styled.h2`
  margin-bottom: 10px;
  font-size: 30px;
  font-weight: 600;
`;

const List = styled.li`
  margin: 20px 0;
  font-size: 20px;
  cursor: pointer;
`;
