import React, { useState, useEffect } from 'react';
import { Link, withRouter, useLocation, useHistory } from 'react-router-dom';
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
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(9);
  const [topButton, setTopButton] = useState(false);

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

  const handleScroll = () => {
    const offsetTop = window.pageYOffset;
    offsetTop > 500 ? setTopButton(true) : setTopButton(false);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
  });

  const topRef: React.RefObject<HTMLDivElement> = React.createRef();

  const handleScrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    console.log('🔥🔥🔥🔥 Artist List(queryState) useEffect 🔥🔥🔥🔥');
    query.set('offset', String(offset));
    query.set('limit', String(limit));
    queryString = query.toString();
    setInputQuery({
      genreId: query.get('genreId'),
      search: query.get('search'),
    });
    dispatch(getArtistListAsync.request(queryString));
  }, [queryString]);

  useEffect(() => {
    if (!genreCategory.data || !artistCategory.data) {
      console.log('🍗🍗🍗🍗 Category useEffect 🍗🍗🍗🍗');
      dispatch(getGenreCategoryAsync.request());
      dispatch(getArtistCategoryAsync.request());
    }
  }, []);

  const handleCategory = (key: string) => (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    e.target.value === 'all'
      ? query.delete(key)
      : query.set(key, e.target.value);
    history.push(`/artist/list?${query.toString()}`);
  };

  const handleInputSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputQuery((state) => ({
      ...state,
      search: e.target.value,
    }));
  };

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      history.push(`/artist/list?search=${inputQuery.search}`);
    }
  };

  const handleArtistListMore = () => {
    console.log('✅✅✅✅ Artist List More(queryState) useEffect ✅✅✅✅');
    setOffset((state) => state + 9);
    console.log(offset + 'test');
    query.set('offset', String(offset));
    query.set('limit', String(limit));
    queryString = query.toString();
    setInputQuery({
      genreId: query.get('genreId'),
      search: query.get('search'),
    });
    dispatch(getArtistListMoreAsync.request(queryString));
  };

  return (
    <>
      <ListPresenter ref={topRef}>
        {topButton && (
          <TopButton topButton={topButton} onClick={handleScrollUp}>
            1231312
          </TopButton>
        )}
        <ArtistCategory>
          {artistCategory.data &&
            artistCategory.data.map((item) => (
              <Link key={`${item._id}`} to={`/artist/detail/${item._id}`}>
                <ArtistCategorylName>{item.name}</ArtistCategorylName>
              </Link>
            ))}
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
          <SearchBar
            type={'text'}
            value={inputQuery.search ? inputQuery.search : ''}
            onChange={handleInputSearch}
            onKeyPress={handleSearch}
          ></SearchBar>
          <ArtistSection>
            {loading && <p style={{ textAlign: 'center' }}>Loading...</p>}
            {error && <p style={{ textAlign: 'center' }}>Error!!!</p>}
            {artistList.data &&
              artistList.data.map((item) => (
                <Link key={item._id} to={`/Artist/detail/${item._id}`}>
                  <ArtistName>{item.name}</ArtistName>
                  <ArtistPoset src={item.poster} />
                </Link>
              ))}
            {!(offset + 9 > artistList.data.length) && (
              <button onClick={handleArtistListMore}>더 보기</button>
            )}
          </ArtistSection>
        </ContentsSection>
      </ListPresenter>
    </>
  );
};

const ListPresenter = styled.div`
  display: flex;
  /* justify-content: center; */
  /* align-items:center; */
  /* flex-direction:column; */
`;

const TopButton = styled.div<{ topButton: boolean }>`
  position: fixed;
  top: 80%;
  left: 80%;
  background-color: blue;
  opacity: ${(props) => (props.topButton ? 1 : 0)};
  transition: all 0.4s ease-in-out;
`;

const ArtistCategory = styled.div`
  display: flex;
  /* justify-content: center; */
  /* align-items:center; */
  flex-direction: column;
`;

const ArtistCategorylName = styled.div``;

const ContentsSection = styled.div`
  display: flex;
  justify-content: center;
  /* align-items:center; */
  flex-direction: column;
`;

const CategorySection = styled.div`
  display: flex;
  justify-self: flex-end;
  /* justify-content:center; */
  align-items: center;
  /* flex-direction:column; */
`;

const CountryCategory = styled.select``;
const CountryCategoryContent = styled.option``;
const GerneCategory = styled.select``;
const GerneCategoryContent = styled.option``;

const SearchBar = styled.input``;

const ArtistSection = styled.div``;
const ArtistName = styled.div``;
const ArtistPoset = styled.img``;

export default withRouter(ArtistListContainer);
