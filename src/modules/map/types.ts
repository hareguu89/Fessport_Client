import * as actions from './actions';
import { ActionType } from 'typesafe-actions';
import { IMap } from '../../api/map';

export type MapAction = ActionType<typeof actions>;

export type MapState = {
  loading: boolean;
  error: Error | null;
  data: IMap[] | null;
};
