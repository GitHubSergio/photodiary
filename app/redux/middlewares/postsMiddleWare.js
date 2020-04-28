import {
  getAllPostsRequest,
  getAllPostsSuccess,
  getAllPostsFailure,
  createPostRequest,
  createPostSuccess,
  createPostFailure,
  deletePostRequest,
  deletePostSuccess,
  deletePostFailure,
  updatePostRequest,
  updatePostSuccess,
  updatePostFailure,
} from '../actions/postsActions';
import {
  FBGetAllPosts,
  FBCreatePost,
  FBDeletePost,
  FBUpdatePost,
} from '../../firebase/posts/posts';

export const getAllPosts = () => async (dispatch) => {
  dispatch(getAllPostsRequest(true));
  const response = await FBGetAllPosts();
  if (Array.isArray(response)) {
    dispatch(getAllPostsSuccess(response));
  } else {
    dispatch(getAllPostsFailure(response));
  }
  dispatch(getAllPostsRequest(false));
};

export const createPost = (title, description, imageUri) => async (
  dispatch,
) => {
  dispatch(createPostRequest(true));
  if (title.trim() === '') {
    dispatch(createPostFailure('Title is required'));
  } else if (description.trim() === '') {
    dispatch(createPostFailure('Description is required'));
  } else if (!imageUri) {
    dispatch(createPostFailure('Image is required'));
  } else {
    const response = await FBCreatePost(title, description, imageUri);
    if (response && response.status === 201) {
      dispatch(createPostSuccess(response.status));
    } else {
      dispatch(createPostFailure(response));
    }
  }
  dispatch(createPostRequest(false));
};

export const deletePost = (postId, imageId) => async (dispatch) => {
  dispatch(deletePostRequest(true));
  const response = await FBDeletePost(postId, imageId);
  if (response && response.status === 200) {
    dispatch(deletePostSuccess(response.status));
  } else {
    dispatch(deletePostFailure(response));
  }
  dispatch(deletePostRequest(false));
};

export const updatePost = (
  postId,
  title,
  description,
  imageIdToBeDelete,
  imageUriToBeUploaded,
) => async (dispatch) => {
  dispatch(updatePostRequest(true));
  const response = await FBUpdatePost(
    postId,
    title,
    description,
    imageIdToBeDelete,
    imageUriToBeUploaded,
  );
  if (response && response.status === 200) {
    dispatch(updatePostSuccess(response.status));
  } else {
    dispatch(updatePostFailure(response));
  }
  dispatch(updatePostRequest(false));
};
