import { createReducer } from 'typesafe-actions';
import { UserInfoState, UserInfoAction } from './types';
import {
  GET_USERINFO_DATA,
  GET_USERINFO_DATA_SUCCESS,
  GET_USERINFO_DATA_ERROR,
  POST_USERINFO_DATA,
  POST_USERINFO_DATA_SUCCESS,
  POST_USERINFO_DATA_ERROR,
} from './actions';

const initialState: UserInfoState = {
  userInfo: {
    postSucess: false,
    loading: false,
    error: null,
    data: null,
  },
};

const userInfo = createReducer<UserInfoState, UserInfoAction>(initialState, {
  [GET_USERINFO_DATA]: (state) => ({
    ...state,
    userInfo: {
      postSucess: false,
      loading: true,
      error: null,
      data: state.userInfo.data,
    },
  }),
  [GET_USERINFO_DATA_SUCCESS]: (state, action) => ({
    ...state,
    userInfo: {
      postSucess: false,
      loading: false,
      error: null,
      data: action.payload,
    },
  }),
  [GET_USERINFO_DATA_ERROR]: (state, action) => ({
    ...state,
    userInfo: {
      postSucess: false,
      loading: false,
      error: action.payload,
      data: null,
    },
  }),
  [POST_USERINFO_DATA]: (state) => ({
    ...state,
    userInfo: {
      postSucess: false,
      loading: true,
      error: null,
      data: state.userInfo.data,
    },
  }),
  [POST_USERINFO_DATA_SUCCESS]: (state, action) => ({
    ...state,
    userInfo: {
      postSucess: true,
      loading: false,
      error: null,
      data: state.userInfo.data,
    },
  }),
  [POST_USERINFO_DATA_ERROR]: (state, action) => ({
    ...state,
    userInfo: {
      postSucess: false,
      loading: false,
      error: action.payload,
      data: state.userInfo.data,
    },
  }),
});

export default userInfo;
