import { createReducer } from 'typesafe-actions';
import { FestivalAction, FestivalState } from './types';
import {
  GET_FESTIVAL_LIST,
  GET_FESTIVAL_LIST_SUCCESS,
  GET_FESTIVAL_LIST_ERROR,
  GET_FESTIVAL_DETAIL,
  GET_FESTIVAL_DETAIL_SUCCESS,
  GET_FESTIVAL_DETAIL_ERROR,
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
    data: {},
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
      data: {},
    },
  }),
});

export default festival;
