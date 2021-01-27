import {
  getCountryCategoryAsync,
  getGenreCategoryAsync,
  getFestivalCategoryAsync,
  getArtistCategoryAsync,
  GET_COUNTRY_CATEGORY,
  GET_GENRE_CATEGORY,
  GET_FESTIVAL_CATEGORY,
  GET_ARTIST_CATEGORY,
} from './actions';
import {
  getCountryCategory,
  getGenreCategory,
  getFestivalCategory,
  getArtistCategory,
  ICategory,
} from '../../api/category';
import { call, put, takeEvery } from 'redux-saga/effects';

function* getCountryCategorySaga() {
  try {
    const countryCategory: ICategory[] = yield call(getCountryCategory);
    yield put(getCountryCategoryAsync.success(countryCategory));
  } catch (e) {
    yield put(getCountryCategoryAsync.failure(e));
  }
}

function* getGenreCategorySaga() {
  try {
    const genreCategory: ICategory[] = yield call(getGenreCategory);
    yield put(getGenreCategoryAsync.success(genreCategory));
  } catch (e) {
    yield put(getGenreCategoryAsync.failure(e));
  }
}

function* getFestivalCategorySaga() {
  try {
    const festivalCategory: ICategory[] = yield call(getFestivalCategory);
    yield put(getFestivalCategoryAsync.success(festivalCategory));
  } catch (e) {
    yield put(getFestivalCategoryAsync.failure(e));
  }
}

function* getArtistCategorySaga() {
  try {
    const artistCategory: ICategory[] = yield call(getArtistCategory);
    yield put(getArtistCategoryAsync.success(artistCategory));
  } catch (e) {
    yield put(getArtistCategoryAsync.failure(e));
  }
}

export function* categorySaga() {
  yield takeEvery(GET_COUNTRY_CATEGORY, getCountryCategorySaga);
  yield takeEvery(GET_GENRE_CATEGORY, getGenreCategorySaga);
  yield takeEvery(GET_FESTIVAL_CATEGORY, getFestivalCategorySaga);
  yield takeEvery(GET_ARTIST_CATEGORY, getArtistCategorySaga);
}
