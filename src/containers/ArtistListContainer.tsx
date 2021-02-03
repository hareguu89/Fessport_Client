import React, { useState, useEffect } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import styled from 'styled-components';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../modules';
import { getArtistListAsync, getArtistListMoreAsync } from '../modules/artist';
import {
  getGenreCategoryAsync,
  getArtistCategoryAsync,
} from '../modules/category';

interface IInputQuery {
  genreId: string | null;
  search: string | null;
}

const ArtistListContainer = (): JSX.Element => {
  const history = useHistory();
  const search = useLocation().search;
  const query = new URLSearchParams(search);
  let queryString = query.toString();

  const LIMIT = 9;

  const [listNumber, setListNumber] = useState(10);
  const [offset, setOffset] = useState(0);
  const [inputQuery, setInputQuery] = useState<IInputQuery>({
    genreId: query.get('genreId'),
    search: query.get('search'),
  });

  const {
    artistList,
    genreCategory,
    artistCategory,
    loading,
    error,
  } = useSelector((state: RootState) => ({
    artistList: state.artist.artistList,
    genreCategory: state.category.genre,
    artistCategory: state.category.artist,
    loading: state.artist.artistList.loading,
    error: state.artist.artistList.error,
  }));
  const dispatch = useDispatch();

  useEffect(() => {
    if (!genreCategory.data || !artistCategory.data) {
      console.log('🍗🍗🍗🍗 Category useEffect 🍗🍗🍗🍗');
      dispatch(getGenreCategoryAsync.request());
      dispatch(getArtistCategoryAsync.request());
    }
  }, []);

  useEffect(() => {
    console.log('🔥🔥🔥🔥 Artist List(queryState) useEffect 🔥🔥🔥🔥');
    query.set('offset', String(0));
    query.set('limit', String(LIMIT));
    queryString = query.toString();
    setInputQuery({
      genreId: query.get('genreId'),
      search: query.get('search'),
    });
    dispatch(getArtistListAsync.request(queryString));
  }, [queryString]);

  useEffect(() => {
    setOffset(artistList.data.length);
  }, [artistList.data]);

  const handleArtistListMore = () => {
    console.log('✅✅✅✅ Artist List More(queryState) useEffect ✅✅✅✅');
    query.set('offset', String(offset));
    query.set('limit', String(LIMIT));
    queryString = query.toString();
    dispatch(getArtistListMoreAsync.request(queryString));
  };

  const handleCategory = (key: string) => (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    e.target.value === 'all'
      ? query.delete(key)
      : query.set(key, e.target.value);
    history.push(`/artist/list?${query.toString()}`);
  };

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      history.push(`/artist/list?search=${inputQuery.search}`);
    }
  };

  const handleInputSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputQuery((state) => ({
      ...state,
      search: e.target.value,
    }));
  };

  return (
    <>
      <BackgorundImage />

      <ListPresenter>
        <ArtistCategory>
          <ArtistCategoryHead> Artist List </ArtistCategoryHead>
          <SearchBar
            type={'text'}
            value={inputQuery.search ? inputQuery.search : ''}
            placeholder="TYPE TO SEARCH"
            onChange={handleInputSearch}
            onKeyPress={handleSearch}
          ></SearchBar>
          {artistCategory.data &&
            artistCategory.data
              .filter((item, index) => index < listNumber)
              .map((item) => (
                <Link key={`C${item._id}`} to={`/festival/detail/${item._id}`}>
                  <ArtistCategorylContetn>{item.name}</ArtistCategorylContetn>
                </Link>
              ))}
          {artistCategory.data && artistCategory.data.length > listNumber && (
            <MoreButton
              onClick={() => {
                setListNumber((state) => state + 10);
              }}
            >
              <MoreButtonText>More...</MoreButtonText>
            </MoreButton>
          )}
        </ArtistCategory>
        <ContentsSection>
          <CategorySection>
            <GerneCategory
              value={inputQuery.genreId ? inputQuery.genreId : 'all'}
              onChange={handleCategory('genreId')}
            >
              <GerneCategoryContent key={`allGerne`} value={`all`}>
                All Genre Catagory
              </GerneCategoryContent>
              {genreCategory.data &&
                genreCategory.data.map((item) => (
                  <GerneCategoryContent key={item._id} value={item._id}>
                    {item.name}
                  </GerneCategoryContent>
                ))}
            </GerneCategory>
          </CategorySection>
          <ArtistSection>
            {artistList.data &&
              artistList.data.map((item) => (
                <ArtistLink key={item._id} to={`/artist/detail/${item._id}`}>
                  <ArtistContent className="festivalContent">
                    <ArtistName>{item.name}</ArtistName>
                  </ArtistContent>
                  <ArtistImage src={item.image} />
                </ArtistLink>
              ))}
          </ArtistSection>
          {artistList.data[0] &&
            artistList.data.length < artistList.data[0].total && (
              <MoreButton onClick={handleArtistListMore}>
                <MoreButtonText>More...</MoreButtonText>
              </MoreButton>
            )}
        </ContentsSection>
      </ListPresenter>
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
    url('/images/wall3.jpg');
  background-size: 3px 3px, auto;
  z-index: -1;
`;

const ListPresenter = styled.div`
  display: flex;
  margin-top: 5%;
  margin-left: 10%;
  margin-right: 10%;
`;

const ArtistCategory = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;
  background-color: rgba(0, 0, 0, 0.5);

  @media only screen and (max-width: 960px) {
    display: none;
  }
`;

const ArtistCategoryHead = styled.div`
  padding: 20px;
  font-size: 1.5rem;
  font-weight: 500;
`;

const SearchBar = styled.input`
  margin-top: 5%;
  margin-bottom: 5%;
  padding: 15px;
  padding-left: 20px;
  color: white;
  border-bottom: 1px solid gray;
  background: transparent;
  &:hover {
    outline: 1px solid white;
  }
  &:focus {
    color: black;
    background: white;
  }
`;

const ArtistCategorylContetn = styled.div`
  padding: 10px;
  padding-left: 20px;
  color: rgba(200, 200, 200);
  border-bottom: 1px solid rgba(170, 170, 170, 0.3);
  &:hover {
    color: white;
    background: rgba(170, 170, 170, 0.3);
  }
`;

const ContentsSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  margin-left: 5%;

  @media only screen and (max-width: 960px) {
    width: 100%;
    margin: 0%;
  }
`;

const CategorySection = styled.div`
  display: flex;
  align-self: flex-end;
`;

const GerneCategory = styled.select`
  padding: 15px;
  color: white;
  border: none;
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.5);
`;

const GerneCategoryContent = styled.option``;

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
    .festivalContent {
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
  height: 100%;
`;

const MoreButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50px;
  margin-top: 30px;
  margin-bottom: 30px;
  color: white;
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.8);
  cursor: pointer;
  &:hover {
    background-color: rgba(170, 170, 170, 0.4);
  }
`;

const MoreButtonText = styled.div``;

export default ArtistListContainer;
