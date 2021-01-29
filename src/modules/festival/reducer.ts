import { createReducer } from 'typesafe-actions';
import { FestivalAction, FestivalState } from './types';
import {
  GET_FESTIVAL_LIST,
  GET_FESTIVAL_LIST_SUCCESS,
  GET_FESTIVAL_LIST_ERROR,
  GET_FESTIVAL_LIST_MORE,
  GET_FESTIVAL_LIST_MORE_SUCCESS,
  GET_FESTIVAL_LIST_MORE_ERROR,
  GET_FESTIVAL_DETAIL,
  GET_FESTIVAL_DETAIL_SUCCESS,
  GET_FESTIVAL_DETAIL_ERROR,
  POST_VISITED_FESTIVAL,
  POST_VISITED_FESTIVAL_SUCCESS,
  POST_VISITED_FESTIVAL_ERROR,
  POST_UNVISITED_FESTIVAL,
  POST_UNVISITED_FESTIVAL_SUCCESS,
  POST_UNVISITED_FESTIVAL_ERROR,
  POST_LIKE_FESTIVAL,
  POST_LIKE_FESTIVAL_SUCCESS,
  POST_LIKE_FESTIVAL_ERROR,
  POST_DISLIKE_FESTIVAL,
  POST_DISLIKE_FESTIVAL_SUCCESS,
  POST_DISLIKE_FESTIVAL_ERROR,
} from './actions';

const initialState: FestivalState = {
  festivalList: {
    loading: false,
    error: null,
    data: [],
  },
  festivalDetail: {
    loading: false,
    error: null,
    data: null,
  },
};

const festival = createReducer<FestivalState, FestivalAction>(initialState, {
  [GET_FESTIVAL_LIST]: (state) => ({
    ...state,
    festivalList: {
      loading: true,
      error: null,
      data: state.festivalList.data,
    },
  }),
  [GET_FESTIVAL_LIST_SUCCESS]: (state, action) => ({
    ...state,
    festivalList: {
      loading: false,
      error: null,
      data: action.payload,
    },
  }),
  [GET_FESTIVAL_LIST_ERROR]: (state, action) => ({
    ...state,
    festivalList: {
      loading: false,
      error: action.payload,
      data: [],
    },
  }),
  [GET_FESTIVAL_LIST_MORE]: (state) => ({
    ...state,
    festivalList: {
      loading: true,
      error: null,
      data: state.festivalList.data,
    },
  }),
  [GET_FESTIVAL_LIST_MORE_SUCCESS]: (state, action) => ({
    ...state,
    festivalList: {
      loading: false,
      error: null,
      data: [...state.festivalList.data, ...action.payload],
    },
  }),
  [GET_FESTIVAL_LIST_MORE_ERROR]: (state, action) => ({
    ...state,
    festivalList: {
      loading: false,
      error: action.payload,
      data: [],
    },
  }),
  [GET_FESTIVAL_DETAIL]: (state) => ({
    ...state,
    festivalDetail: {
      loading: true,
      error: null,
      data: state.festivalDetail.data,
    },
  }),
  [GET_FESTIVAL_DETAIL_SUCCESS]: (state, action) => ({
    ...state,
    festivalDetail: {
      loading: false,
      error: null,
      data: action.payload,
    },
  }),
  [GET_FESTIVAL_DETAIL_ERROR]: (state, action) => ({
    ...state,
    festivalDetail: {
      loading: false,
      error: action.payload,
      data: null,
    },
  }),
  [POST_VISITED_FESTIVAL]: (state) => ({
    ...state,
    festivalDetail: {
      loading: false,
      error: null,
      data: state.festivalDetail.data,
    },
  }),
  [POST_VISITED_FESTIVAL_SUCCESS]: (state) => {
    if (state.festivalDetail.data) {
      state.festivalDetail.data.visited = true;
    }
    return JSON.parse(JSON.stringify(state));
  },
  [POST_VISITED_FESTIVAL_ERROR]: (state, action) => ({
    ...state,
    festivalDetail: {
      loading: false,
      error: action.payload,
      data: null,
    },
  }),
  [POST_UNVISITED_FESTIVAL]: (state) => ({
    ...state,
    festivalDetail: {
      loading: false,
      error: null,
      data: state.festivalDetail.data,
    },
  }),
  [POST_UNVISITED_FESTIVAL_SUCCESS]: (state, action) => {
    if (state.festivalDetail.data) {
      state.festivalDetail.data.visited = false;
    }
    return JSON.parse(JSON.stringify(state));
  },
  [POST_UNVISITED_FESTIVAL_ERROR]: (state, action) => ({
    ...state,
    festivalDetail: {
      loading: false,
      error: action.payload,
      data: null,
    },
  }),
  [POST_LIKE_FESTIVAL]: (state) => ({
    ...state,
    festivalDetail: {
      loading: false,
      error: null,
      data: state.festivalDetail.data,
    },
  }),
  [POST_LIKE_FESTIVAL_SUCCESS]: (state, action) => {
    if (state.festivalDetail.data) {
      state.festivalDetail.data.isLiked = true;
    }
    return JSON.parse(JSON.stringify(state));
  },
  [POST_LIKE_FESTIVAL_ERROR]: (state, action) => ({
    ...state,
    festivalDetail: {
      loading: false,
      error: action.payload,
      data: null,
    },
  }),
  [POST_DISLIKE_FESTIVAL]: (state) => ({
    ...state,
    festivalDetail: {
      loading: false,
      error: null,
      data: state.festivalDetail.data,
    },
  }),
  [POST_DISLIKE_FESTIVAL_SUCCESS]: (state, action) => {
    if (state.festivalDetail.data) {
      state.festivalDetail.data.isLiked = false;
    }
    return JSON.parse(JSON.stringify(state));
  },
  [POST_DISLIKE_FESTIVAL_ERROR]: (state, action) => ({
    ...state,
    festivalDetail: {
      loading: false,
      error: action.payload,
      data: null,
    },
  }),
});

export default festival;
