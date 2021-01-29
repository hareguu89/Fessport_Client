import {
  getArtistListAsync,
  getArtistListMoreAsync,
  getArtistDetailAsync,
  postLikeArtistAsync,
  postDislikeArtistAsync,
  GET_ARTIST_LIST,
  GET_ARTIST_LIST_MORE,
  GET_ARTIST_DETAIL,
  POST_LIKE_ARTIST,
  POST_DISLIKE_ARTIST,
} from './actions';
import {
  getArtistList,
  getArtistDetail,
  postLikeArtist,
  postDislikeArtist,
  IArtistList,
  IArtistDetail,
} from '../../api/artist';
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';

function* getArtistListSaga(
  action: ReturnType<typeof getArtistListAsync.request>,
) {
  try {
    const ArtistList: IArtistList[] = yield call(getArtistList, action.payload);
    yield put(getArtistListAsync.success(ArtistList));
  } catch (e) {
    yield put(getArtistListAsync.failure(e));
  }
}

function* getArtistListMoreSaga(
  action: ReturnType<typeof getArtistListMoreAsync.request>,
) {
  try {
    const ArtistList: IArtistList[] = yield call(getArtistList, action.payload);
    yield put(getArtistListMoreAsync.success(ArtistList));
  } catch (e) {
    yield put(getArtistListMoreAsync.failure(e));
  }
}

function* getArtistDetailSaga(
  action: ReturnType<typeof getArtistDetailAsync.request>,
) {
  try {
    const ArtistDetail: IArtistDetail = yield call(
      getArtistDetail,
      action.payload,
    );
    yield put(getArtistDetailAsync.success(ArtistDetail));
  } catch (e) {
    yield put(getArtistDetailAsync.failure(e));
  }
}

function* postLikeArtistSaga(
  action: ReturnType<typeof postLikeArtistAsync.request>,
) {
  try {
    const message: { message: string } = yield call(
      postLikeArtist,
      action.payload,
    );
    yield put(postLikeArtistAsync.success(message));
  } catch (e) {
    yield put(postLikeArtistAsync.failure(e));
  }
}

function* postDislikeArtistSaga(
  action: ReturnType<typeof postDislikeArtistAsync.request>,
) {
  try {
    const message: { message: string } = yield call(
      postDislikeArtist,
      action.payload,
    );
    yield put(postDislikeArtistAsync.success(message));
  } catch (e) {
    yield put(postDislikeArtistAsync.failure(e));
  }
}

export function* artistSaga() {
  yield takeEvery(GET_ARTIST_LIST, getArtistListSaga);
  yield takeEvery(GET_ARTIST_LIST_MORE, getArtistListMoreSaga);
  yield takeEvery(GET_ARTIST_DETAIL, getArtistDetailSaga);
  yield takeLatest(POST_LIKE_ARTIST, postLikeArtistSaga);
  yield takeLatest(POST_DISLIKE_ARTIST, postDislikeArtistSaga);
}
