import * as actions from './actions';
import { ActionType } from 'typesafe-actions';
import { CommentDataRes, Imessage } from '../../api/comment';

export type CommentDataAction = ActionType<typeof actions>;

export type CommentDataState = {
  commentData: {
    postSucess: boolean;
    loading: boolean;
    error: Error | null;
    data: CommentDataRes | null;
  };
};
