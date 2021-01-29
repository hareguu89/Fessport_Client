import {
  getBoardAsync,
  postBoardAsync,
  deleteBoardAsync,
  GET_BOARD_DATA,
  POST_BOARD_DATA,
  DELETE_BOARD_DATA,
} from './actions';
import {
  getBoardData,
  postBoardData,
  deleteBoardData,
  BoardDataRes,
  Imessage,
} from '../../api/board';
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';

function* getBoardDataSaga(action: ReturnType<typeof getBoardAsync.request>) {
  try {
    const boardData: BoardDataRes = yield call(getBoardData, action.payload);
    yield put(getBoardAsync.success(boardData));
  } catch (e) {
    yield put(getBoardAsync.failure(e));
  }
}

function* postBoardDataSaga(action: ReturnType<typeof postBoardAsync.request>) {
  try {
    const message: Imessage = yield call(postBoardData, action.payload);
    yield put(postBoardAsync.success(message));
  } catch (e) {
    yield put(postBoardAsync.failure(e));
  }
}

function* deleteBoardDataSaga(
  action: ReturnType<typeof deleteBoardAsync.request>,
) {
  try {
    const message: Imessage = yield call(deleteBoardData, action.payload);
    yield put(deleteBoardAsync.success(message));
  } catch (e) {
    yield put(deleteBoardAsync.failure(e));
  }
}

export function* boardDataSaga() {
  yield takeEvery(GET_BOARD_DATA, getBoardDataSaga);
  yield takeEvery(POST_BOARD_DATA, postBoardDataSaga);
  yield takeEvery(DELETE_BOARD_DATA, deleteBoardDataSaga);
}
