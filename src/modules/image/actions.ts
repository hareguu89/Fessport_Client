import { createAsyncAction } from 'typesafe-actions';
import { AxiosError } from 'axios';

export const POST_IMAGE = 'image/POST_IMAGE';
export const POST_IMAGE_SUCCESS = 'image/POST_IMAGE_SUCCESS';
export const POST_IMAGE_ERROR = 'image/POST_IMAGE_ERROR';

export const postImageAsync = createAsyncAction(
  POST_IMAGE,
  POST_IMAGE_SUCCESS,
  POST_IMAGE_ERROR,
)<FormData, { image: string }, AxiosError>();
