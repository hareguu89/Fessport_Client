import { createAsyncAction } from 'typesafe-actions';
import { IArtistList, IArtistDetail } from '../../api/artist';
import { AxiosError } from 'axios';

export const GET_ARTIST_LIST = 'artist/GET_ARTIST_LIST';
export const GET_ARTIST_LIST_SUCCESS = 'artist/GET_ARTIST_LIST_SUCCESS';
export const GET_ARTIST_LIST_ERROR = 'artist/GET_ARTIST_LIST_ERROR';

export const GET_ARTIST_LIST_MORE = 'artist/GET_ARTIST_MORE_LIST';
export const GET_ARTIST_LIST_MORE_SUCCESS =
  'artist/GET_ARTIST_LIST_MORE_SUCCESS';
export const GET_ARTIST_LIST_MORE_ERROR = 'artist/GET_ARTIST_LIST_MORE_ERROR';

export const GET_ARTIST_DETAIL = 'artist/GET_ARTIST_DETAIL';
export const GET_ARTIST_DETAIL_SUCCESS = 'artist/GET_ARTIST_DETAIL_SUCCESS';
export const GET_ARTIST_DETAIL_ERROR = 'artist/GET_ARTIST_DETAIL_ERROR';

export const POST_LIKE_ARTIST = 'artist/POST_LIKE_ARTIST';
export const POST_LIKE_ARTIST_SUCCESS = 'artist/POST_LIKE_ARTIST_SUCCESS';
export const POST_LIKE_ARTIST_ERROR = 'artist/POST_LIKE_ARTIST_ERROR';

export const POST_DISLIKE_ARTIST = 'artist/POST_DISLIKE_ARTIST';
export const POST_DISLIKE_ARTIST_SUCCESS = 'artist/POST_DISLIKE_ARTIST_SUCCESS';
export const POST_DISLIKE_ARTIST_ERROR = 'artist/POST_DISLIKE_ARTIST_ERROR';

export const getArtistListAsync = createAsyncAction(
  GET_ARTIST_LIST,
  GET_ARTIST_LIST_SUCCESS,
  GET_ARTIST_LIST_ERROR,
)<string, IArtistList[], AxiosError>();

export const getArtistListMoreAsync = createAsyncAction(
  GET_ARTIST_LIST_MORE,
  GET_ARTIST_LIST_MORE_SUCCESS,
  GET_ARTIST_LIST_MORE_ERROR,
)<string, IArtistList[], AxiosError>();

export const getArtistDetailAsync = createAsyncAction(
  GET_ARTIST_DETAIL,
  GET_ARTIST_DETAIL_SUCCESS,
  GET_ARTIST_DETAIL_ERROR,
)<string, IArtistDetail, AxiosError>();

export const postLikeArtistAsync = createAsyncAction(
  POST_LIKE_ARTIST,
  POST_LIKE_ARTIST_SUCCESS,
  POST_LIKE_ARTIST_ERROR,
)<string, { message: string }, AxiosError>();

export const postDislikeArtistAsync = createAsyncAction(
  POST_DISLIKE_ARTIST,
  POST_DISLIKE_ARTIST_SUCCESS,
  POST_DISLIKE_ARTIST_ERROR,
)<string, { message: string }, AxiosError>();
