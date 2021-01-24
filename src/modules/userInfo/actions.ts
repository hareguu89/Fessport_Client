import { createAsyncAction } from 'typesafe-actions';
import { IUserInfo, IEditUserInfo } from '../../api/userInfo';
import { AxiosError } from 'axios';

export const GET_USERINFO_DATA = 'userInfo/GET_USERINFO_DATA';
export const GET_USERINFO_DATA_SUCCESS = 'userInfo/GET_USERINFO_DATA_SUCCESS';
export const GET_USERINFO_DATA_ERROR = 'userInfo/GET_USERINFO_DATA_ERROR';

export const PATCH_USERINFO_DATA = 'userInfo/PATCH_USERINFO_DATA';
export const PATCH_USERINFO_DATA_SUCCESS =
  'userInfo/PATCH_USERINFO_DATA_SUCCESS';
export const PATCH_USERINFO_DATA_ERROR = 'userInfo/PATCH_USERINFO_DATA_ERROR';

export const getUserInfoAsync = createAsyncAction(
  GET_USERINFO_DATA,
  GET_USERINFO_DATA_SUCCESS,
  GET_USERINFO_DATA_ERROR,
)<undefined, IUserInfo, AxiosError>();

export const patchUserInfoAsync = createAsyncAction(
  PATCH_USERINFO_DATA,
  PATCH_USERINFO_DATA_SUCCESS,
  PATCH_USERINFO_DATA_ERROR,
)<IEditUserInfo, { message: string }, AxiosError>();
