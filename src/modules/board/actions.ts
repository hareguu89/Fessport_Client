import { createAsyncAction } from 'typesafe-actions';
import {
  BoardDataRes,
  BoardRequest,
  Imessage,
  BoardDelete,
} from '../../api/board';
import { AxiosError } from 'axios';

export const GET_BOARD_DATA = 'board/GET_BOARD_DATA';
export const GET_BOARD_DATA_SUCCESS = 'board/GET_BOARD_DATA_SUCCESS';
export const GET_BOARD_DATA_ERROR = 'board/GET_BOARD_DATA_ERROR';

export const POST_BOARD_DATA = 'board/POST_BOARD_DATA';
export const POST_BOARD_DATA_SUCCESS = 'board/POST_BOARD_DATA_SUCCESS';
export const POST_BOARD_DATA_ERROR = 'board/POST_BOARD_DATA_ERROR';

export const DELETE_BOARD_DATA = 'board/DELETE_BOARD_DATA';
export const DELETE_BOARD_DATA_SUCCESS = 'board/DELETE_BOARD_DATA_SUCCESS';
export const DELETE_BOARD_DATA_ERROR = 'board/DELETE_BOARD_DATA_ERROR';

export const getBoardAsync = createAsyncAction(
  GET_BOARD_DATA,
  GET_BOARD_DATA_SUCCESS,
  GET_BOARD_DATA_ERROR,
)<string, BoardDataRes, AxiosError>();

export const postBoardAsync = createAsyncAction(
  POST_BOARD_DATA,
  POST_BOARD_DATA_SUCCESS,
  POST_BOARD_DATA_ERROR,
)<BoardRequest, Imessage, AxiosError>();

export const deleteBoardAsync = createAsyncAction(
  DELETE_BOARD_DATA,
  DELETE_BOARD_DATA_SUCCESS,
  DELETE_BOARD_DATA_ERROR,
)<BoardDelete, Imessage, AxiosError>();
