import {
  getUserInfoAsync,
  patchUserInfoAsync,
  GET_USERINFO_DATA,
  PATCH_USERINFO_DATA,
} from './actions';
import { getUserInfo, patchUserInfo, IUserInfo } from '../../api/userInfo';
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';

function* getUserInfoSaga() {
  try {
    const userInfo: IUserInfo = yield call(getUserInfo);
    yield put(getUserInfoAsync.success(userInfo));
  } catch (e) {
    yield put(getUserInfoAsync.failure(e));
  }
}

function* patchUserInfoSaga(
  action: ReturnType<typeof patchUserInfoAsync.request>,
) {
  try {
    const message: { message: string } = yield call(
      patchUserInfo,
      action.payload,
    );
    yield put(patchUserInfoAsync.success(message));
  } catch (e) {
    yield put(patchUserInfoAsync.failure(e));
  }
}

export function* userInfoSaga() {
  yield takeEvery(GET_USERINFO_DATA, getUserInfoSaga);
  yield takeLatest(PATCH_USERINFO_DATA, patchUserInfoSaga);
}
