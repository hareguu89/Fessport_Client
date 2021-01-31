import { getWishListAsync, GET_WISH_LIST } from './actions';
import { getWishList, IWish } from '../../api/wish';
import { call, put, takeEvery } from 'redux-saga/effects';

function* getWishListSaga() {
  try {
    const wishList: IWish = yield call(getWishList);
    yield put(getWishListAsync.success(wishList));
  } catch (e) {
    yield put(getWishListAsync.failure(e));
  }
}

export function* wishSaga() {
  yield takeEvery(GET_WISH_LIST, getWishListSaga);
}
