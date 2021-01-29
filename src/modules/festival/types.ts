import * as actions from './actions';
import { ActionType } from 'typesafe-actions';
import { IFestivalList, IFestivalDetail } from '../../api/festival';

export type FestivalAction = ActionType<typeof actions>;

export type FestivalState = {
  festivalList: {
    loading: boolean;
    error: Error | null;
    data: IFestivalList[];
  };
  festivalDetail: {
    loading: boolean;
    error: Error | null;
    data: IFestivalDetail | null;
  };
};
