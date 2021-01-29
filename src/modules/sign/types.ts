import * as actions from './actions';
import { ActionType } from 'typesafe-actions';
import { LoginInfo } from '../../api/signin';

// ---------------- signin -----------------
export type SigninAction = ActionType<typeof actions>;
// ---------------- signup -----------------
export type SignupAction = ActionType<typeof actions>;

// Login request success 시의 response type
export type LoginResponse = {
  userInfo: {
    login: boolean;
    loading: boolean;
    error: Error | null;
    data: LoginInfo | null;
  };
};
