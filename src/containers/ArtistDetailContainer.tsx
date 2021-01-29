import React, { useState, useEffect } from 'react';
import { Link, withRouter, useParams, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import ReactPlayer from 'react-player';
import SimpleSlider from '../components/Slider';
import Slider from 'react-slick';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../modules';
import {
  getArtistDetailAsync,
  postLikeArtistAsync,
  postDislikeArtistAsync,
} from '../modules/artist';

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  arrows: true,
  slidesToShow: 2,
  slidesToScroll: 1,
};

const ArtistDetailContainer = (): JSX.Element => {
  const history = useHistory();
  const params = useParams<{ _id: string }>();
  const [isModal, setIsModal] = useState(false);
  const { data, loading, error } = useSelector(
    (state: RootState) => state.artist.artistDetail,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('🍗🍗🍗🍗 Artist Detail useEffect 🍗🍗🍗🍗');
    dispatch(getArtistDetailAsync.request(params._id));
  }, []);

  const handleModal = () => {
    setIsModal(!isModal);
  };

  const handleLikeButton = () => {
    if (data && data.isLiked) {
      dispatch(postDislikeArtistAsync.request(params._id));
    } else if (data && !data.isLiked) {
      dispatch(postLikeArtistAsync.request(params._id));
    }
  };

  return (
    <>
      {loading && <p style={{ textAlign: 'center' }}>Loading...</p>}
      {error && <p style={{ textAlign: 'center' }}>Error!!!</p>}
      {data && (
        <>
          <DetailPresenter>
            <PosterSection>
              <PoseterImage src={data.image} />
              <WishButton isLiked={data.isLiked} onClick={handleLikeButton}>
                wishhhhhh
              </WishButton>
            </PosterSection>
            <ContentSection>
              <ArtistSection>
                <ArtistName>{data.name}</ArtistName>
                <ArtistGenre>{data.genre.name}</ArtistGenre>
                <ArtistVideoSumnail
                  src={`https://img.youtube.com/vi/${data.video}/hqdefault.jpg`}
                  onClick={handleModal}
                />
              </ArtistSection>
              <FestivalSection>
                <Container>
                  <h2> festival</h2>
                  <StyledSlider {...settings}>
                    {data.festivals.map((item) => {
                      return (
                        <ImageContainer key={item._id}>
                          <Link to={`/artist/detail/${item._id}`}>
                            <Image src={item.poster} />
                          </Link>
                          <div>{item.name}</div>
                        </ImageContainer>
                      );
                    })}
                  </StyledSlider>
                </Container>
              </FestivalSection>
            </ContentSection>
          </DetailPresenter>
          {isModal && (
            <PlayerModal onClick={handleModal}>
              <ReactPlayer
                id="pl"
                width="80vw"
                height="80vh"
                playing={true}
                controls={true}
                config={{
                  youtube: {
                    playerVars: { autoplay: 0 },
                  },
                }}
                url={`https://youtu.be/${data.video}`}
              />
            </PlayerModal>
          )}
        </>
      )}
    </>
  );
};

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
    /* position: absolute;
    padding-left: 20px;
    margin-left: 20px; */
  }
  .slick-next {
    right: 3% !important;
    z-index: 1;
    /* margin-right: 20px; */
  }
`;

const ImageContainer = styled.div`
  margin: 0 16px;
`;

const Image = styled.img`
  max-width: 500px;
  max-height: 500px;
`;

const DetailPresenter = styled.div``;
const PosterSection = styled.div``;
const PoseterImage = styled.img`
  width: 300px;
  height: 500px;
`;
const WishButton = styled.div<{ isLiked: boolean }>`
  width: 100px;
  height: 100px;
  background: ${(props) => (props.isLiked ? 'blue' : 'red')};
`;
const ContentSection = styled.div``;
const ArtistSection = styled.div``;
const ArtistName = styled.div``;
const ArtistGenre = styled.div``;
const ArtistVideoSumnail = styled.img`
  width: 150px;
  height: 150px;
`;
const FestivalSection = styled.div``;
const PlayerModal = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  background: rgba(0, 0, 0, 0.6);
`;

export default withRouter(ArtistDetailContainer);
