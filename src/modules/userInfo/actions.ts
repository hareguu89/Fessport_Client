import { createAsyncAction } from 'typesafe-actions';
import { IUserInfo, IParam, Imessage } from '../../api/userInfo';
import { AxiosError } from 'axios';

export const GET_USERINFO_DATA = 'userInfo/GET_USERINFO_DATA';
export const GET_USERINFO_DATA_SUCCESS = 'userInfo/GET_USERINFO_DATA_SUCCESS';
export const GET_USERINFO_DATA_ERROR = 'userInfo/GET_USERINFO_DATA_ERROR';

export const POST_USERINFO_DATA = 'userInfo/POST_USERINFO_DATA';
export const POST_USERINFO_DATA_SUCCESS = 'userInfo/POST_USERINFO_DATA_SUCCESS';
export const POST_USERINFO_DATA_ERROR = 'userInfo/POST_USERINFO_DATA_ERROR';

export const getUserInfoAsync = createAsyncAction(
  GET_USERINFO_DATA,
  GET_USERINFO_DATA_SUCCESS,
  GET_USERINFO_DATA_ERROR,
)<string, IUserInfo, AxiosError>();

export const postUserInfoAsync = createAsyncAction(
  POST_USERINFO_DATA,
  POST_USERINFO_DATA_SUCCESS,
  POST_USERINFO_DATA_ERROR,
)<IParam, Imessage, AxiosError>();
