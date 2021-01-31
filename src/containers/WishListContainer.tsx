import React, { useState, useEffect } from 'react';
import { Link, withRouter, useLocation, useHistory } from 'react-router-dom';
import UserInfo from '../components/UserInfo';
import styled from 'styled-components';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../modules';
import { getWishListAsync } from '../modules/wish';

const WishListContainer = (): JSX.Element => {
  const { data, loading, error } = useSelector(
    (state: RootState) => state.wish,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (!data) {
      console.log(111);
      dispatch(getWishListAsync.request());
    }
  }, [data]);

  return (
    <>
      {data && (
        <WishListPresenter>
          <FestivalCategory>
            <FestivalCategoryHead> Festival Wish List </FestivalCategoryHead>
            <FestivalSection>
              {data.wishfestivals &&
                data.wishfestivals.map((item) => (
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
          </FestivalCategory>
          <FestivalCategory>
            <FestivalCategoryHead> Artist Wish List </FestivalCategoryHead>
            <ArtistSection>
              {data.wishArtist &&
                data.wishArtist.map((item) => (
                  <ArtistLink key={item._id} to={`/artist/detail/${item._id}`}>
                    <ArtistContent className="artistContent">
                      <ArtistName>{item.name}</ArtistName>
                    </ArtistContent>
                    <ArtistImage src={item.image} />
                  </ArtistLink>
                ))}
            </ArtistSection>
          </FestivalCategory>
          <Tess />
        </WishListPresenter>
      )}
    </>
  );
};

const WishListPresenter = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1%;
  margin-left: 10%;
  margin-right: 10%;
`;

const FestivalCategory = styled.div`
  padding: 2%;
  margin-right: 50px;
  background-color: rgba(0, 0, 0, 0.5);
`;

const FestivalCategoryHead = styled.div`
  font-size: 2rem;
  font-weight: 500;
`;

const FestivalSection = styled.div`
  display: grid;
  margin-top: 5%;
  gap: 30px;
  grid-template-columns: repeat(3, minmax(150px, auto));
  /* grid-template-rows: repeat(1, minmax(150px, auto)); */
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
const FestivalImage = styled.img`
  width: 100%;
  /* z-index: 99; */
`;

const ArtistSection = styled.div`
  display: grid;
  margin-top: 5%;
  gap: 30px;
  grid-template-columns: repeat(3, minmax(150px, auto));
  /* grid-template-rows: repeat(1, minmax(150px, auto)); */
`;

const Tess = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 100vh;
  z-index: -1;
  opacity: 0.3;
  background: radial-gradient(black 35%, transparent 1%),
    url('/images/wall.jpg');
  background-size: 3px 3px, contain;
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
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 20%;
  background-color: rgba(0, 0, 0, 0.8);
  top: 80%;
  /* z-index: 100; */
`;

const ArtistName = styled.div``;
const ArtistImage = styled.img`
  width: 100%;
  /* z-index: 99; */
`;

export default WishListContainer;
