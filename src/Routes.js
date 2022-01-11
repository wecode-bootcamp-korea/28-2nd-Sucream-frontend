import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Nav from './components/Nav/Nav';
import Footer from './components/Footer/Footer';
import Main from './pages/Main/Main';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import Login from './pages/Login/Login';
import { RecoilRoot } from 'recoil';

const Router = () => {
  return (
    <BrowserRouter>
      <RecoilRoot>
        <Nav />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </RecoilRoot>
      <Footer />
    </BrowserRouter>
  );
};

export default Router;
