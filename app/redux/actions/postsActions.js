// Imports
import makeActionCreator from './makeActionCreator';
import {
  GET_ALL_POSTS_REQUEST,
  GET_ALL_POSTS_SUCCESS,
  GET_ALL_POSTS_FAILURE,
  CLEAR_POSTS_ERRORS,
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
  CREATE_POST_FAILURE,
  CLEAR_CREATE_POST_SUCCESS,
  CLEAR_GET_POST_DETAILS,
  DELETE_POST_REQUEST,
  DELETE_POST_SUCCESS,
  DELETE_POST_FAILURE,
  CLEAR_DELETE_POST_SUCCESS,
  SELECT_IMAGE_FROM_DEVICE_REQUEST,
  SELECT_IMAGE_FROM_DEVICE_SUCCESS,
  SELECT_IMAGE_FROM_DEVICE_FAILURE,
  CLEAR_SELECT_IMAGE_FROM_DEVICE_SUCCESS,
  GET_POST_DETAILS,
  IS_EDITING_POST,
  UPDATE_POST_REQUEST,
  UPDATE_POST_SUCCESS,
  UPDATE_POST_FAILURE,
  CLEAR_UPDATE_POST_SUCCESS,
} from '../action-types';

export const getAllPostsRequest = makeActionCreator(
  GET_ALL_POSTS_REQUEST,
  'isFetching',
);

export const getAllPostsSuccess = makeActionCreator(
  GET_ALL_POSTS_SUCCESS,
  'allPosts',
);

export const getAllPostsFailure = makeActionCreator(
  GET_ALL_POSTS_FAILURE,
  'error',
);

export const createPostRequest = makeActionCreator(
  CREATE_POST_REQUEST,
  'isCreatingPost',
);

export const createPostSuccess = makeActionCreator(
  CREATE_POST_SUCCESS,
  'createPostSuccess',
);

export const createPostFailure = makeActionCreator(
  CREATE_POST_FAILURE,
  'error',
);

export const getPostDetails = makeActionCreator(
  GET_POST_DETAILS,
  'postDetails',
);

export const clearPostsDetails = makeActionCreator(
  CLEAR_GET_POST_DETAILS,
  'clearPostsDetails',
);

export const deletePostRequest = makeActionCreator(
  DELETE_POST_REQUEST,
  'isDeletingPost',
);

export const deletePostSuccess = makeActionCreator(
  DELETE_POST_SUCCESS,
  'deletePostSuccess',
);

export const deletePostFailure = makeActionCreator(
  DELETE_POST_FAILURE,
  'error',
);

export const clearDeletePostSuccess = makeActionCreator(
  CLEAR_DELETE_POST_SUCCESS,
  'clearDeletePostSuccess',
);

export const clearPostsErrors = makeActionCreator(
  CLEAR_POSTS_ERRORS,
  'clearPostsErrors',
);

export const clearPostsSuccess = makeActionCreator(
  CLEAR_CREATE_POST_SUCCESS,
  'clearCreatePostSuccess',
);

export const selectImageFromDeviceRequest = makeActionCreator(
  SELECT_IMAGE_FROM_DEVICE_REQUEST,
  'isSelectingImageFromDevice',
);

export const selectImageFromDeviceSuccess = makeActionCreator(
  SELECT_IMAGE_FROM_DEVICE_SUCCESS,
  'selectImageFromDeviceSuccess',
);

export const selectImageFromDeviceFailure = makeActionCreator(
  SELECT_IMAGE_FROM_DEVICE_FAILURE,
  'error',
);

export const clearSelectImageFromDeviceSuccess = makeActionCreator(
  CLEAR_SELECT_IMAGE_FROM_DEVICE_SUCCESS,
  'clearSelectImageFromDeviceSuccess',
);

export const isEditingPost = makeActionCreator(
  IS_EDITING_POST,
  'isEditingPost',
);

export const updatePostRequest = makeActionCreator(
  UPDATE_POST_REQUEST,
  'isUpdatingPost',
);

export const updatePostSuccess = makeActionCreator(
  UPDATE_POST_SUCCESS,
  'updatePostSuccess',
);

export const updatePostFailure = makeActionCreator(
  UPDATE_POST_FAILURE,
  'error',
);

export const clearUpdatePostSuccess = makeActionCreator(
  CLEAR_UPDATE_POST_SUCCESS,
  'clearUpdatePostSuccess',
);
