import * as actions from './actions';
import { ActionType } from 'typesafe-actions';
import { IUserInfo, Imessage } from '../../api/userInfo';

export type UserInfoAction = ActionType<typeof actions>;

export type UserInfoState = {
  userInfo: {
    postSucess: boolean;
    loading: boolean;
    error: Error | null;
    data: IUserInfo | null;
  };
};
