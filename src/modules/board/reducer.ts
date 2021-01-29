import { createReducer } from 'typesafe-actions';
import { BoardDataState, BoardDataAction } from './types';
import {
  GET_BOARD_DATA,
  GET_BOARD_DATA_SUCCESS,
  GET_BOARD_DATA_ERROR,
  POST_BOARD_DATA,
  POST_BOARD_DATA_SUCCESS,
  POST_BOARD_DATA_ERROR,
  DELETE_BOARD_DATA,
  DELETE_BOARD_DATA_SUCCESS,
  DELETE_BOARD_DATA_ERROR,
} from './actions';

const initialState: BoardDataState = {
  boardData: {
    postSucess: false,
    loading: false,
    error: null,
    data: [],
  },
};

const boardData = createReducer<BoardDataState, BoardDataAction>(initialState, {
  [GET_BOARD_DATA]: (state) => ({
    ...state,
    boardData: {
      postSucess: false,
      loading: true,
      error: null,
      data: state.boardData.data,
    },
  }),
  [GET_BOARD_DATA_SUCCESS]: (state, action) => ({
    ...state,
    boardData: {
      postSucess: false,
      loading: false,
      error: null,
      data: [action.payload],
    },
  }),
  [GET_BOARD_DATA_ERROR]: (state, action) => ({
    ...state,
    boardData: {
      postSucess: false,
      loading: false,
      error: action.payload,
      data: [],
    },
  }),
  [POST_BOARD_DATA]: (state) => ({
    ...state,
    boardData: {
      postSucess: false,
      loading: true,
      error: null,
      data: state.boardData.data,
    },
  }),
  [POST_BOARD_DATA_SUCCESS]: (state, action) => ({
    ...state,
    boardData: {
      postSucess: true,
      loading: false,
      error: null,
      data: state.boardData.data,
    },
  }),
  [POST_BOARD_DATA_ERROR]: (state, action) => ({
    ...state,
    boardData: {
      postSucess: false,
      loading: false,
      error: action.payload,
      data: state.boardData.data,
    },
  }),
  [DELETE_BOARD_DATA]: (state) => ({
    ...state,
    boardData: {
      postSucess: false,
      loading: true,
      error: null,
      data: state.boardData.data,
    },
  }),
  [DELETE_BOARD_DATA_SUCCESS]: (state, action) => ({
    ...state,
    boardData: {
      postSucess: true,
      loading: false,
      error: null,
      data: [],
    },
  }),
  [DELETE_BOARD_DATA_ERROR]: (state, action) => ({
    ...state,
    boardData: {
      postSucess: false,
      loading: false,
      error: action.payload,
      data: state.boardData.data,
    },
  }),
});

export default boardData;
