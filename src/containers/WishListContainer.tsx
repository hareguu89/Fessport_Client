import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../modules';
import { getWishListAsync } from '../modules/wish';

const WishListContainer = (): JSX.Element => {
  const { data, loading, error } = useSelector((state: RootState) => ({
    data: state.wish.data,
    loading: state.wish.loading,
    error: state.wish.error,
  }));
  const dispatch = useDispatch();

  useEffect(() => {
    if (!data) {
      console.log('🐶🐶🐶🐶 WishList useEffect 🐶🐶🐶🐶');
      dispatch(getWishListAsync.request());
    }
  }, [data]);

  return (
    <>
      <BackgorundImage />
      {data && (
        <WishListPresenter>
          <WishSection>
            <WishSectionHead> Festival Wish List </WishSectionHead>
            {data.wishFestivals && data.wishFestivals.length === 0 ? (
              <EmptyMessage>찜해둔 페스티벌이 없습니다.</EmptyMessage>
            ) : (
              <FestivalSection>
                {data.wishFestivals &&
                  data.wishFestivals.map((item) => (
                    <FestivalLink
                      key={item._id}
                      to={`/festival/detail/${item._id}`}
                    >
                      <FestivalContent className="festivalContent">
                        <FestivalName>{item.name}</FestivalName>
                      </FestivalContent>
                      <FestivalImage src={item.poster} />
                    </FestivalLink>
                  ))}
              </FestivalSection>
            )}
          </WishSection>
          <WishSection>
            <WishSectionHead> Artist Wish List </WishSectionHead>
            {data.wishArtists && data.wishArtists.length === 0 ? (
              <EmptyMessage>찜해둔 아티스트가 없습니다.</EmptyMessage>
            ) : (
              <ArtistSection>
                {data.wishArtists &&
                  data.wishArtists.map((item) => (
                    <ArtistLink
                      key={item._id}
                      to={`/artist/detail/${item._id}`}
                    >
                      <ArtistContent className="artistContent">
                        <ArtistName>{item.name}</ArtistName>
                      </ArtistContent>
                      <ArtistImage src={item.image} />
                    </ArtistLink>
                  ))}
              </ArtistSection>
            )}
          </WishSection>
        </WishListPresenter>
      )}
    </>
  );
};

const BackgorundImage = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 100vh;
  opacity: 0.3;
  background: radial-gradient(black 35%, transparent 1%),
    url('/images/wall2.jpg');
  background-size: 3px 3px, auto;
  z-index: -1;
`;

const WishListPresenter = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1%;
  margin-left: 10%;
  margin-right: 10%;
`;

const EmptyMessage = styled.div`
  margin-top: 5%;
  font-size: 1.5rem;
  font-weight: 600;
`;

const WishSection = styled.div`
  width: 50%;
  padding: 2%;
  margin-right: 50px;
  background-color: rgba(0, 0, 0, 0.5);
`;

const WishSectionHead = styled.div`
  font-size: 2rem;
  font-weight: 500;
`;

const FestivalSection = styled.div`
  display: grid;
  margin-top: 5%;
  gap: 30px;
  grid-template-columns: repeat(3, minmax(150px, auto));
`;

const FestivalLink = styled(Link)`
  position: relative;
  width: 100%;
  &:hover {
    .festivalContent {
      background: rgba(170, 170, 170, 0.8);
    }
  }
`;

const FestivalContent = styled.div`
  position: absolute;
  top: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 20%;
  background-color: rgba(0, 0, 0, 0.8);
`;

const FestivalName = styled.div``;

const FestivalImage = styled.img`
  width: 100%;
`;

const ArtistSection = styled.div`
  display: grid;
  margin-top: 5%;
  gap: 30px;
  grid-template-columns: repeat(3, minmax(150px, auto));
`;

const ArtistLink = styled(Link)`
  position: relative;
  width: 100%;
  &:hover {
    .artistContent {
      background: rgba(170, 170, 170, 0.8);
    }
  }
`;

const ArtistContent = styled.div`
  position: absolute;
  top: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 20%;
  background-color: rgba(0, 0, 0, 0.8);
`;

const ArtistName = styled.div``;

const ArtistImage = styled.img`
  width: 100%;
`;

export default WishListContainer;
