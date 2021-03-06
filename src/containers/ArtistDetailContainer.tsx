import React, { useState, useEffect, useRef } from 'react';

import styled from 'styled-components';
import ReactPlayer from 'react-player';
import Slider from 'react-slick';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../modules';
import {
  getArtistDetailAsync,
  postLikeArtistAsync,
  postDislikeArtistAsync,
} from '../modules/artist';
import { Link, withRouter, useParams, useHistory } from 'react-router-dom';
const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  arrows: true,
  slidesToShow: 3,
  slidesToScroll: 1,
};

const ArtistDetailContainer = (): JSX.Element => {
  const history = useHistory();
  const params = useParams<{ _id: string }>();
  const { data, loading, error } = useSelector(
    (state: RootState) => state.artist.artistDetail,
  );
  const dispatch = useDispatch();

  const handleModal = (video: string) => (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    setNowVideo(video);
    setIsModal(!isModal);
  };

  const handleLikeButton = () => {
    if (data && data.isLiked) {
      dispatch(postDislikeArtistAsync.request(params._id));
    } else if (data && !data.isLiked) {
      dispatch(postLikeArtistAsync.request(params._id));
    }
  };

  useEffect(() => {
    console.log(111);
    dispatch(getArtistDetailAsync.request(params._id));
  }, []);

  const TOTAL_SLIDES = 2;

  const [currentSlide, setCurrentSlide] = useState(0);

  const slideRef: React.RefObject<HTMLDivElement> = React.createRef();

  useEffect(() => {
    if (slideRef.current) {
      slideRef.current.style.transition = 'all 0.5s ease-in-out';
      slideRef.current.style.transform = `translateX(-${currentSlide}00%)`;
    }
  }, [currentSlide]);

  const [isModal, setIsModal] = useState(false);
  const [nowVideo, setNowVideo] = useState('');

  const nextSlide = () => {
    if (currentSlide >= TOTAL_SLIDES) {
      setCurrentSlide(0);
    } else {
      setCurrentSlide(currentSlide + 1);
    }
  };
  const prevSlide = () => {
    if (currentSlide === 0) {
      setCurrentSlide(TOTAL_SLIDES);
    } else {
      setCurrentSlide(currentSlide - 1);
    }
  };

  return (
    <>
      {data && (
        <>
          <DetailPresenter>
            <PosterSection>
              <PoseterImage src={data.image} />
            </PosterSection>

            <Temp>
              <NameBox>
                <ArtistName>{data.name}</ArtistName>
                <ButtonBox>
                  <WishButton onClick={handleLikeButton}>
                    <WishText
                      isLiked={data.isLiked}
                      className="fas fa-heart"
                    ></WishText>
                  </WishButton>
                </ButtonBox>
              </NameBox>
              <ArtistGenre>
                {/* <i className="fas fa-music" /> */}
                Genre : {data.genre.name}
              </ArtistGenre>

              <ArtistDate>
                {/* <i className="fas fa-calendar-alt" /> */}
                Description
                <Description>{data.description}</Description>
              </ArtistDate>
              <VideoBox>
                <VideoTitle> Video </VideoTitle>
                <StyledSlider {...settings}>
                  {data.video.map((item, index) => {
                    return (
                      <VideoLink key={index}>
                        <VideoContent
                          onClick={handleModal(data.video[index])}
                          className="videoContent"
                        >
                          <PlayIcon className="far fa-2x fa-play-circle" />
                        </VideoContent>
                        <VideoImage
                          src={`https://img.youtube.com/vi/${data.video[index]}/hqdefault.jpg`}
                        />
                      </VideoLink>
                    );
                  })}
                </StyledSlider>
              </VideoBox>
              <Exit />
              <ArtistSection>
                {/* <Container>
                  {currentSlide}
                  <SliderContainer ref={slideRef}>
                    {data.artists.map((item) => {
                      return (
                        <Link key={item._id} to={`/artist/detail/${item._id}`}>
                          <ImageContainer>
                            <Image src={item.image} />
                            <div>{item.name}</div>
                          </ImageContainer>
                        </Link>
                      );
                    })}
                  </SliderContainer>
                  <Button onClick={prevSlide}>Previous Slide</Button>
                  <Button onClick={nextSlide}>Next Slide</Button>
                </Container> */}

                <ArtistBox>
                  <ArtistTitle> Festival </ArtistTitle>
                  <StyledSlider {...settings}>
                    {data.festivals.map((item) => {
                      return (
                        <ArtistLink
                          key={item._id}
                          to={`/festival/detail/${item._id}`}
                        >
                          <ArtistContent className="artistContent">
                            <FestivalName>{item.name}</FestivalName>
                          </ArtistContent>
                          <ArtistImage src={item.poster} />
                        </ArtistLink>
                      );
                    })}
                  </StyledSlider>
                </ArtistBox>
              </ArtistSection>
            </Temp>
          </DetailPresenter>
          {isModal && (
            <PlayerModal onClick={handleModal('')}>
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
                url={`https://youtu.be/${nowVideo}`}
              />
            </PlayerModal>
          )}
        </>
      )}
    </>
  );
};

const DetailPresenter = styled.div`
  display: flex;
  margin-top: 5%;
  margin-left: 10%;
  margin-right: 10%;
  margin-bottom: 5%;
`;

const Description = styled.div`
  margin-top: 10px;
  line-height: 150%;
`;

const PosterSection = styled.div`
  width: 50%;
`;
const PoseterImage = styled.img`
  width: 100%;
`;

const Temp = styled.div`
  margin-left: 5%;
  width: 50%;
  padding: 10px;
  background-color: rgba(0, 0, 0, 0.3);
`;
const FesttivalSection = styled.div``;

const NameBox = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const ButtonBox = styled.div`
  display: flex;
`;

const ArtistName = styled.div`
  font-size: 2rem;
  font-weight: 500;
  align-self: center;
  padding-left: 10px;
`;

const VisitButton = styled.div`
  display: flex;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 30px;
  background: rgba(0, 0, 0, 0.8);
  margin-right: 10px;
  &:hover {
    background: rgba(170, 170, 170, 0.2);
  }
  cursor: pointer;
`;

const VisitText = styled.i<{ visited: boolean }>`
  align-self: center;
  color: ${(props) =>
    props.visited ? 'rgba(0,255,255,1)' : 'rgba(200, 200, 200, 1)'};
`;

const WishButton = styled.div`
  display: flex;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 30px;
  background: rgba(0, 0, 0, 0.8);
  &:hover {
    background: rgba(170, 170, 170, 0.2);
  }
  cursor: pointer;
`;

const WishText = styled.i<{ isLiked: boolean }>`
  align-self: center;
  color: ${(props) =>
    props.isLiked ? 'rgba(255,0,0,1)' : 'rgba(200, 200, 200, 1)'};
`;

const Exit = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 100vh;
  z-index: -1;
  opacity: 0.3;
  background: radial-gradient(black 35%, transparent 1%),
    url('/images/wall3.jpg');
  background-size: 3px 3px, contain;
`;

const ArtistCountry = styled.div`
  margin-top: 10px;
  font-size: 1.2rem;
  padding: 5px;
  padding-left: 10px;
  border-bottom: 1px solid rgba(170, 170, 170, 0.8);
`;
const ArtistGenre = styled.div`
  margin-top: 10px;
  font-size: 1.2rem;
  padding: 10px;
  border-bottom: 1px solid rgba(170, 170, 170, 0.8);
`;

const ArtistDate = styled.div`
  margin-top: 10px;
  font-size: 1.2rem;
  padding: 10px;
  border-bottom: 1px solid rgba(170, 170, 170, 0.8);
`;

const FetivalHomepage = styled.div`
  margin-top: 10px;
  font-size: 1.2rem;
  padding: 10px;
  border-bottom: 1px solid rgba(170, 170, 170, 0.8);
`;

const FetivalVideoSumnail = styled.img`
  width: 150px;
  height: 150px;
`;
const ArtistSection = styled.div``;

const CompanionSection = styled.div``;
const CompanionContent = styled(Link)`
  display: flex;
  margin-bottom: 10px;
  border-bottom: 1px solid rgba(170, 170, 170, 0.4);
  &:hover {
    border-bottom: 1px solid rgba(170, 170, 170, 1);
  }
`;

const CompanionTitle = styled.div`
  margin-top: 10px;
  font-size: 1rem;
  padding: 10px;
`;

const CompanionWriter = styled.div`
  margin-top: 10px;
  font-size: 1rem;
  padding: 10px;
  color: rgba(170, 170, 170);
`;

const ReviewSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-content: center;
`;

const ReviewContent = styled(Link)``;

const ReviewImage = styled.img`
  /* object-fit: contain; */
  padding: 10px;
  width: 100%;
  height: 100%;
  opacity: 0.7;
  /* height: 150px; */
  &:hover {
    opacity: 1;
  }
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
  z-index: 100;
  background: rgba(0, 0, 0, 0.6);
`;

const Container = styled.div`
  /* overflow: hidden; */

  width: 100%;
`;

const VideoBox = styled.div`
  /* overflow: hidden; */
  padding: 10px;
  width: 100%;
  border-bottom: 1px solid rgba(170, 170, 170, 0.8);
`;

const TempBox = styled.div`
  /* overflow: hidden; */
  padding: 10px;
  width: 100%;
  padding-bottom: 15px;
  border-bottom: 1px solid rgba(170, 170, 170, 0.8);
`;

const VideoTitle = styled.div`
  margin-top: 10px;
  margin-bottom: 15px;
  font-size: 1.2rem;
  font-weight: 600;
`;

const TempTitle = styled.div`
  margin-top: 10px;
  margin-bottom: 15px;
  font-size: 1.2rem;
  font-weight: 600;
`;

const VideoLink = styled.span`
  position: relative;
  width: 100%;
  height: 150px;
  cursor: pointer;
  &:hover {
    .fa-play-circle {
      color: white;
    }
  }
`;

const VideoImage = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
  /* z-index: 99; */
`;

const PlayIcon = styled.i`
  color: rgba(170, 170, 170, 1);
`;

const VideoContent = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  /* top: 80%; */
  /* z-index: 100; */
`;

const ArtistBox = styled.div`
  /* overflow: hidden; */
  padding: 10px;
  width: 100%;
  border-bottom: 1px solid rgba(170, 170, 170, 0.8);
`;

const ArtistTitle = styled.div`
  margin-top: 10px;
  margin-bottom: 15px;
  font-size: 1.2rem;
  font-weight: 600;
`;

const ArtistLink = styled(Link)`
  position: relative;
  width: 100%;
  height: 150px;
  &:hover {
    .artistContent {
      background: rgba(170, 170, 170, 0.8);
    }
  }
`;

const ArtistContent = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 20%;
  background-color: rgba(0, 0, 0, 0.8);
  top: 80%;
  /* z-index: 100; */
`;

const FestivalName = styled.div``;

const ArtistImage = styled.img`
  /* object-fit: cover; */
  width: 100%;
  height: 100%;
  /* z-index: 99; */
`;

// const Temp = styled.img`
//   width: 30%;
//   height: 30%;
//   margin-left: 10px;
// `;

// const Button = styled.button`
//   all: unset;
//   border: 1px solid coral;
//   padding: 0.5em 2em;
//   color: coral;
//   border-radius: 10px;
//   &:hover {
//     transition: all 0.3s ease-in-out;
//     background-color: coral;
//     color: #fff;
//   }
// `;

// const Container = styled.div`
//   width: 100%;
//   overflow: hidden;
// `;

// const SliderContainer = styled.div`
//   /* margin-left: 10px; */
//   width: 100%;
//   display: grid;
//   gap: 25px;
//   grid-template-columns: repeat(10, minmax(200px, auto));
//   grid-template-rows: repeat(1, minmax(150px, auto));
// `;

const ImageContainer = styled.div`
  width: 100%;
  /* height: 120px; */
  /* margin-left: 5%;
  margin-right: 5%; */
`;

const Image = styled.img`
  width: 100%;
  /* height: 100%; */
`;

const StyledSlider = styled(Slider)`
  .slick-list {
    margin-left: 15px;
    margin-right: 15px;
    /* pointer-events: none; */
  }

  .slick-slide div {
    /* margin-left: 5px;
    margin-right: 5px; */
    padding: 0 10px;
  }

  /* .slick-slide img {
    margin-left: 15px;
    margin-right: 15px;
  } */

  .slick-prev {
    left: 0px !important;
    z-index: 1;
    opacity: 0.8;
    /* position: absolute;
    padding-left: 20px;
    margin-left: 20px; */
  }
  .slick-next {
    right: 0px !important;
    z-index: 1;
    opacity: 0.8;
    /* margin-right: 20px; */
  }
`;

export default withRouter(ArtistDetailContainer);
