import { createReducer } from 'typesafe-actions';
import { MapState, MapAction } from './types';
import {
  GET_MAP_DATA,
  GET_MAP_DATA_SUCCESS,
  GET_MAP_DATA_ERROR,
} from './actions';

const initialState: MapState = {
  loading: false,
  error: null,
  data: null,
};

const map = createReducer<MapState, MapAction>(initialState, {
  [GET_MAP_DATA]: (state) => ({
    loading: true,
    error: null,
    data: null,
  }),
  [GET_MAP_DATA_SUCCESS]: (state, action) => ({
    loading: false,
    error: null,
    data: action.payload,
  }),
  [GET_MAP_DATA_ERROR]: (state, action) => ({
    loading: false,
    error: action.payload,
    data: null,
  }),
});

export default map;
