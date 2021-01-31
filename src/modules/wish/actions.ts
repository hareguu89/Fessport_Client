import { createAsyncAction } from 'typesafe-actions';
import { IWish } from '../../api/wish';
import { AxiosError } from 'axios';

export const GET_WISH_LIST = 'wish/GET_WISH_LIST';
export const GET_WISH_LIST_SUCCESS = 'wish/GET_WISH_LIST_SUCCESS';
export const GET_WISH_LIST_ERROR = 'wish/GET_WISH_LIST_ERROR';

export const getWishListAsync = createAsyncAction(
  GET_WISH_LIST,
  GET_WISH_LIST_SUCCESS,
  GET_WISH_LIST_ERROR,
)<undefined, IWish, AxiosError>();
