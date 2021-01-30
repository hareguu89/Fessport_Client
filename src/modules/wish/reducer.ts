import { createReducer } from 'typesafe-actions';
import { WishState, WishAction } from './types';
import {
  GET_WISH_LIST,
  GET_WISH_LIST_SUCCESS,
  GET_WISH_LIST_ERROR,
} from './actions';

const initialState: WishState = {
  loading: false,
  error: null,
  data: null,
};

const wish = createReducer<WishState, WishAction>(initialState, {
  [GET_WISH_LIST]: (state) => ({
    loading: true,
    error: null,
    data: null,
  }),
  [GET_WISH_LIST_SUCCESS]: (state, action) => ({
    loading: false,
    error: null,
    data: action.payload,
  }),
  [GET_WISH_LIST_ERROR]: (state, action) => ({
    loading: false,
    error: action.payload,
    data: null,
  }),
});

export default wish;
