import { createAsyncAction } from 'typesafe-actions';
import { ICategory } from '../../api/category';
import { AxiosError } from 'axios';

export const GET_COUNTRY_CATEGORY = 'category/GET_COUNTRY_CATEGORY';
export const GET_COUNTRY_CATEGORY_SUCCESS =
  'category/GET_COUNTRY_CATEGORY_SUCCESS';
export const GET_COUNTRY_CATEGORY_ERROR = 'category/GET_COUNTRY_CATEGORY_ERROR';

export const GET_GENRE_CATEGORY = 'category/GET_GENRE_CATEGORY';
export const GET_GENRE_CATEGORY_SUCCESS = 'category/GET_GENRE_CATEGORY_SUCCESS';
export const GET_GENRE_CATEGORY_ERROR = 'category/GET_GENRE_CATEGORY_ERROR';

export const GET_FESTIVAL_CATEGORY = 'category/GET_FESTIVAL_CATEGORY';
export const GET_FESTIVAL_CATEGORY_SUCCESS =
  'category/GET_FESTIVAL_CATEGORY_SUCCESS';
export const GET_FESTIVAL_CATEGORY_ERROR =
  'category/GET_FESTIVAL_CATEGORY_ERROR';

export const GET_ARTIST_CATEGORY = 'category/GET_ARTIST_CATEGORY';
export const GET_ARTIST_CATEGORY_SUCCESS =
  'category/GET_ARTIST_CATEGORY_SUCCESS';
export const GET_ARTIST_CATEGORY_ERROR = 'category/GET_ARTIST_CATEGORY_ERROR';

export const getCountryCategoryAsync = createAsyncAction(
  GET_COUNTRY_CATEGORY,
  GET_COUNTRY_CATEGORY_SUCCESS,
  GET_COUNTRY_CATEGORY_ERROR,
)<undefined, ICategory[], AxiosError>();

export const getGenreCategoryAsync = createAsyncAction(
  GET_GENRE_CATEGORY,
  GET_GENRE_CATEGORY_SUCCESS,
  GET_GENRE_CATEGORY_ERROR,
)<undefined, ICategory[], AxiosError>();

export const getFestivalCategoryAsync = createAsyncAction(
  GET_FESTIVAL_CATEGORY,
  GET_FESTIVAL_CATEGORY_SUCCESS,
  GET_FESTIVAL_CATEGORY_ERROR,
)<undefined, ICategory[], AxiosError>();

export const getArtistCategoryAsync = createAsyncAction(
  GET_ARTIST_CATEGORY,
  GET_ARTIST_CATEGORY_SUCCESS,
  GET_ARTIST_CATEGORY_ERROR,
)<undefined, ICategory[], AxiosError>();
