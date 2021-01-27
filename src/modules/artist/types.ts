import * as actions from './actions';
import { ActionType } from 'typesafe-actions';
import { IArtistList, IArtistDetail } from '../../api/artist';

export type ArtistAction = ActionType<typeof actions>;

export type ArtistState = {
  artistList: {
    loading: boolean;
    error: Error | null;
    data: IArtistList[];
  };
  artistDetail: {
    loading: boolean;
    error: Error | null;
    data: IArtistDetail | null;
  };
};
