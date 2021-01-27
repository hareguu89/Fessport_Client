import { createReducer } from 'typesafe-actions';
import { SigninAction, LoginResponse } from './types';
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
} from './actions';

const initialState: LoginResponse = {
  userInfo: {
    login: false,
    loading: false,
    error: null,
    data: null,
  },
};

const login = createReducer<LoginResponse, SigninAction>(initialState, {
  [LOGIN_REQUEST]: (state) => ({
    ...state,
    userInfo: {
      login: false,
      loading: true,
      error: null,
      data: null,
    },
  }),
  [LOGIN_SUCCESS]: (state, action) => ({
    ...state,
    userInfo: {
      login: true,
      loading: false,
      error: null,
      data: action.payload,
    },
  }),
  [LOGIN_FAILURE]: (state, action) => ({
    ...state,
    userInfo: {
      login: false,
      loading: false,
      error: action.payload,
      data: null,
    },
  }),
  [SIGNUP_REQUEST]: (state) => ({
    ...state,
    userInfo: {
      login: false,
      loading: true,
      error: null,
      data: null,
    },
  }),
  [SIGNUP_SUCCESS]: (state, action) => ({
    ...state,
    userInfo: {
      login: false,
      loading: false,
      error: null,
      data: action.payload,
    },
  }),
  [SIGNUP_FAILURE]: (state, action) => ({
    ...state,
    userInfo: {
      login: false,
      loading: false,
      error: action.payload,
      data: null,
    },
  }),
});

export default login;
