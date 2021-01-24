import { createReducer } from 'typesafe-actions';
import { UserInfoState, UserInfoAction } from './types';
import {
  GET_USERINFO_DATA,
  GET_USERINFO_DATA_SUCCESS,
  GET_USERINFO_DATA_ERROR,
  PATCH_USERINFO_DATA,
  PATCH_USERINFO_DATA_SUCCESS,
  PATCH_USERINFO_DATA_ERROR,
} from './actions';

const initialState: UserInfoState = {
  patchSucess: false,
  loading: false,
  error: null,
  data: null,
};

const userInfo = createReducer<UserInfoState, UserInfoAction>(initialState, {
  [GET_USERINFO_DATA]: (state) => ({
    patchSucess: false,
    loading: true,
    error: null,
    data: state.data,
  }),
  [GET_USERINFO_DATA_SUCCESS]: (state, action) => ({
    patchSucess: false,
    loading: false,
    error: null,
    data: action.payload,
  }),
  [GET_USERINFO_DATA_ERROR]: (state, action) => ({
    patchSucess: false,
    loading: false,
    error: action.payload,
    data: null,
  }),
  [PATCH_USERINFO_DATA]: (state) => ({
    patchSucess: false,
    loading: true,
    error: null,
    data: state.data,
  }),
  [PATCH_USERINFO_DATA_SUCCESS]: (state, action) => ({
    patchSucess: true,
    loading: false,
    error: null,
    data: state.data,
  }),
  [PATCH_USERINFO_DATA_ERROR]: (state, action) => ({
    patchSucess: false,
    loading: false,
    error: action.payload,
    data: state.data,
  }),
});

export default userInfo;
