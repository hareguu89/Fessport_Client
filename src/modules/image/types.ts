import * as actions from './actions';
import { ActionType } from 'typesafe-actions';

export type ImageAction = ActionType<typeof actions>;

export type ImageState = {
  imageLoading: boolean;
  imageError: Error | null;
  imageData: string | null;
};
