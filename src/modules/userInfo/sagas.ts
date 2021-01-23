import {
  getUserInfoAsync,
  postUserInfoAsync,
  GET_USERINFO_DATA,
  POST_USERINFO_DATA,
} from './actions';
import {
  getUserInfo,
  postUserInfo,
  IUserInfo,
  Imessage,
} from '../../api/userInfo';
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';

function* getUserInfoSaga(action: ReturnType<typeof getUserInfoAsync.request>) {
  try {
    const userInfo: IUserInfo = yield call(getUserInfo, action.payload);
    yield put(getUserInfoAsync.success(userInfo));
  } catch (e) {
    yield put(getUserInfoAsync.failure(e));
  }
}

function* postUserInfoSaga(
  action: ReturnType<typeof postUserInfoAsync.request>,
) {
  try {
    const message: Imessage = yield call(postUserInfo, action.payload);
    yield put(postUserInfoAsync.success(message));
  } catch (e) {
    yield put(postUserInfoAsync.failure(e));
  }
}

export function* userInfoSaga() {
  yield takeEvery(GET_USERINFO_DATA, getUserInfoSaga);
  yield takeLatest(POST_USERINFO_DATA, postUserInfoSaga);
}
