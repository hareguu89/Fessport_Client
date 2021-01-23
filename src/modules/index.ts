import { combineReducers } from 'redux';
import map, { mapSaga } from './map';
import login, { actionWatcher } from './sign';
import { all, fork } from 'redux-saga/effects';

const rootReducer = combineReducers({ map, login });

export function* rootSaga() {
  yield all([mapSaga(), actionWatcher()]);
}

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
