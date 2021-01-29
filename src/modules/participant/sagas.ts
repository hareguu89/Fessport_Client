import {
  getParticAsync,
  postParticAsync,
  deleteParticAsync,
  GET_PARTICIPANT_DATA,
  POST_PARTICIPANT_DATA,
  DELETE_PARTICIPANT_DATA,
} from './actions';
import {
  getParticData,
  postParticData,
  ParticDataRes,
  Imessage,
  deleteParticData,
} from '../../api/participant';
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';

function* getParticDataSaga(action: ReturnType<typeof getParticAsync.request>) {
  try {
    const participantData: ParticDataRes = yield call(
      getParticData,
      action.payload,
    );
    yield put(getParticAsync.success(participantData));
  } catch (e) {
    yield put(getParticAsync.failure(e));
  }
}

function* postParticDataSaga(
  action: ReturnType<typeof postParticAsync.request>,
) {
  try {
    const message: Imessage = yield call(postParticData, action.payload);
    yield put(postParticAsync.success(message));
  } catch (e) {
    yield put(postParticAsync.failure(e));
  }
}

function* deleteParticDataSaga(
  action: ReturnType<typeof deleteParticAsync.request>,
) {
  try {
    const message: Imessage = yield call(deleteParticData, action.payload);
    yield put(deleteParticAsync.success(message));
  } catch (e) {
    yield put(deleteParticAsync.failure(e));
  }
}

export function* participantSaga() {
  yield takeEvery(GET_PARTICIPANT_DATA, getParticDataSaga);
  yield takeEvery(POST_PARTICIPANT_DATA, postParticDataSaga);
  yield takeEvery(DELETE_PARTICIPANT_DATA, deleteParticDataSaga);
}
