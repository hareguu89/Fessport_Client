import { createAsyncAction } from 'typesafe-actions';
import {
  CommentDataRes,
  CommentRequest,
  Imessage,
  CommentDelete,
} from '../../api/comment';
import { AxiosError } from 'axios';

export const GET_COMMENT_DATA = 'comment/GET_COMMENT_DATA';
export const GET_COMMENT_DATA_SUCCESS = 'comment/GET_COMMENT_DATA_SUCCESS';
export const GET_COMMENT_DATA_ERROR = 'comment/GET_COMMENT_DATA_ERROR';

export const POST_COMMENT_DATA = 'comment/POST_COMMENT_DATA';
export const POST_COMMENT_DATA_SUCCESS = 'comment/POST_COMMENT_DATA_SUCCESS';
export const POST_COMMENT_DATA_ERROR = 'comment/POST_COMMENT_DATA_ERROR';

export const DELETE_COMMENT_DATA = 'comment/DELETE_COMMENT_DATA';
export const DELETE_COMMENT_DATA_SUCCESS =
  'comment/DELETE_COMMENT_DATA_SUCCESS';
export const DELETE_COMMENT_DATA_ERROR = 'comment/DELETE_COMMENT_DATA_ERROR';

export const getCommentAsync = createAsyncAction(
  GET_COMMENT_DATA,
  GET_COMMENT_DATA_SUCCESS,
  GET_COMMENT_DATA_ERROR,
)<string, CommentDataRes, AxiosError>();

export const postCommentAsync = createAsyncAction(
  POST_COMMENT_DATA,
  POST_COMMENT_DATA_SUCCESS,
  POST_COMMENT_DATA_ERROR,
)<CommentRequest, Imessage, AxiosError>();

export const deleteCommentAsync = createAsyncAction(
  DELETE_COMMENT_DATA,
  DELETE_COMMENT_DATA_SUCCESS,
  DELETE_COMMENT_DATA_ERROR,
)<CommentDelete, Imessage, AxiosError>();
