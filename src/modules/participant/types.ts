import * as actions from './actions';
import { ActionType } from 'typesafe-actions';
import { ParticDataRes } from '../../api/participant';

export type ParticipantAction = ActionType<typeof actions>;

export type ParticDataState = {
  participantData: {
    postSucess: boolean;
    loading: boolean;
    error: Error | null;
    data: ParticDataRes | null;
  };
};
