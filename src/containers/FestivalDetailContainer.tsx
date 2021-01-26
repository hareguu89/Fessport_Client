import React, { useState, useEffect } from 'react';
import { Link, withRouter, useParams, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import ReactPlayer from 'react-player';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../modules';
import { getFestivalDetailAsync } from '../modules/festival';

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

  return (
    <>
      {loading && <p style={{ textAlign: 'center' }}>Loading...</p>}
      {error && <p style={{ textAlign: 'center' }}>Error!!!</p>}
      {data && (
        <>
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
          <DetailPresenter>
            <PosterSection>
              <PoseterImage src={data.poster} />
              <VisitButton visited={data.visited}></VisitButton>
              <WishButton isLiked={data.isLiked}></WishButton>
            </PosterSection>

            <ContentSection>
              <FesttivalSection>
                <FestivalName>{data.name}</FestivalName>
                <FestivalCountry>{data.country.name}</FestivalCountry>
                <FestivalGenre>{data.genre.name}</FestivalGenre>
                <FestivalDate>
                  {data.startDate} ~ {data.endDate}
                </FestivalDate>
                <FetivalHomepage>{data.homepage}</FetivalHomepage>
                <FetivalVideoSumnail
                  src={`https://img.youtube.com/vi/${data.video}/hqdefault.jpg`}
                  onClick={handleModal}
                />
              </FesttivalSection>

              <ArtistSection>
                {data.artists
                  .filter((item, index) => index > 5 && index < 10)
                  .map((item) => (
                    <ArtistContent
                      to={`/artist/detail/${item._id}`}
                      key={`A${item._id}`}
                    >
                      <ArtistImage src={item.image} />
                      <ArtistName>{item.name}</ArtistName>
                    </ArtistContent>
                  ))}
              </ArtistSection>

              <CompanionSection>
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
        </>
      )}
    </>
  );
};

const DetailPresenter = styled.div``;
const PosterSection = styled.div``;
const PoseterImage = styled.img`
  width: 300px;
  height: 500px;
`;
const VisitButton = styled.div<{ visited: boolean }>``;
const WishButton = styled.div<{ isLiked: boolean }>``;
const ContentSection = styled.div``;
const FesttivalSection = styled.div``;
const FestivalName = styled.div``;
const FestivalCountry = styled.div``;
const FestivalGenre = styled.div``;
const FestivalDate = styled.div``;
const FetivalHomepage = styled.div``;
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
