import * as actions from './actions';
import { ActionType } from 'typesafe-actions';
import { BoardDataRes, Imessage } from '../../api/board';

export type BoardDataAction = ActionType<typeof actions>;

export type BoardDataState = {
  boardData: {
    postSucess: boolean;
    loading: boolean;
    error: Error | null;
    data: BoardDataRes[];
  };
};
