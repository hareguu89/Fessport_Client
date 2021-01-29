import * as actions from './actions';
import { ActionType } from 'typesafe-actions';
import { IUserInfo } from '../../api/userInfo';

export type UserInfoAction = ActionType<typeof actions>;

export type UserInfoState = {
  patchSucess: boolean;
  loading: boolean;
  error: Error | null;
  data: IUserInfo | null;
};
