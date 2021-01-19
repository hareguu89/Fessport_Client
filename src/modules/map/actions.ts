import { createAsyncAction } from 'typesafe-actions';
import { IMap } from '../../api/map';
import { AxiosError } from 'axios';

export const GET_MAP_DATA = 'map/GET_MAP_DATA';
export const GET_MAP_DATA_SUCCESS = 'map/GET_MAP_DATA_SUCCESS';
export const GET_MAP_DATA_ERROR = 'map/GET_MAP_DATA_ERROR';

export const getMapDataAsync = createAsyncAction(
  GET_MAP_DATA,
  GET_MAP_DATA_SUCCESS,
  GET_MAP_DATA_ERROR,
)<undefined, IMap[], AxiosError>();
