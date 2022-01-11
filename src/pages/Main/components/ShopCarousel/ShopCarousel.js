import styled from 'styled-components';
import Slider from 'react-slick';

const ShopCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  return (
    <Container>
      <Slider {...settings}>
        <Bar color="#000002">
          <Img
            src="https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1112&q=80"
            alt="2022-img"
          />
        </Bar>
        <Bar color="#c4c3c9">
          <Img
            src="https://images.unsplash.com/photo-1607429482819-51a77fb353d9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
            alt="jordan-img"
          />
        </Bar>
        <Bar color="#0083b0">
          <Img
            src="https://images.unsplash.com/photo-1465877783223-4eba513e27c6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
            alt="shoes-img"
          />
        </Bar>
      </Slider>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  width: 1440px;
  height: 630px;
  margin: 10px auto;
`;

const Img = styled.img`
  position: absolute;
  top: -60px;
  width: 1440px;
  height: 600px;
  margin: 0 auto;
`;

const Bar = styled.div`
  height: 480px;
  background-color: ${props => props.color};
  text-align: center;
`;
export default ShopCarousel;
