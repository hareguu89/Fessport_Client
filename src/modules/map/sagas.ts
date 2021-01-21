import { getMapDataAsync, GET_MAP_DATA } from './actions';
import { getMapData, IMap } from '../../api/map';
import { call, put, takeEvery } from 'redux-saga/effects';

function* getMapDataSaga() {
  try {
    const mapData: IMap[] = yield call(getMapData);
    yield put(getMapDataAsync.success(mapData));
  } catch (e) {
    yield put(getMapDataAsync.failure(e));
  }
}

export function* mapSaga() {
  yield takeEvery(GET_MAP_DATA, getMapDataSaga);
}
