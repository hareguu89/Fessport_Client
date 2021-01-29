import { combineReducers } from 'redux';
import map, { mapSaga } from './map';
import login, { actionWatcher } from './sign';
import userInfo, { userInfoSaga } from './userInfo';
import image, { imageSaga } from './image';
import boardData, { boardDataSaga } from './board';
import participant, { participantSaga } from './participant';
import commentData, { commentDataSaga } from './comment';
import { all, fork } from 'redux-saga/effects';

const rootReducer = combineReducers({
  map,
  userInfo,
  image,
  login,
  boardData,
  participant,
  commentData,
});

export function* rootSaga() {
  yield all([
    mapSaga(),
    userInfoSaga(),
    imageSaga(),
    actionWatcher(),
    boardDataSaga(),
    participantSaga(),
    commentDataSaga(),
  ]);
}

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
