import { createReducer } from 'typesafe-actions';
import { CategoryAction, CateoryState } from './types';
import {
  GET_COUNTRY_CATEGORY,
  GET_COUNTRY_CATEGORY_SUCCESS,
  GET_COUNTRY_CATEGORY_ERROR,
  GET_GENRE_CATEGORY,
  GET_GENRE_CATEGORY_SUCCESS,
  GET_GENRE_CATEGORY_ERROR,
  GET_FESTIVAL_CATEGORY,
  GET_FESTIVAL_CATEGORY_SUCCESS,
  GET_FESTIVAL_CATEGORY_ERROR,
  GET_ARTIST_CATEGORY,
  GET_ARTIST_CATEGORY_SUCCESS,
  GET_ARTIST_CATEGORY_ERROR,
} from './actions';

const initialState: CateoryState = {
  country: {
    loading: false,
    error: null,
    data: null,
  },
  genre: {
    loading: false,
    error: null,
    data: null,
  },
  festival: {
    loading: false,
    error: null,
    data: null,
  },
  artist: {
    loading: false,
    error: null,
    data: null,
  },
};

const festival = createReducer<CateoryState, CategoryAction>(initialState, {
  [GET_COUNTRY_CATEGORY]: (state) => ({
    ...state,
    country: {
      loading: true,
      error: null,
      data: state.country.data,
    },
  }),
  [GET_COUNTRY_CATEGORY_SUCCESS]: (state, action) => ({
    ...state,
    country: {
      loading: false,
      error: null,
      data: action.payload,
    },
  }),
  [GET_COUNTRY_CATEGORY_ERROR]: (state, action) => ({
    ...state,
    country: {
      loading: false,
      error: action.payload,
      data: [],
    },
  }),
  [GET_GENRE_CATEGORY]: (state) => ({
    ...state,
    genre: {
      loading: true,
      error: null,
      data: state.genre.data,
    },
  }),
  [GET_GENRE_CATEGORY_SUCCESS]: (state, action) => ({
    ...state,
    genre: {
      loading: false,
      error: null,
      data: action.payload,
    },
  }),
  [GET_GENRE_CATEGORY_ERROR]: (state, action) => ({
    ...state,
    genre: {
      loading: false,
      error: action.payload,
      data: [],
    },
  }),
  [GET_FESTIVAL_CATEGORY]: (state) => ({
    ...state,
    festival: {
      loading: true,
      error: null,
      data: state.festival.data,
    },
  }),
  [GET_FESTIVAL_CATEGORY_SUCCESS]: (state, action) => ({
    ...state,
    festival: {
      loading: false,
      error: null,
      data: action.payload,
    },
  }),
  [GET_FESTIVAL_CATEGORY_ERROR]: (state, action) => ({
    ...state,
    festival: {
      loading: false,
      error: action.payload,
      data: [],
    },
  }),
  [GET_ARTIST_CATEGORY]: (state) => ({
    ...state,
    artist: {
      loading: true,
      error: null,
      data: state.artist.data,
    },
  }),
  [GET_ARTIST_CATEGORY_SUCCESS]: (state, action) => ({
    ...state,
    artist: {
      loading: false,
      error: null,
      data: action.payload,
    },
  }),
  [GET_ARTIST_CATEGORY_ERROR]: (state, action) => ({
    ...state,
    artist: {
      loading: false,
      error: action.payload,
      data: [],
    },
  }),
});

export default festival;
