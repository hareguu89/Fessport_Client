import { createReducer } from 'typesafe-actions';
import { CommentDataState, CommentDataAction } from './types';
import {
  GET_COMMENT_DATA,
  GET_COMMENT_DATA_SUCCESS,
  GET_COMMENT_DATA_ERROR,
  POST_COMMENT_DATA,
  POST_COMMENT_DATA_SUCCESS,
  POST_COMMENT_DATA_ERROR,
  DELETE_COMMENT_DATA,
  DELETE_COMMENT_DATA_SUCCESS,
  DELETE_COMMENT_DATA_ERROR,
} from './actions';

const initialState: CommentDataState = {
  commentData: {
    postSucess: false,
    loading: false,
    error: null,
    data: null,
  },
};

const commentData = createReducer<CommentDataState, CommentDataAction>(
  initialState,
  {
    [GET_COMMENT_DATA]: (state) => ({
      ...state,
      commentData: {
        postSucess: false,
        loading: true,
        error: null,
        data: state.commentData.data,
      },
    }),
    [GET_COMMENT_DATA_SUCCESS]: (state, action) => ({
      ...state,
      commentData: {
        postSucess: false,
        loading: false,
        error: null,
        data: action.payload,
      },
    }),
    [GET_COMMENT_DATA_ERROR]: (state, action) => ({
      ...state,
      commentData: {
        postSucess: false,
        loading: false,
        error: action.payload,
        data: null,
      },
    }),
    [POST_COMMENT_DATA]: (state) => ({
      ...state,
      commentData: {
        postSucess: false,
        loading: true,
        error: null,
        data: state.commentData.data,
      },
    }),
    [POST_COMMENT_DATA_SUCCESS]: (state, action) => ({
      ...state,
      commentData: {
        postSucess: true,
        loading: false,
        error: null,
        data: state.commentData.data,
      },
    }),
    [POST_COMMENT_DATA_ERROR]: (state, action) => ({
      ...state,
      commentData: {
        postSucess: false,
        loading: false,
        error: action.payload,
        data: state.commentData.data,
      },
    }),
    [DELETE_COMMENT_DATA]: (state) => ({
      ...state,
      commentData: {
        postSucess: false,
        loading: true,
        error: null,
        data: state.commentData.data,
      },
    }),
    [DELETE_COMMENT_DATA_SUCCESS]: (state, action) => ({
      ...state,
      commentData: {
        postSucess: true,
        loading: false,
        error: null,
        data: null,
      },
    }),
    [DELETE_COMMENT_DATA_ERROR]: (state, action) => ({
      ...state,
      commentData: {
        postSucess: false,
        loading: false,
        error: action.payload,
        data: state.commentData.data,
      },
    }),
  },
);

export default commentData;
