import { combineReducers } from 'redux';
import map, { mapSaga } from './map';
import login, { actionWatcher } from './sign';
import userInfo, { userInfoSaga } from './userInfo';
import image, { imageSaga } from './image';
import festival, { festivalSaga } from './festival';
import artist, { artistSaga } from './artist';
import category, { categorySaga } from './category';
import { all } from 'redux-saga/effects';

const rootReducer = combineReducers({
  map,
  userInfo,
  image,
  login,
  festival,
  artist,
  category,
});

export function* rootSaga() {
  yield all([
    mapSaga(),
    userInfoSaga(),
    imageSaga(),
    actionWatcher(),
    festivalSaga(),
    artistSaga(),
    categorySaga(),
  ]);
}

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
