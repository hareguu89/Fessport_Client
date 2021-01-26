import { createAsyncAction } from 'typesafe-actions';
import { IFestivalList, IFestivalDetail } from '../../api/festival';
import { AxiosError } from 'axios';

export const GET_FESTIVAL_LIST = 'festival/GET_FESTIVAL_LIST';
export const GET_FESTIVAL_LIST_SUCCESS = 'festival/GET_FESTIVAL_LIST_SUCCESS';
export const GET_FESTIVAL_LIST_ERROR = 'festival/GET_FESTIVAL_LIST_ERROR';

export const GET_FESTIVAL_LIST_MORE = 'festival/GET_FESTIVAL_MORE_LIST';
export const GET_FESTIVAL_LIST_MORE_SUCCESS =
  'festival/GET_FESTIVAL_LIST_MORE_SUCCESS';
export const GET_FESTIVAL_LIST_MORE_ERROR =
  'festival/GET_FESTIVAL_LIST_MORE_ERROR';

export const GET_FESTIVAL_DETAIL = 'festival/GET_FESTIVAL_DETAIL';
export const GET_FESTIVAL_DETAIL_SUCCESS =
  'festival/GET_FESTIVAL_DETAIL_SUCCESS';
export const GET_FESTIVAL_DETAIL_ERROR = 'festival/GET_FESTIVAL_DETAIL_ERROR';

export const getFestivalListAsync = createAsyncAction(
  GET_FESTIVAL_LIST,
  GET_FESTIVAL_LIST_SUCCESS,
  GET_FESTIVAL_LIST_ERROR,
)<string, IFestivalList[], AxiosError>();

export const getFestivalListMoreAsync = createAsyncAction(
  GET_FESTIVAL_LIST_MORE,
  GET_FESTIVAL_LIST_MORE_SUCCESS,
  GET_FESTIVAL_LIST_MORE_ERROR,
)<string, IFestivalList[], AxiosError>();

export const getFestivalDetailAsync = createAsyncAction(
  GET_FESTIVAL_DETAIL,
  GET_FESTIVAL_DETAIL_SUCCESS,
  GET_FESTIVAL_DETAIL_ERROR,
)<string, IFestivalDetail, AxiosError>();
