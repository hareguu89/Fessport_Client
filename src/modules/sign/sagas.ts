import { SigninApi, LoginInfo, SignupApi, SignupInfo } from '../../api/signin';
import { call, put, takeEvery, delay } from 'redux-saga/effects';
import type { Saga } from 'redux-saga';
import {
  loginAsync,
  LOGIN_REQUEST,
  signupAsync,
  SIGNUP_REQUEST,
} from './actions';

function* loginSaga(action: ReturnType<typeof loginAsync.request>) {
  try {
    const message: LoginInfo = yield call(SigninApi, action.payload);
    yield put(loginAsync.success(message));
  } catch (e) {
    yield put(loginAsync.failure(e));
  }
}

function* signupSaga(action: ReturnType<typeof signupAsync.request>) {
  try {
    const message: SignupInfo = yield call(SignupApi, action.payload);
    yield put(loginAsync.success(message));
  } catch (e) {
    yield put(loginAsync.failure(e));
  }
}

export function* actionWatcher() {
  yield takeEvery(LOGIN_REQUEST, loginSaga);
  yield takeEvery(SIGNUP_REQUEST, signupSaga);
}
