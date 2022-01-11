import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import ShopCarousel from './components/ShopCarousel/ShopCarousel';
import SortBar from './components/SortBar/SortBar';
import ProductList from './components/ProductList/ProductList';

import { MainNav } from '../../components/MainNav/MainNav';

const Main = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [productList, setProductList] = useState([]);
  const [queryArr, setQueryArr] = useState([]);

  const qs = new URLSearchParams(location.search);

  useEffect(() => {
    fetch(`http://10.58.5.73:8000/products${location.search}`)
      .then(res => res.json())
      .then(res => setProductList(res.result));
  }, [location.search]);

  const handleFiter = brandId => {
    qs.set('brand', brandId);
    navigate('?' + qs.toString());
  };

  useEffect(() => {
    const sizeArr = [...queryArr];
    sizeArr.sort();
    queryArr.length && qs.set('size', sizeArr);
    decodeURI(qs.get('size'));
    queryArr.length !== 0 ? navigate('?' + qs.toString()) : navigate('/');
  }, [queryArr]);

  const handleSize = sizeId => {
    setQueryArr(current => {
      const newArr = [...current];
      newArr.indexOf(sizeId) === -1
        ? newArr.push(sizeId)
        : newArr.splice(newArr.indexOf(sizeId), 1);
      return newArr || [];
    });
  };

  const handleSort = conditions => {
    conditions.forEach(condition => {
      qs.set(condition.key, condition.value);
    });

    navigate('?' + qs.toString());
  };

  const handleDetail = detail => {
    navigate(`/products/${detail}`);
  };

  const initialQueryArr = () => {
    setQueryArr([]);
  };

  return (
    <Container>
      <MainNav />
      <ShopTitle>
        <ShopCarousel />
        <Link to="/" onClick={initialQueryArr}>
          <ShopStyle id="shop-1">SHOP</ShopStyle>
        </Link>
      </ShopTitle>

      <div className="sortCategory">
        {SortBar.length && (
          <SortBar location={location} handleSort={handleSort} />
        )}
      </div>
      <ProductList
        productList={productList}
        location={location}
        handleFiter={handleFiter}
        handleSize={handleSize}
        handleDetail={handleDetail}
      />
    </Container>
  );
};

const Container = styled.div`
  margin-bottom: 120px;
  background-color: #ffffff;
`;

const ShopTitle = styled.div`
  margin-top: 20px;
`;

const ShopStyle = styled.h2`
  display: grid;
  width: 64vw;
  margin: auto;
  margin-bottom: 30px;
  font-size: 28px;
  font-weight: 700;
  text-align: center;
`;
export default Main;
