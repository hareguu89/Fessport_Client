import { createReducer } from 'typesafe-actions';
import { ImageState, ImageAction } from './types';
import { POST_IMAGE, POST_IMAGE_SUCCESS, POST_IMAGE_ERROR } from './actions';

const initialState: ImageState = {
  imageLoading: false,
  imageError: null,
  imageData: null,
};

const image = createReducer<ImageState, ImageAction>(initialState, {
  [POST_IMAGE]: (state) => ({
    imageLoading: true,
    imageError: null,
    imageData: state.imageData,
  }),
  [POST_IMAGE_SUCCESS]: (state, action) => ({
    imageLoading: false,
    imageError: null,
    imageData: action.payload.image,
  }),
  [POST_IMAGE_ERROR]: (state, action) => ({
    imageLoading: false,
    imageError: action.payload,
    imageData: null,
  }),
});

export default image;
