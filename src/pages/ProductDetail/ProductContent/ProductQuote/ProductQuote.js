import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { sizeState } from '../../../../atom/atom';
import useQuote from '../../../../hooks/useQuote';
import Loading from '../../../../components/Loading/Loading';
import QuoteGraph from './QuoteGraph/QuoteGraph';

const QUOTE_DAY = ['1개월', '3개월', '6개월', '1년', '전체'];
const QUOTE_MENU = [
  {
    title: '체결 거래',
    value: 'end',
  },
  {
    title: '판매 입찰',
    value: 'sell',
  },
  {
    title: '구매 입찰',
    value: 'buy',
  },
];
const QUOTE_CATEGORY = ['사이즈', '거래가', '거래일'];
const TRADE_LIST = ['사이즈', '거래가', '수량'];

const nowDate = new Date();
const year = nowDate.getFullYear();
const month = nowDate.getMonth() + 1;
const date = nowDate.getDate();

const yearAgo = year - 1;
const halfAgo = month - 6;
const quarterAgo = month - 3;
const monthAgo = month - 1;
const dateAgo = date;

const ProductQuote = () => {
  const [quoteDayClick, setQuoteDayClick] = useState('전체');
  const [quoteMenuClick, setQuoteMenuClick] = useState('end');
  const [selectQuote, setSelectQuote] = useState([]);
  const { quoteData, quoteError } = useQuote();
  const [selectSize] = useRecoilState(sizeState);

  useEffect(() => {
    if (quoteData) {
      setSelectQuote(
        selectSize.size
          ? quoteData.result.filter(item => item.size === selectSize.size)
          : quoteData.result
      );
    }
    return;
  }, [selectSize, quoteData]);

  if (quoteError) return <div>failed to load</div>;
  if (!quoteData) return <Loading />;

  const selectDayQuote = quoteDayClick => {
    const type = {
      all: '전체',
      year: '1년',
      half: '6개월',
      quarter: '3개월',
      month: '1개월',
    };

    const checkThisYear = item => item.created_at.split('/')[0] > yearAgo;
    const checkLastYear = item =>
      parseInt(item.created_at.split('/')[0]) === yearAgo;

    const checkMonthAgo = (item, month) =>
      item.created_at.split('/')[1] > month;
    const checkMonth = (item, month) =>
      item.created_at.split('/')[1] >= 12 + month;

    switch (quoteDayClick) {
      case type.all:
        setSelectQuote(quoteData.result);
        break;
      case type.year:
        setSelectQuote(
          quoteData.result.filter(item => {
            const thisYear = checkThisYear(item);
            const lastYear = checkLastYear(item);
            const fromMonth = item.created_at.split('/')[1] > month;

            return thisYear || (lastYear && fromMonth);
          })
        );
        break;
      case type.half:
        setSelectQuote(
          quoteData.result.filter(item => {
            const thisYear = checkThisYear(item);
            const lastYear = checkLastYear(item);
            const thisMonthAgo = checkMonthAgo(item, halfAgo);
            const thisMonth = checkMonth(item, halfAgo);

            return halfAgo < 1
              ? thisYear || (lastYear && thisMonth)
              : thisYear && thisMonthAgo;
          })
        );
        break;
      case type.quarter:
        setSelectQuote(
          quoteData.result.filter(item => {
            const thisYear = checkThisYear(item);
            const lastYear = checkLastYear(item);
            const thisMonthAgo = checkMonthAgo(item, quarterAgo);
            const thisMonth = checkMonth(item, quarterAgo);

            return quarterAgo < 1
              ? thisYear || (lastYear && thisMonth)
              : thisYear && thisMonthAgo;
          })
        );
        break;
      case type.month:
        setSelectQuote(
          quoteData.result.filter(item => {
            const thisYear = checkThisYear(item);
            const lastYear = checkLastYear(item);
            const thisMonthAgo = checkMonthAgo(item, monthAgo);
            const thisMonth = checkMonth(item, monthAgo);
            const checkDay = item.created_at.split('/')[2] > dateAgo;

            return monthAgo < 1
              ? thisYear || (lastYear && thisMonth && checkDay)
              : thisYear && thisMonthAgo;
          })
        );
        break;
      default:
        break;
    }
  };

  const handleQuotePrice = day => {
    setQuoteDayClick(day);
    selectDayQuote(day);
  };

  const CHECK_MENU = quoteMenuClick === 'end' ? selectQuote : [];

  return (
    <Quote>
      <QuoteTitle>시세</QuoteTitle>
      <div>
        <QuoteDay>
          {QUOTE_DAY.map(day => (
            <QuoteDayList key={day} onClick={() => handleQuotePrice(day)}>
              <QuoteMenuTitle isClick={day === quoteDayClick}>
                {day}
              </QuoteMenuTitle>
            </QuoteDayList>
          ))}
        </QuoteDay>
        <QuoteGraph selectQuote={selectQuote} />
      </div>
      <div>
        <QuoteMenu>
          {QUOTE_MENU.map(menu => (
            <QuoteMenuList
              key={menu.title}
              onClick={() => setQuoteMenuClick(menu.value)}
            >
              <QuoteMenuTitle isClick={menu.value === quoteMenuClick}>
                {menu.title}
              </QuoteMenuTitle>
            </QuoteMenuList>
          ))}
        </QuoteMenu>
        <div>
          <QuoteCategory>
            {quoteMenuClick === 'end'
              ? QUOTE_CATEGORY.map(category => (
                  <li key={category}>{category}</li>
                ))
              : TRADE_LIST.map(category => <li key={category}>{category}</li>)}
          </QuoteCategory>
        </div>
        <div>
          <QuoteList>
            {CHECK_MENU.map(quoteItem => (
              <QuoteItem key={quoteItem.id}>
                <span>{quoteItem.size}</span>
                <span>{`${quoteItem.price.toLocaleString()} 원`}</span>
                <span>{quoteItem.created_at}</span>
              </QuoteItem>
            ))}
          </QuoteList>
        </div>
      </div>
    </Quote>
  );
};

const Quote = styled.div`
  margin-bottom: 50px;
`;

const QuoteTitle = styled.h3`
  padding: 20px 0;
  font-size: 20px;
  font-weight: bold;
`;

const QuoteDay = styled.ul`
  display: flex;
  justify-content: space-around;
  margin: 30px 0;
  background-color: #ddd;
  border-radius: 10px;
  text-align: center;
`;

const QuoteDayList = styled.li`
  width: 19.5%;
  padding: 10px;
  border-radius: 5px;
`;

const QuoteMenu = styled.ul`
  display: flex;
  justify-content: space-around;
  margin: 30px 0;
  background-color: #ddd;
  border-radius: 10px;
  text-align: center;
`;

const QuoteMenuList = styled.li`
  width: 32%;
  padding: 5px;
  border-radius: 5px;
`;

const QuoteMenuTitle = styled.p`
  padding: 10px;
  background-color: ${props => (props.isClick ? '#fff' : '#ddd')};
  border-radius: 5px;
  cursor: pointer;
`;

const QuoteCategory = styled.ul`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  padding: 10px;
  color: #bbb;
  border-bottom: 1px solid #ddd;
`;

const QuoteList = styled.ul`
  height: 220px;
  padding: 10px;
  color: #999;
  font-size: 18px;
  overflow: scroll;
`;

const QuoteItem = styled.li`
  display: flex;
  justify-content: space-between;
  margin: 15px 0;
`;

export default ProductQuote;
