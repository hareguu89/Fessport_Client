import { createAsyncAction } from 'typesafe-actions';
import { ParticDataRes, ParticRequest, Imessage } from '../../api/participant';
import { AxiosError } from 'axios';

export const GET_PARTICIPANT_DATA = 'participant/GET_PARTICIPANT_DATA';
export const GET_PARTICIPANT_DATA_SUCCESS =
  'participant/GET_PARTICIPANT_DATA_SUCCESS';
export const GET_PARTICIPANT_DATA_ERROR =
  'participant/GET_PARTICIPANT_DATA_ERROR';

export const POST_PARTICIPANT_DATA = 'participant/POST_PARTICIPANT_DATA';
export const POST_PARTICIPANT_DATA_SUCCESS =
  'participant/POST_PARTICIPANT_DATA_SUCCESS';
export const POST_PARTICIPANT_DATA_ERROR =
  'participant/POST_PARTICIPANT_DATA_ERROR';

export const DELETE_PARTICIPANT_DATA = 'participant/DELETE_PARTICIPANT_DATA';
export const DELETE_PARTICIPANT_DATA_SUCCESS =
  'participant/DELETE_PARTICIPANT_DATA_SUCCESS';
export const DELETE_PARTICIPANT_DATA_ERROR =
  'participant/DELETE_PARTICIPANT_DATA_ERROR';

export const getParticAsync = createAsyncAction(
  GET_PARTICIPANT_DATA,
  GET_PARTICIPANT_DATA_SUCCESS,
  GET_PARTICIPANT_DATA_ERROR,
)<string, ParticDataRes, AxiosError>();

export const postParticAsync = createAsyncAction(
  POST_PARTICIPANT_DATA,
  POST_PARTICIPANT_DATA_SUCCESS,
  POST_PARTICIPANT_DATA_ERROR,
)<ParticRequest, Imessage, AxiosError>();

export const deleteParticAsync = createAsyncAction(
  DELETE_PARTICIPANT_DATA,
  DELETE_PARTICIPANT_DATA_SUCCESS,
  DELETE_PARTICIPANT_DATA_ERROR,
)<ParticRequest, Imessage, AxiosError>();
