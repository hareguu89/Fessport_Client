import { createReducer } from 'typesafe-actions';
import { MapState, MapAction } from './types';
import {
  GET_MAP_DATA,
  GET_MAP_DATA_SUCCESS,
  GET_MAP_DATA_ERROR,
} from './actions';

const initialState: MapState = {
  mapData: {
    loading: false,
    error: null,
    data: null,
  },
};

const map = createReducer<MapState, MapAction>(initialState, {
  [GET_MAP_DATA]: (state) => ({
    ...state,
    mapData: {
      loading: true,
      error: null,
      data: null,
    },
  }),
  [GET_MAP_DATA_SUCCESS]: (state, action) => ({
    ...state,
    mapData: {
      loading: false,
      error: null,
      data: action.payload,
    },
  }),
  [GET_MAP_DATA_ERROR]: (state, action) => ({
    ...state,
    mapData: {
      loading: false,
      error: action.payload,
      data: null,
    },
  }),
});

export default map;
