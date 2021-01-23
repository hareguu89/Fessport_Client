import { combineReducers } from 'redux';
import map, { mapSaga } from './map';
import login, { actionWatcher } from './sign';
import userInfo, { userInfoSaga } from './userInfo';
import image, { imageSaga } from './image';
import { all, fork } from 'redux-saga/effects';

const rootReducer = combineReducers({ map, userInfo, image, login });

export function* rootSaga() {
  yield all([mapSaga(), userInfoSaga(), imageSaga(), actionWatcher()]);
}

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
