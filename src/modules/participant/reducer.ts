import { createReducer } from 'typesafe-actions';
import { ParticDataState, ParticipantAction } from './types';
import {
  GET_PARTICIPANT_DATA,
  GET_PARTICIPANT_DATA_SUCCESS,
  GET_PARTICIPANT_DATA_ERROR,
  POST_PARTICIPANT_DATA,
  POST_PARTICIPANT_DATA_SUCCESS,
  POST_PARTICIPANT_DATA_ERROR,
  DELETE_PARTICIPANT_DATA,
  DELETE_PARTICIPANT_DATA_SUCCESS,
  DELETE_PARTICIPANT_DATA_ERROR,
} from './actions';

const initialState: ParticDataState = {
  participantData: {
    postSucess: false,
    loading: false,
    error: null,
    data: null,
  },
};

const participant = createReducer<ParticDataState, ParticipantAction>(
  initialState,
  {
    [GET_PARTICIPANT_DATA]: (state) => ({
      ...state,
      participantData: {
        postSucess: false,
        loading: true,
        error: null,
        data: state.participantData.data,
      },
    }),
    [GET_PARTICIPANT_DATA_SUCCESS]: (state, action) => ({
      ...state,
      participantData: {
        postSucess: false,
        loading: false,
        error: null,
        data: action.payload,
      },
    }),
    [GET_PARTICIPANT_DATA_ERROR]: (state, action) => ({
      ...state,
      participantData: {
        postSucess: false,
        loading: false,
        error: action.payload,
        data: null,
      },
    }),
    [POST_PARTICIPANT_DATA]: (state) => ({
      ...state,
      participantData: {
        postSucess: false,
        loading: true,
        error: null,
        data: state.participantData.data,
      },
    }),
    [POST_PARTICIPANT_DATA_SUCCESS]: (state, action) => ({
      ...state,
      participantData: {
        postSucess: true,
        loading: false,
        error: null,
        data: state.participantData.data,
      },
    }),
    [POST_PARTICIPANT_DATA_ERROR]: (state, action) => ({
      ...state,
      participantData: {
        postSucess: false,
        loading: false,
        error: action.payload,
        data: state.participantData.data,
      },
    }),
    [DELETE_PARTICIPANT_DATA]: (state) => ({
      ...state,
      participantData: {
        postSucess: false,
        loading: true,
        error: null,
        data: state.participantData.data,
      },
    }),
    [DELETE_PARTICIPANT_DATA_SUCCESS]: (state, action) => ({
      ...state,
      participantData: {
        postSucess: true,
        loading: false,
        error: null,
        data: state.participantData.data,
      },
    }),
    [DELETE_PARTICIPANT_DATA_ERROR]: (state, action) => ({
      ...state,
      participantData: {
        postSucess: false,
        loading: false,
        error: action.payload,
        data: state.participantData.data,
      },
    }),
  },
);

export default participant;
