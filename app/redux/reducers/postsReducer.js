import createReducer from './createReducer';
import {
  GET_ALL_POSTS_REQUEST,
  GET_ALL_POSTS_SUCCESS,
  GET_ALL_POSTS_FAILURE,
  GET_POST_DETAILS,
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
  IS_EDITING_POST,
  UPDATE_POST_REQUEST,
  UPDATE_POST_SUCCESS,
  UPDATE_POST_FAILURE,
  CLEAR_UPDATE_POST_SUCCESS,
} from '../action-types';

const initialState = {
  isFetching: false,
  allPosts: [],
  error: '',
  isCreatingPost: false,
  createPostSuccess: 0,
  postDetails: {},
  isDeletingPost: false,
  deletePostSuccess: 0,
  isSelectingImageFromDevice: false,
  selectImageFromDeviceSuccess: '',
  isEditingPost: false,
  isUpdatingPost: false,
  updatePostSuccess: 0,
};

export default createReducer(initialState, {
  [GET_ALL_POSTS_REQUEST]: (state, { isFetching }) => ({
    ...state,
    isFetching,
  }),
  [GET_ALL_POSTS_SUCCESS]: (state, { allPosts }) => ({
    ...state,
    allPosts,
  }),
  [GET_ALL_POSTS_FAILURE]: (state, { error }) => ({
    ...state,
    error,
  }),
  [CLEAR_POSTS_ERRORS]: (state, { clearPostsErrors }) => ({
    ...state,
    error: clearPostsErrors,
  }),
  [CREATE_POST_REQUEST]: (state, { isCreatingPost }) => ({
    ...state,
    isCreatingPost,
  }),
  [CREATE_POST_SUCCESS]: (state, { createPostSuccess }) => ({
    ...state,
    createPostSuccess,
  }),
  [CREATE_POST_FAILURE]: (state, { error }) => ({
    ...state,
    error,
  }),
  [GET_POST_DETAILS]: (state, { postDetails }) => ({
    ...state,
    postDetails,
  }),
  [CLEAR_GET_POST_DETAILS]: (state, { clearPostsDetails }) => ({
    ...state,
    postDetails: clearPostsDetails,
  }),
  [CLEAR_CREATE_POST_SUCCESS]: (state, { clearCreatePostSuccess }) => ({
    ...state,
    createPostSuccess: clearCreatePostSuccess,
  }),
  [DELETE_POST_REQUEST]: (state, { isDeletingPost }) => ({
    ...state,
    isDeletingPost,
  }),
  [DELETE_POST_SUCCESS]: (state, { deletePostSuccess }) => ({
    ...state,
    deletePostSuccess,
  }),
  [DELETE_POST_FAILURE]: (state, { error }) => ({
    ...state,
    error,
  }),
  [CLEAR_DELETE_POST_SUCCESS]: (state, { clearDeletePostSuccess }) => ({
    ...state,
    deletePostSuccess: clearDeletePostSuccess,
  }),
  [SELECT_IMAGE_FROM_DEVICE_REQUEST]: (
    state,
    { isSelectingImageFromDevice },
  ) => ({
    ...state,
    isSelectingImageFromDevice,
  }),
  [SELECT_IMAGE_FROM_DEVICE_SUCCESS]: (
    state,
    { selectImageFromDeviceSuccess },
  ) => ({
    ...state,
    selectImageFromDeviceSuccess,
  }),
  [SELECT_IMAGE_FROM_DEVICE_FAILURE]: (state, { error }) => ({
    ...state,
    error,
  }),
  [CLEAR_SELECT_IMAGE_FROM_DEVICE_SUCCESS]: (
    state,
    { clearSelectImageFromDeviceSuccess },
  ) => ({
    ...state,
    selectImageFromDeviceSuccess: clearSelectImageFromDeviceSuccess,
  }),
  [IS_EDITING_POST]: (state, { isEditingPost }) => ({
    ...state,
    isEditingPost,
  }),
  [UPDATE_POST_REQUEST]: (state, { isUpdatingPost }) => ({
    ...state,
    isUpdatingPost,
  }),
  [UPDATE_POST_SUCCESS]: (state, { updatePostSuccess }) => ({
    ...state,
    updatePostSuccess,
  }),
  [UPDATE_POST_FAILURE]: (state, { error }) => ({
    ...state,
    error,
  }),
  [CLEAR_UPDATE_POST_SUCCESS]: (state, { clearUpdatePostSuccess }) => ({
    ...state,
    updatePostSuccess: clearUpdatePostSuccess,
  }),
});
