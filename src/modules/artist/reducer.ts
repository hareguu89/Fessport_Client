import { createReducer } from 'typesafe-actions';
import { ArtistAction, ArtistState } from './types';
import {
  GET_ARTIST_LIST,
  GET_ARTIST_LIST_SUCCESS,
  GET_ARTIST_LIST_ERROR,
  GET_ARTIST_LIST_MORE,
  GET_ARTIST_LIST_MORE_SUCCESS,
  GET_ARTIST_LIST_MORE_ERROR,
  GET_ARTIST_DETAIL,
  GET_ARTIST_DETAIL_SUCCESS,
  GET_ARTIST_DETAIL_ERROR,
  POST_LIKE_ARTIST,
  POST_LIKE_ARTIST_SUCCESS,
  POST_LIKE_ARTIST_ERROR,
  POST_DISLIKE_ARTIST,
  POST_DISLIKE_ARTIST_SUCCESS,
  POST_DISLIKE_ARTIST_ERROR,
} from './actions';

const initialState: ArtistState = {
  artistList: {
    loading: false,
    error: null,
    data: [],
  },
  artistDetail: {
    loading: false,
    error: null,
    data: null,
  },
};

const artist = createReducer<ArtistState, ArtistAction>(initialState, {
  [GET_ARTIST_LIST]: (state) => ({
    ...state,
    artistList: {
      loading: true,
      error: null,
      data: state.artistList.data,
    },
  }),
  [GET_ARTIST_LIST_SUCCESS]: (state, action) => ({
    ...state,
    artistList: {
      loading: false,
      error: null,
      data: action.payload,
    },
  }),
  [GET_ARTIST_LIST_ERROR]: (state, action) => ({
    ...state,
    artistList: {
      loading: false,
      error: action.payload,
      data: [],
    },
  }),
  [GET_ARTIST_LIST_MORE]: (state) => ({
    ...state,
    artistList: {
      loading: true,
      error: null,
      data: state.artistList.data,
    },
  }),
  [GET_ARTIST_LIST_MORE_SUCCESS]: (state, action) => ({
    ...state,
    artistList: {
      loading: false,
      error: null,
      data: [...state.artistList.data, ...action.payload],
    },
  }),
  [GET_ARTIST_LIST_MORE_ERROR]: (state, action) => ({
    ...state,
    artistList: {
      loading: false,
      error: action.payload,
      data: [],
    },
  }),
  [GET_ARTIST_DETAIL]: (state) => ({
    ...state,
    artistDetail: {
      loading: true,
      error: null,
      data: state.artistDetail.data,
    },
  }),
  [GET_ARTIST_DETAIL_SUCCESS]: (state, action) => ({
    ...state,
    artistDetail: {
      loading: false,
      error: null,
      data: action.payload,
    },
  }),
  [GET_ARTIST_DETAIL_ERROR]: (state, action) => ({
    ...state,
    artistDetail: {
      loading: false,
      error: action.payload,
      data: null,
    },
  }),
  [POST_LIKE_ARTIST]: (state) => ({
    ...state,
    artistDetail: {
      loading: false,
      error: null,
      data: state.artistDetail.data,
    },
  }),
  [POST_LIKE_ARTIST_SUCCESS]: (state, action) => {
    if (state.artistDetail.data) {
      state.artistDetail.data.isLiked = true;
    }
    return JSON.parse(JSON.stringify(state));
  },
  [POST_LIKE_ARTIST_ERROR]: (state, action) => ({
    ...state,
    artistDetail: {
      loading: false,
      error: action.payload,
      data: null,
    },
  }),
  [POST_DISLIKE_ARTIST]: (state) => ({
    ...state,
    artistDetail: {
      loading: false,
      error: null,
      data: state.artistDetail.data,
    },
  }),
  [POST_DISLIKE_ARTIST_SUCCESS]: (state, action) => {
    if (state.artistDetail.data) {
      state.artistDetail.data.isLiked = false;
    }
    return JSON.parse(JSON.stringify(state));
  },
  [POST_DISLIKE_ARTIST_ERROR]: (state, action) => ({
    ...state,
    artistDetail: {
      loading: false,
      error: action.payload,
      data: null,
    },
  }),
});

export default artist;
