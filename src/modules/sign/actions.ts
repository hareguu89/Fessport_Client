import { createAsyncAction } from 'typesafe-actions';
import { AxiosError, AxiosResponse } from 'axios';
import { LoginResponse } from './types';
import {
  SigninPayload,
  LoginInfo,
  SignupInfo,
  SignupPayload,
} from '../../api/signin';

// Action types
export const LOGIN_REQUEST = 'signin/LOG_IN_REQUEST' as const;
export const LOGIN_SUCCESS = 'signin/LOG_IN_SUCCESS' as const;
export const LOGIN_FAILURE = 'signin/LOG_IN_FAILURE' as const;

export const SIGNUP_REQUEST = 'signup/SIGNUP_REQUEST' as const;
export const SIGNUP_SUCCESS = 'signup/SIGNUP_SUCCESS' as const;
export const SIGNUP_FAILURE = 'signup/SIGNUP_FAILURE' as const;

export const loginAsync = createAsyncAction(
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
)<SigninPayload, LoginInfo, AxiosError>();
// 로그인타입, response시에 리스폰스타입, 에러

export const signupAsync = createAsyncAction(
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
)<SignupPayload, SignupInfo, AxiosError>();
