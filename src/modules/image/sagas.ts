import { postImageAsync, POST_IMAGE } from './actions';
import { postImage } from '../../api/image';
import { call, put, takeEvery } from 'redux-saga/effects';

function* postImageSaga(action: ReturnType<typeof postImageAsync.request>) {
  try {
    const image: { image: string } = yield call(postImage, action.payload);
    yield put(postImageAsync.success(image));
  } catch (e) {
    yield put(postImageAsync.failure(e));
  }
}

export function* imageSaga() {
  yield takeEvery(POST_IMAGE, postImageSaga);
}
