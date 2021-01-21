import { createReducer } from 'typesafe-actions';
import { ImageState, ImageAction } from './types';
import { POST_IMAGE, POST_IMAGE_SUCCESS, POST_IMAGE_ERROR } from './actions';

const initialState: ImageState = {
  imageData: {
    loading: false,
    error: null,
    data: null,
  },
};

const image = createReducer<ImageState, ImageAction>(initialState, {
  [POST_IMAGE]: (state) => ({
    ...state,
    imageData: {
      loading: true,
      error: null,
      data: state.imageData.data,
    },
  }),
  [POST_IMAGE_SUCCESS]: (state, action) => ({
    ...state,
    imageData: {
      loading: false,
      error: null,
      data: action.payload.image,
    },
  }),
  [POST_IMAGE_ERROR]: (state, action) => ({
    ...state,
    imageData: {
      loading: false,
      error: action.payload,
      data: null,
    },
  }),
});

export default image;
