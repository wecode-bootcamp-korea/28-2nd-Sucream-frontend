import React from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';
import useProductDetail from '../../../hooks/useProductDetail';
import Loading from '../../../components/Loading/Loading';

const ProductImg = () => {
  const { productData, productError } = useProductDetail();

  if (productError) return <div>failed to load</div>;
  if (!productData) return <Loading />;

  const productCount = productData.result.image_urls.length;

  const settings = {
    dots: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <section>
      <ProductImgContainer>
        <StyledSlider {...settings} count={productCount}>
          {productData.result.image_urls.map((item, i) => (
            <Img key={i} alt={productData.result.brand} src={item} />
          ))}
        </StyledSlider>
      </ProductImgContainer>
    </section>
  );
};

const ProductImgContainer = styled.div`
  position: sticky;
  top: 80px;
`;

const StyledSlider = styled(Slider)`
  width: 35em;
  margin-right: 40px;

  > div {
    border-radius: 10px;
  }

  .slick-dots {
    display: flex;
    position: absolute;
    bottom: 10px;
    width: 100%;

    li {
      width: ${props => `${100 / props.count}%`};
      margin: 0;

      button:before {
        width: 100%;
        height: 5px;
        background-color: #333;
        content: '';
      }
    }
  }
`;

const Img = styled.img`
  width: 35em;
  height: 35em;
  border-radius: 10px;
`;

export default ProductImg;
