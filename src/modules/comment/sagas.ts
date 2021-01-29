import {
  getCommentAsync,
  postCommentAsync,
  deleteCommentAsync,
  GET_COMMENT_DATA,
  POST_COMMENT_DATA,
  DELETE_COMMENT_DATA,
} from './actions';
import {
  getCommentData,
  postCommentData,
  deleteCommentData,
  CommentDataRes,
  Imessage,
} from '../../api/comment';
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';

function* getCommentDataSaga(
  action: ReturnType<typeof getCommentAsync.request>,
) {
  try {
    const commentData: CommentDataRes = yield call(
      getCommentData,
      action.payload,
    );
    yield put(getCommentAsync.success(commentData));
  } catch (e) {
    yield put(getCommentAsync.failure(e));
  }
}

function* postCommentDataSaga(
  action: ReturnType<typeof postCommentAsync.request>,
) {
  try {
    const message: Imessage = yield call(postCommentData, action.payload);
    yield put(postCommentAsync.success(message));
  } catch (e) {
    yield put(postCommentAsync.failure(e));
  }
}

function* deleteCommentDataSaga(
  action: ReturnType<typeof deleteCommentAsync.request>,
) {
  try {
    const message: Imessage = yield call(deleteCommentData, action.payload);
    yield put(deleteCommentAsync.success(message));
  } catch (e) {
    yield put(deleteCommentAsync.failure(e));
  }
}

export function* commentDataSaga() {
  yield takeEvery(GET_COMMENT_DATA, getCommentDataSaga);
  yield takeEvery(POST_COMMENT_DATA, postCommentDataSaga);
  yield takeEvery(DELETE_COMMENT_DATA, deleteCommentDataSaga);
}
