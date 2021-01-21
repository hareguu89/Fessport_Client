import { combineReducers } from 'redux';
import map, { mapSaga } from './map';
import userInfo, { userInfoSaga } from './userInfo';
import image, { imageSaga } from './image';
import { all } from 'redux-saga/effects';

const rootReducer = combineReducers({ map, userInfo, image });

export function* rootSaga() {
  yield all([mapSaga(), userInfoSaga(), imageSaga()]);
}

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
