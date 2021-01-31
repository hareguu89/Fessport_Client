import * as actions from './actions';
import { ActionType } from 'typesafe-actions';
import { IWish } from '../../api/wish';

export type WishAction = ActionType<typeof actions>;

export type WishState = {
  loading: boolean;
  error: Error | null;
  data: IWish | null;
};
