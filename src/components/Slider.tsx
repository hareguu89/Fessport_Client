import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Slider from 'react-slick';

const Container = styled.div`
  overflow: hidden;
`;

const StyledSlider = styled(Slider)`
  .slick-slide div {
    outline: none;
  }
  .slick-prev {
    left: 3% !important;
    z-index: 1;
  }
  .slick-next {
    right: 3% !important;
    z-index: 1;
  }
`;

const ImageContainer = styled.div`
  margin: 0 16px;
`;

const Image = styled.img`
  max-width: 500px;
  max-height: 500px;
`;

const settings = {
  dots: true,
  infinite: true,
  arrow: true,
  speed: 500,
  slidesToShow: 2,
  adaptiveHeight: true,
  slidesToScroll: 1,
  centerMode: true,
};

const SimpleSlider = ({
  artists,
}: {
  artists:
    | {
        _id: string;
        name: string;
        image: string;
      }[]
    | null;
}) => {
  return (
    <Container>
      <h2> Single Item</h2>
      <StyledSlider {...settings}>
        {artists &&
          artists.map((item) => {
            return (
              <div key={item._id}>
                <ImageContainer>
                  <Link to={`/artist/detail/${item._id}`}>
                    <Image src={item.image} />
                  </Link>
                  <div>{item.name}</div>
                </ImageContainer>
              </div>
            );
          })}
      </StyledSlider>
    </Container>
  );
};

export default SimpleSlider;
