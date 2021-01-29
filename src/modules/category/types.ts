import * as actions from './actions';
import { ActionType } from 'typesafe-actions';
import { ICategory } from '../../api/category';

export type CategoryAction = ActionType<typeof actions>;

export type CateoryState = {
  country: {
    loading: boolean;
    error: Error | null;
    data: ICategory[] | null;
  };
  genre: {
    loading: boolean;
    error: Error | null;
    data: ICategory[] | null;
  };
  festival: {
    loading: boolean;
    error: Error | null;
    data: ICategory[] | null;
  };
  artist: {
    loading: boolean;
    error: Error | null;
    data: ICategory[] | null;
  };
};
