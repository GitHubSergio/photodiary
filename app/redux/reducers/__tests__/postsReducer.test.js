import postsReducer from '../postsReducer';
import {
  GET_ALL_POSTS_REQUEST,
  GET_ALL_POSTS_SUCCESS,
  GET_ALL_POSTS_FAILURE,
  GET_POST_DETAILS_REQUEST,
  GET_POST_DETAILS_SUCCESS,
  GET_POST_DETAILS_FAILURE,
  CLEAR_POSTS_ERRORS,
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
  CREATE_POST_FAILURE,
  CLEAR_CREATE_POST_SUCCESS,
  CLEAR_GET_POST_DETAILS,
  DELETE_POST_REQUEST,
  DELETE_POST_SUCCESS,
  DELETE_POST_FAILURE,
} from '../../action-types';

const initialState = {
  isFetching: false,
  allPosts: [],
  error: '',
  isCreatingPost: false,
  success: 0,
  postDetails: {},
  isDeleting: false,
};

describe('postsReducer', () => {
  it('should return the initial state', () => {
    expect(postsReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle GET_ALL_POSTS_REQUEST', () => {
    expect(
      postsReducer(initialState, {
        type: GET_ALL_POSTS_REQUEST,
        isFetching: true,
      }),
    ).toEqual({ ...initialState, isFetching: true });
  });

  it('should handle GET_ALL_POSTS_SUCCESS', () => {
    expect(
      postsReducer(initialState, {
        type: GET_ALL_POSTS_SUCCESS,
        allPosts: [
          {
            title: 'Bangkok',
            description: 'Bangkok, Thailand’s capital.',
            image: 'imgUrl',
            likes: 0,
            comments: 0,
            createdAt: '2020-02-20T23:08:31.704Z',
            userId: 'YVHTtPKcyzReNwHNv3oyV9ArK8n2',
            docRef: '0264d0b6-a99f-421f-8d02-f87008888de8',
          },
        ],
      }),
    ).toEqual({
      ...initialState,
      allPosts: [
        {
          title: 'Bangkok',
          description: 'Bangkok, Thailand’s capital.',
          image: 'imgUrl',
          likes: 0,
          comments: 0,
          createdAt: '2020-02-20T23:08:31.704Z',
          userId: 'YVHTtPKcyzReNwHNv3oyV9ArK8n2',
          docRef: '0264d0b6-a99f-421f-8d02-f87008888de8',
        },
      ],
    });
  });

  it('should handle GET_ALL_POSTS_FAILURE', () => {
    expect(
      postsReducer(initialState, {
        type: GET_ALL_POSTS_FAILURE,
        error: 'Something went wrong!!!',
      }),
    ).toEqual({
      ...initialState,
      error: 'Something went wrong!!!',
    });
  });

  it('should handle GET_POST_DETAILS_REQUEST', () => {
    expect(
      postsReducer(initialState, {
        type: GET_POST_DETAILS_REQUEST,
        isFetching: true,
      }),
    ).toEqual({ ...initialState, isFetching: true });
  });

  it('should handle GET_POST_DETAILS_SUCCESS', () => {
    expect(
      postsReducer(initialState, {
        type: GET_POST_DETAILS_SUCCESS,
        postDetails: {
          title: 'Bangkok',
          description: 'Bangkok, Thailand’s capital.',
          image: 'imgUrl',
          likes: 0,
          comments: 0,
          createdAt: '2020-02-20T23:08:31.704Z',
          userId: 'YVHTtPKcyzReNwHNv3oyV9ArK8n2',
          docRef: '0264d0b6-a99f-421f-8d02-f87008888de8',
        },
      }),
    ).toEqual({
      ...initialState,
      postDetails: {
        title: 'Bangkok',
        description: 'Bangkok, Thailand’s capital.',
        image: 'imgUrl',
        likes: 0,
        comments: 0,
        createdAt: '2020-02-20T23:08:31.704Z',
        userId: 'YVHTtPKcyzReNwHNv3oyV9ArK8n2',
        docRef: '0264d0b6-a99f-421f-8d02-f87008888de8',
      },
    });
  });

  it('should handle GET_POST_DETAILS_FAILURE', () => {
    expect(
      postsReducer(initialState, {
        type: GET_POST_DETAILS_FAILURE,
        error: 'Something went wrong!!!',
      }),
    ).toEqual({
      ...initialState,
      error: 'Something went wrong!!!',
    });
  });

  it('should handle CLEAR_POSTS_ERRORS', () => {
    expect(
      postsReducer(initialState, {
        type: CLEAR_POSTS_ERRORS,
      }),
    ).toEqual({
      ...initialState,
      error: '',
    });
  });

  it('should handle CREATE_POST_REQUEST', () => {
    expect(
      postsReducer(initialState, {
        type: CREATE_POST_REQUEST,
        isCreatingPost: true,
      }),
    ).toEqual({
      ...initialState,
      isCreatingPost: true,
    });
  });

  it('should handle CREATE_POST_SUCCESS', () => {
    expect(
      postsReducer(initialState, {
        type: CREATE_POST_SUCCESS,
        newPost: 201,
      }),
    ).toEqual({
      ...initialState,
      success: 201,
    });
  });

  it('should handle CREATE_POST_FAILURE', () => {
    expect(
      postsReducer(initialState, {
        type: CREATE_POST_FAILURE,
        error: 'Something went wrong!!!',
      }),
    ).toEqual({
      ...initialState,
      error: 'Something went wrong!!!',
    });
  });

  it('should handle CLEAR_CREATE_POST_SUCCESS', () => {
    expect(
      postsReducer(initialState, {
        type: CLEAR_CREATE_POST_SUCCESS,
        success: 0,
      }),
    ).toEqual({
      ...initialState,
      success: 0,
    });
  });

  it('should handle CLEAR_GET_POST_DETAILS', () => {
    expect(
      postsReducer(initialState, {
        type: CLEAR_GET_POST_DETAILS,
        postDetails: {},
      }),
    ).toEqual({
      ...initialState,
      postDetails: {},
    });
  });

  it('should handle DELETE_POST_REQUEST', () => {
    expect(
      postsReducer(initialState, {
        type: DELETE_POST_REQUEST,
        isDeleting: true,
      }),
    ).toEqual({
      ...initialState,
      isDeleting: true,
    });
  });

  it('should handle DELETE_POST_SUCCESS', () => {
    expect(
      postsReducer(initialState, {
        type: DELETE_POST_SUCCESS,
        deletePost: 200,
      }),
    ).toEqual({
      ...initialState,
      success: 200,
    });
  });

  it('should handle DELETE_POST_FAILURE', () => {
    expect(
      postsReducer(initialState, {
        type: DELETE_POST_FAILURE,
        error: 'Something went wrong!!!',
      }),
    ).toEqual({
      ...initialState,
      error: 'Something went wrong!!!',
    });
  });
});
