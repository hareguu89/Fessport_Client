import {
  getFestivalListAsync,
  getFestivalListMoreAsync,
  getFestivalDetailAsync,
  postVisitedFestivalAsync,
  postUnvisitedFestivalAsync,
  postLikeFestivalAsync,
  postDislikeFestivalAsync,
  GET_FESTIVAL_LIST,
  GET_FESTIVAL_LIST_MORE,
  GET_FESTIVAL_DETAIL,
  POST_VISITED_FESTIVAL,
  POST_UNVISITED_FESTIVAL,
  POST_LIKE_FESTIVAL,
  POST_DISLIKE_FESTIVAL,
} from './actions';
import {
  getFestivalList,
  getFestivalDetail,
  postVisitedFestival,
  postUnvisitedFestival,
  postLikeFestival,
  postDislikeFestival,
  IFestivalList,
  IFestivalDetail,
} from '../../api/festival';
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';

function* getFestivalListSaga(
  action: ReturnType<typeof getFestivalListAsync.request>,
) {
  try {
    const festivalList: IFestivalList[] = yield call(
      getFestivalList,
      action.payload,
    );
    yield put(getFestivalListAsync.success(festivalList));
  } catch (e) {
    yield put(getFestivalListAsync.failure(e));
  }
}

function* getFestivalListMoreSaga(
  action: ReturnType<typeof getFestivalListMoreAsync.request>,
) {
  try {
    const festivalList: IFestivalList[] = yield call(
      getFestivalList,
      action.payload,
    );
    yield put(getFestivalListMoreAsync.success(festivalList));
  } catch (e) {
    yield put(getFestivalListMoreAsync.failure(e));
  }
}

function* getFestivalDetailSaga(
  action: ReturnType<typeof getFestivalDetailAsync.request>,
) {
  try {
    const festivalDetail: IFestivalDetail = yield call(
      getFestivalDetail,
      action.payload,
    );
    yield put(getFestivalDetailAsync.success(festivalDetail));
  } catch (e) {
    yield put(getFestivalDetailAsync.failure(e));
  }
}

function* postVisitedFestivalSaga(
  action: ReturnType<typeof postVisitedFestivalAsync.request>,
) {
  try {
    const message: { message: string } = yield call(
      postVisitedFestival,
      action.payload,
    );
    yield put(postVisitedFestivalAsync.success(message));
  } catch (e) {
    yield put(postVisitedFestivalAsync.failure(e));
  }
}

function* postUnvisitedFestivalSaga(
  action: ReturnType<typeof postUnvisitedFestivalAsync.request>,
) {
  try {
    const message: { message: string } = yield call(
      postUnvisitedFestival,
      action.payload,
    );
    yield put(postUnvisitedFestivalAsync.success(message));
  } catch (e) {
    yield put(postUnvisitedFestivalAsync.failure(e));
  }
}

function* postLikeFestivalSaga(
  action: ReturnType<typeof postLikeFestivalAsync.request>,
) {
  try {
    const message: { message: string } = yield call(
      postLikeFestival,
      action.payload,
    );
    yield put(postLikeFestivalAsync.success(message));
  } catch (e) {
    yield put(postLikeFestivalAsync.failure(e));
  }
}

function* postDislikeFestivalSaga(
  action: ReturnType<typeof postDislikeFestivalAsync.request>,
) {
  try {
    const message: { message: string } = yield call(
      postDislikeFestival,
      action.payload,
    );
    yield put(postDislikeFestivalAsync.success(message));
  } catch (e) {
    yield put(postDislikeFestivalAsync.failure(e));
  }
}

export function* festivalSaga() {
  yield takeEvery(GET_FESTIVAL_LIST, getFestivalListSaga);
  yield takeEvery(GET_FESTIVAL_LIST_MORE, getFestivalListMoreSaga);
  yield takeEvery(GET_FESTIVAL_DETAIL, getFestivalDetailSaga);
  yield takeLatest(POST_VISITED_FESTIVAL, postVisitedFestivalSaga);
  yield takeLatest(POST_UNVISITED_FESTIVAL, postUnvisitedFestivalSaga);
  yield takeLatest(POST_LIKE_FESTIVAL, postLikeFestivalSaga);
  yield takeLatest(POST_DISLIKE_FESTIVAL, postDislikeFestivalSaga);
}
