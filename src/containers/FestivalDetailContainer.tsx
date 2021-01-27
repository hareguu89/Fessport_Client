import React, { useState, useEffect } from 'react';
import { Link, withRouter, useParams, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import ReactPlayer from 'react-player';
import SimpleSlider from '../components/Slider';
import Slider from 'react-slick';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../modules';
import {
  getFestivalDetailAsync,
  postVisitedFestivalAsync,
  postUnvisitedFestivalAsync,
  postLikeFestivalAsync,
  postDislikeFestivalAsync,
} from '../modules/festival';

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  arrows: true,
  slidesToShow: 2,
  slidesToScroll: 1,
};

const FestivalDetailContainer = (): JSX.Element => {
  const history = useHistory();
  const params = useParams<{ _id: string }>();
  const [isModal, setIsModal] = useState(false);
  const { data, loading, error } = useSelector(
    (state: RootState) => state.festival.festivalDetail,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('🍗🍗🍗🍗 Festival Detail useEffect 🍗🍗🍗🍗');
    dispatch(getFestivalDetailAsync.request(params._id));
  }, []);

  const handleModal = () => {
    setIsModal(!isModal);
  };

  const handleVisitButton = () => {
    if (data && data.visited) {
      dispatch(postUnvisitedFestivalAsync.request(params._id));
    } else {
      dispatch(postVisitedFestivalAsync.request(params._id));
    }
  };

  const handleLikeButton = () => {
    if (data && data.isLiked) {
      dispatch(postDislikeFestivalAsync.request(params._id));
    } else if (data && !data.isLiked) {
      dispatch(postLikeFestivalAsync.request(params._id));
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
              <PoseterImage src={data.poster} />
              <VisitButton visited={data.visited} onClick={handleVisitButton}>
                visitttt
              </VisitButton>
              <WishButton isLiked={data.isLiked} onClick={handleLikeButton}>
                wishhhhhh
              </WishButton>
            </PosterSection>

            <ContentSection>
              <FesttivalSection>
                <FestivalName>{data.name}</FestivalName>
                <FestivalCountry>{data.country.name}</FestivalCountry>
                <FestivalGenre>{data.genre.name}</FestivalGenre>
                <FestivalDate>
                  {data.startDate} ~ {data.endDate}
                </FestivalDate>
                <FetivalHomepage href={data.homepage} target="_blank">
                  {data.homepage}
                </FetivalHomepage>
                <FetivalVideoSumnail
                  src={`https://img.youtube.com/vi/${data.video}/hqdefault.jpg`}
                  onClick={handleModal}
                />
              </FesttivalSection>

              <ArtistSection>
                <SimpleSlider artists={data.artists} />
                {/* <Container>
                  <h2> artist</h2>
                  <StyledSlider {...settings}>
                    {data.artists.map((item) => {
                      return (
                        <ImageContainer key={item._id}>
                          <Link to={`/artist/detail/${item._id}`}>
                            <Image src={item.image} />
                          </Link>
                          <div>{item.name}</div>
                        </ImageContainer>
                      );
                    })}
                  </StyledSlider>
                </Container> */}
              </ArtistSection>

              <CompanionSection>
                <h2> CompanionSection</h2>
                {data.companions.map((item) => (
                  <CompanionContent
                    to={`/community/copanions/${item._id}`}
                    key={`C${item._id}`}
                  >
                    <CompanionTitle>{item.title}</CompanionTitle>
                  </CompanionContent>
                ))}
              </CompanionSection>

              <ResellSection>
                <h2> ResellSection</h2>
                {data.resells.map((item) => (
                  <ResellContent
                    to={`/community/resell/${item._id}`}
                    key={`R${item._id}`}
                  >
                    <ResellTitle>{item.title}</ResellTitle>
                  </ResellContent>
                ))}
              </ResellSection>

              <ReviewSection>
                <h2> ReviewSection</h2>
                {data.reviews.map((item) => (
                  <ReviewContent
                    to={`/community/review/${item._id}`}
                    key={`V${item._id}`}
                  >
                    <ReviewImage src={item.image} />
                  </ReviewContent>
                ))}
              </ReviewSection>
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
const VisitButton = styled.div<{ visited: boolean }>`
  width: 100px;
  height: 100px;
  background: ${(props) => (props.visited ? 'blue' : 'red')};
`;
const WishButton = styled.div<{ isLiked: boolean }>`
  width: 100px;
  height: 100px;
  background: ${(props) => (props.isLiked ? 'blue' : 'red')};
`;
const ContentSection = styled.div``;
const FesttivalSection = styled.div``;
const FestivalName = styled.div``;
const FestivalCountry = styled.div``;
const FestivalGenre = styled.div``;
const FestivalDate = styled.div``;
const FetivalHomepage = styled.a``;
const FetivalVideoSumnail = styled.img`
  width: 150px;
  height: 150px;
`;
const ArtistSection = styled.div``;
const ArtistContent = styled(Link)``;
const ArtistImage = styled.img`
  width: 150px;
  height: 150px;
`;
const ArtistName = styled.div``;
const CompanionSection = styled.div``;
const CompanionContent = styled(Link)``;
const CompanionTitle = styled.div``;
const ReviewSection = styled.div``;
const ReviewContent = styled(Link)``;
const ReviewImage = styled.img`
  width: 50px;
  height: 50px;
`;
const ResellSection = styled.div``;
const ResellContent = styled(Link)``;
const ResellTitle = styled.div``;

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

export default withRouter(FestivalDetailContainer);
