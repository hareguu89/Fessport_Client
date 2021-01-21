import * as actions from './actions';
import { ActionType } from 'typesafe-actions';

export type ImageAction = ActionType<typeof actions>;

export type ImageState = {
  imageData: {
    loading: boolean;
    error: Error | null;
    data: string | null;
  };
};
