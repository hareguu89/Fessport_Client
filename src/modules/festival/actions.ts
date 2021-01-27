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

export const POST_VISITED_FESTIVAL = 'festival/POST_VISITED_FESTIVAL';
export const POST_VISITED_FESTIVAL_SUCCESS =
  'festival/POST_VISITED_FESTIVAL_SUCCESS';
export const POST_VISITED_FESTIVAL_ERROR =
  'festival/POST_VISITED_FESTIVAL_ERROR';

export const POST_UNVISITED_FESTIVAL = 'festival/POST_UNVISITED_FESTIVAL';
export const POST_UNVISITED_FESTIVAL_SUCCESS =
  'festival/POST_UNVISITED_FESTIVAL_SUCCESS';
export const POST_UNVISITED_FESTIVAL_ERROR =
  'festival/POST_UNVISITED_FESTIVAL_ERROR';

export const POST_LIKE_FESTIVAL = 'festival/POST_LIKE_FESTIVAL';
export const POST_LIKE_FESTIVAL_SUCCESS = 'festival/POST_LIKE_FESTIVAL_SUCCESS';
export const POST_LIKE_FESTIVAL_ERROR = 'festival/POST_LIKE_FESTIVAL_ERROR';

export const POST_DISLIKE_FESTIVAL = 'festival/POST_DISLIKE_FESTIVAL';
export const POST_DISLIKE_FESTIVAL_SUCCESS =
  'festival/POST_DISLIKE_FESTIVAL_SUCCESS';
export const POST_DISLIKE_FESTIVAL_ERROR =
  'festival/POST_DISLIKE_FESTIVAL_ERROR';

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

export const postVisitedFestivalAsync = createAsyncAction(
  POST_VISITED_FESTIVAL,
  POST_VISITED_FESTIVAL_SUCCESS,
  POST_VISITED_FESTIVAL_ERROR,
)<string, { message: string }, AxiosError>();

export const postUnvisitedFestivalAsync = createAsyncAction(
  POST_UNVISITED_FESTIVAL,
  POST_UNVISITED_FESTIVAL_SUCCESS,
  POST_UNVISITED_FESTIVAL_ERROR,
)<string, { message: string }, AxiosError>();

export const postLikeFestivalAsync = createAsyncAction(
  POST_LIKE_FESTIVAL,
  POST_LIKE_FESTIVAL_SUCCESS,
  POST_LIKE_FESTIVAL_ERROR,
)<string, { message: string }, AxiosError>();

export const postDislikeFestivalAsync = createAsyncAction(
  POST_DISLIKE_FESTIVAL,
  POST_DISLIKE_FESTIVAL_SUCCESS,
  POST_DISLIKE_FESTIVAL_ERROR,
)<string, { message: string }, AxiosError>();
