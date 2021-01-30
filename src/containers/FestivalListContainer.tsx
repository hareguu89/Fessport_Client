import React, { useState, useEffect, useRef } from 'react';
import { Link, withRouter, useLocation, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Loader from '../pages/Loader';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../modules';
import {
  getFestivalListAsync,
  getFestivalListMoreAsync,
} from '../modules/festival';
import {
  getFestivalCategoryAsync,
  getCountryCategoryAsync,
  getGenreCategoryAsync,
} from '../modules/category';

interface IInputQuery {
  countryId: string | null;
  genreId: string | null;
  search: string | null;
}

const FestivalListContainer = (): JSX.Element => {
  const history = useHistory();
  const search = useLocation().search;
  const query = new URLSearchParams(search);
  let queryString = query.toString();
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(9);
  const [topButton, setTopButton] = useState(false);

  const [inputQuery, setInputQuery] = useState<IInputQuery>({
    countryId: query.get('countryId'),
    genreId: query.get('genreId'),
    search: query.get('search'),
  });

  const {
    festivalList,
    countryCategory,
    genreCategory,
    festivalCategory,
    loading,
    error,
  } = useSelector((state: RootState) => ({
    festivalList: state.festival.festivalList,
    countryCategory: state.category.country,
    genreCategory: state.category.genre,
    festivalCategory: state.category.festival,
    loading: state.festival.festivalList.loading,
    error: state.festival.festivalList.error,
  }));
  const dispatch = useDispatch();

  const handleScroll = () => {
    const offsetTop = window.pageYOffset;
    offsetTop > 100 ? setTopButton(true) : setTopButton(false);
  };

  function debounce(callback: any, milliseconds: number) {
    let debounceCheck: any;
    return function () {
      clearTimeout(debounceCheck);
      debounceCheck = setTimeout(() => {
        callback();
      }, milliseconds);
    };
  }

  useEffect(() => {
    window.addEventListener('scroll', debounce(handleScroll, 500));
  });

  const handleScrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    console.log('🔥🔥🔥🔥 Festival List(queryState) useEffect 🔥🔥🔥🔥');
    query.set('offset', String(offset));
    query.set('limit', String(limit));
    queryString = query.toString();
    setInputQuery({
      countryId: query.get('countryId'),
      genreId: query.get('genreId'),
      search: query.get('search'),
    });
    dispatch(getFestivalListAsync.request(queryString));
    setOffset((state) => state + limit);
  }, [queryString]);

  useEffect(() => {
    if (
      !countryCategory.data ||
      !genreCategory.data ||
      !festivalCategory.data
    ) {
      console.log('🍗🍗🍗🍗 Category useEffect 🍗🍗🍗🍗');
      dispatch(getFestivalCategoryAsync.request());
      dispatch(getCountryCategoryAsync.request());
      dispatch(getGenreCategoryAsync.request());
    }
  }, []);

  const handleCategory = (key: string) => (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    e.target.value === 'all'
      ? query.delete(key)
      : query.set(key, e.target.value);
    history.push(`/festival/list?${query.toString()}`);
  };

  const handleInputSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputQuery((state) => ({
      ...state,
      search: e.target.value,
    }));
  };

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      history.push(`/festival/list?search=${inputQuery.search}`);
    }
  };

  const handleFestivalListMore = () => {
    console.log('✅✅✅✅ Festival List More(queryState) useEffect ✅✅✅✅');
    query.set('offset', String(offset));
    query.set('limit', String(limit));
    queryString = query.toString();
    dispatch(getFestivalListMoreAsync.request(queryString));
    setOffset((state) => state + limit);
  };

  return (
    <>
      <BackgorundImage />
      {loading && <Loader />}
      {error && <p style={{ textAlign: 'center' }}>Error!!!</p>}
      <ListPresenter>
        {/* {topButton && (
          <TopButton topButton={topButton} onClick={handleScrollUp} />
        )} */}
        <FestivalCategory>
          <FestivalCategoryHead> Festival List </FestivalCategoryHead>
          <SearchBar
            type={'text'}
            value={inputQuery.search ? inputQuery.search : ''}
            placeholder="TYPE TO SEARCH"
            onChange={handleInputSearch}
            onKeyPress={handleSearch}
          ></SearchBar>
          {festivalCategory.data &&
            festivalCategory.data.map((item) => (
              <Link key={`C${item._id}`} to={`/festival/detail/${item._id}`}>
                <FestivalCategoryContent>{item.name}</FestivalCategoryContent>
              </Link>
            ))}
        </FestivalCategory>
        <ContentsSection>
          <CategorySection>
            <CountryCategory
              value={inputQuery.countryId ? inputQuery.countryId : 'all'}
              onChange={handleCategory('countryId')}
            >
              <CountryCategoryContent key={`allCountry`} value={`all`}>
                All Country Catagory
              </CountryCategoryContent>
              {countryCategory.data &&
                countryCategory.data.map((item) => (
                  <CountryCategoryContent key={item._id} value={item._id}>
                    {item.name}
                  </CountryCategoryContent>
                ))}
            </CountryCategory>

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

          <FestivalSection>
            {festivalList.data &&
              festivalList.data.map((item) => (
                <FestivalLink
                  key={item._id}
                  to={`/festival/detail/${item._id}`}
                >
                  <FestivalContent className="festivalContent">
                    <FestivalName>{item.name}</FestivalName>
                  </FestivalContent>
                  <FestivalPoster src={item.poster} />
                </FestivalLink>
              ))}
            {offset <= festivalList.data.length && (
              <MoreButton onClick={handleFestivalListMore}>
                <div>More...</div>
              </MoreButton>
            )}
          </FestivalSection>
        </ContentsSection>
      </ListPresenter>
      {/* <BackgorundImage src="/images/dots.png" /> */}
    </>
  );
};

const BackgorundImage = styled.div`
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

const ListPresenter = styled.div`
  display: flex;
  margin-top: 5%;
  margin-left: 10%;
  margin-right: 10%;
  /* justify-content: center; */
  /* align-items: center; */
  /* flex-direction:column; */
`;

const FestivalCategory = styled.div`
  display: flex;
  /* justify-content: center; */
  /* align-items:center; */
  flex-direction: column;
  width: 30%;
  background-color: rgba(0, 0, 0, 0.5);
`;

const FestivalCategoryHead = styled.div`
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

const FestivalCategoryContent = styled.div`
  color: rgba(200, 200, 200);
  border-bottom: 1px solid rgba(170, 170, 170, 0.3);
  padding: 10px;
  padding-left: 20px;
  &:hover {
    color: white;
    background: rgba(170, 170, 170, 0.3);
  }
`;

const ContentsSection = styled.div`
  display: flex;
  justify-content: center;
  /* align-items:center; */
  flex-direction: column;
  margin-left: 5%;
  width: 70%;
  /* background-color: blue; */
`;

const CategorySection = styled.div`
  display: flex;
  align-self: flex-end;
`;

const CountryCategory = styled.select`
  color: white;
  background-color: rgba(0, 0, 0, 0.5);
  border: none;
  padding: 15px;
  margin-right: 30px;
  border-radius: 10px;
`;
const CountryCategoryContent = styled.option``;

const GerneCategory = styled.select`
  color: white;
  background-color: rgba(0, 0, 0, 0.5);
  border: none;
  padding: 15px;
  border-radius: 10px;
`;
const GerneCategoryContent = styled.option``;

const FestivalSection = styled.div`
  display: grid;
  margin-top: 5%;
  gap: 30px;
  grid-template-columns: repeat(3, minmax(150px, auto));
  /* grid-template-rows: repeat(2, minmax(150px, auto)); */
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

const FestivalPoster = styled.img`
  width: 100%;
  /* z-index: 99; */
`;

const MoreButton = styled.div`
  margin-top: 30px;
  margin-bottom: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50px;
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  cursor: pointer;
  &:hover {
    background-color: rgba(170, 170, 170, 0.4);
  }
  // const TopButton = styled.div<{ topButton: boolean }>
`;
// const TopButton = styled.div<{ topButton: boolean }>`
//   position: fixed;
//   top: 80%;
//   left: 90%;
//   width: 100px;
//   height: 100px;
//   border-radius: 50%;
//   background-color: blue;
//   z-index: 100;
// `;

export default withRouter(FestivalListContainer);
