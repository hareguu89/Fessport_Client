import React, { useState, useEffect } from 'react';
import { Link, withRouter, useLocation, useHistory } from 'react-router-dom';
import styled from 'styled-components';

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
  const [top, setTop] = useState(0);
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
  }, [queryString]);

  useEffect(() => {
    if (
      !countryCategory.data &&
      !genreCategory.data &&
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
    setOffset((state) => state + 9);
    console.log(offset + 'test');
    query.set('offset', String(offset));
    query.set('limit', String(limit));
    queryString = query.toString();
    setInputQuery({
      countryId: query.get('countryId'),
      genreId: query.get('genreId'),
      search: query.get('search'),
    });
    dispatch(getFestivalListMoreAsync.request(queryString));
  };

  return (
    <>
      <ListPresenter ref={topRef}>
        {topButton && (
          <TopButton topButton={topButton} onClick={handleScrollUp}>
            1231312
          </TopButton>
        )}
        <FestivalCategory>
          {festivalCategory.data &&
            festivalCategory.data.map((item) => (
              <Link key={`C${item._id}`} to={`/festival/detail/${item._id}`}>
                <FestivalName>{item.name}</FestivalName>
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
          <SearchBar
            type={'text'}
            value={inputQuery.search ? inputQuery.search : ''}
            onChange={handleInputSearch}
            onKeyPress={handleSearch}
          ></SearchBar>
          <FestivalSection>
            {loading && <p style={{ textAlign: 'center' }}>Loading...</p>}
            {error && <p style={{ textAlign: 'center' }}>Error!!!</p>}
            {festivalList.data &&
              festivalList.data.map((item) => (
                <Link key={item._id} to={`/festival/detail/${item._id}`}>
                  <FestivalName>{item.name}</FestivalName>
                  <FestivalPoset src={item.poster} />
                </Link>
              ))}
            {!(offset + 9 > festivalList.data.length) && (
              <button onClick={handleFestivalListMore}>더 보기</button>
            )}
          </FestivalSection>
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

const FestivalCategory = styled.div`
  display: flex;
  /* justify-content: center; */
  /* align-items:center; */
  flex-direction: column;
`;

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

const FestivalSection = styled.div``;
const FestivalName = styled.div``;
const FestivalPoset = styled.img``;

export default withRouter(FestivalListContainer);
