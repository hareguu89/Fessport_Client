import {
  getFestivalListAsync,
  getFestivalListMoreAsync,
  getFestivalDetailAsync,
  GET_FESTIVAL_LIST,
  GET_FESTIVAL_LIST_MORE,
  GET_FESTIVAL_DETAIL,
} from './actions';
import {
  getFestivalList,
  getFestivalDetail,
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

export function* festivalSaga() {
  yield takeEvery(GET_FESTIVAL_LIST, getFestivalListSaga);
  yield takeEvery(GET_FESTIVAL_LIST_MORE, getFestivalListMoreSaga);
  yield takeEvery(GET_FESTIVAL_DETAIL, getFestivalDetailSaga);
}
