/* eslint-disable import/no-extraneous-dependencies */
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  getAllPosts,
  getPost,
  createPost,
  deletePost,
} from '../postsMiddleWare';
import {
  GET_ALL_POSTS_REQUEST,
  GET_ALL_POSTS_SUCCESS,
  GET_ALL_POSTS_FAILURE,
  GET_POST_DETAILS_REQUEST,
  GET_POST_DETAILS_SUCCESS,
  GET_POST_DETAILS_FAILURE,
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
  CREATE_POST_FAILURE,
  DELETE_POST_REQUEST,
  DELETE_POST_SUCCESS,
  DELETE_POST_FAILURE,
} from '../../action-types';
import moxios from 'moxios';

const startState = {
  isFetching: false,
  allPosts: [],
  error: '',
  isCreatingPost: false,
  success: 0,
  postDetails: {},
  isDeleting: false,
};
const mockStore = configureMockStore([thunk]);
const makeMockStore = (state = {}) => {
  return mockStore({
    ...startState,
    ...state,
  });
};

const mockSuccess = (status, data) => ({
  status: status,
  response: { status: data },
});
const mockError = (status, error) => ({ status: status, response: error });

describe('Posts Middlewares', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  describe('getAllPosts', () => {
    it('dispatches getAllPostsSuccess', async () => {
      const response = {
        data: {
          allPosts: [
            {
              title: 'Koh Samui',
              description:
                "Ko Samui, Thailand’s second largest island, lies in the Gulf of Thailand off the east coast of the Kra Isthmus. It's known for its palm-fringed beaches, coconut groves and dense, mountainous rainforest, plus luxury resorts and posh spas. The landmark 12m-tall golden Big Buddha statue at Wat Phra Yai Temple is located on a tiny island connected to Ko Samui by a causeway.",
              image: 'imgUrl',
              likes: 0,
              comments: 0,
              createdAt: '2020-02-20T23:07:56.308Z',
              userId: 'YVHTtPKcyzReNwHNv3oyV9ArK8n2',
              docRef: '93caf8c8-0bf5-4625-9ffa-bc8b8ed31a56',
            },
          ],
        },
      };
      const store = makeMockStore();
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith(mockSuccess(200, response.data));
      });

      const expected = [
        GET_ALL_POSTS_REQUEST,
        GET_ALL_POSTS_SUCCESS,
        GET_ALL_POSTS_REQUEST,
      ];

      await store.dispatch(getAllPosts());
      const actualActions = store.getActions().map((action) => action.type);
      expect(actualActions).toEqual(expected);
    });

    it('dispatches getAllPostsFailure if the server returns an error', async () => {
      const response = {
        data: {
          error: {
            code: 'auth/id-token-expired',
            message: 'Firebase ID token has expired.',
          },
        },
      };
      const store = makeMockStore();
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith(mockError(500, response.data));
      });

      const expected = [
        GET_ALL_POSTS_REQUEST,
        GET_ALL_POSTS_FAILURE,
        GET_ALL_POSTS_REQUEST,
      ];

      await store.dispatch(getAllPosts());
      const actualActions = store.getActions().map((action) => action.type);
      expect(actualActions).toEqual(expected);
    });
  });

  describe('getPost', () => {
    it('dispatches getPostDetailsSuccess ', async () => {
      const response = {
        data: {
          postDetails: {
            title: 'Koh Samui',
            description:
              "Ko Samui, Thailand’s second largest island, lies in the Gulf of Thailand off the east coast of the Kra Isthmus. It's known for its palm-fringed beaches, coconut groves and dense, mountainous rainforest, plus luxury resorts and posh spas. The landmark 12m-tall golden Big Buddha statue at Wat Phra Yai Temple is located on a tiny island connected to Ko Samui by a causeway.",
            image: 'imgUrl',
            likes: 0,
            comments: 0,
            createdAt: '2020-02-20T23:07:56.308Z',
            userId: 'YVHTtPKcyzReNwHNv3oyV9ArK8n2',
            docRef: '93caf8c8-0bf5-4625-9ffa-bc8b8ed31a56',
          },
        },
      };
      const store = makeMockStore();
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith(mockSuccess(200, response.data));
      });

      const expected = [
        GET_POST_DETAILS_REQUEST,
        GET_POST_DETAILS_SUCCESS,
        GET_POST_DETAILS_REQUEST,
      ];

      await store.dispatch(getPost());
      const actualActions = store.getActions().map((action) => action.type);
      expect(actualActions).toEqual(expected);
    });

    it('dispatches getPostDetailsFailure ', async () => {
      const response = {
        data: {
          error: {
            code: 'auth/id-token-expired',
            message: 'Firebase ID token has expired.',
          },
        },
      };
      const store = makeMockStore();
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith(mockError(500, response.data));
      });

      const expected = [
        GET_POST_DETAILS_REQUEST,
        GET_POST_DETAILS_FAILURE,
        GET_POST_DETAILS_REQUEST,
      ];

      await store.dispatch(getPost());
      const actualActions = store.getActions().map((action) => action.type);
      expect(actualActions).toEqual(expected);
    });
  });

  describe('createPost', () => {
    it('dispatches createPostSuccess', async () => {
      const store = makeMockStore();
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith(mockSuccess(201, 201));
      });

      const expected = [
        CREATE_POST_REQUEST,
        CREATE_POST_SUCCESS,
        CREATE_POST_REQUEST,
      ];

      await store.dispatch(
        createPost('abc123', 'test title', 'test desc', 'imgUrl'),
      );
      const actualActions = store.getActions().map((action) => action.type);
      expect(actualActions).toEqual(expected);
    });

    it('dispatches createPostFailure if the server returns an error', async () => {
      const response = {
        data: {
          error: {
            code: 'auth/id-token-expired',
            message: 'You Must Sign In',
          },
        },
      };
      const store = makeMockStore();
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith(mockError(400, response.data));
      });

      const expected = [
        CREATE_POST_REQUEST,
        CREATE_POST_FAILURE,
        CREATE_POST_REQUEST,
      ];

      await store.dispatch(
        createPost('abc123', 'test title', 'test desc', 'imgUrl'),
      );
      const actualActions = store.getActions().map((action) => action.type);
      expect(actualActions).toEqual(expected);
    });

    it('dispatches createPostFailure if the title is missing', async () => {
      const store = makeMockStore();
      const expected = [
        CREATE_POST_REQUEST,
        CREATE_POST_FAILURE,
        CREATE_POST_REQUEST,
      ];

      await store.dispatch(createPost('abc123', '', 'test desc', 'imgUrl'));
      const actualActions = store.getActions().map((action) => action.type);
      expect(actualActions).toEqual(expected);
    });

    it('dispatches createPostFailure if the description is missing', async () => {
      const store = makeMockStore();
      const expected = [
        CREATE_POST_REQUEST,
        CREATE_POST_FAILURE,
        CREATE_POST_REQUEST,
      ];

      await store.dispatch(createPost('abc123', 'test title', '', 'imgUrl'));
      const actualActions = store.getActions().map((action) => action.type);
      expect(actualActions).toEqual(expected);
    });
  });

  describe('deletePost', () => {
    it('dispatches deletePostSuccess', async () => {
      const store = makeMockStore();
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith(mockSuccess(200, 200));
      });

      const expected = [
        DELETE_POST_REQUEST,
        DELETE_POST_SUCCESS,
        DELETE_POST_REQUEST,
      ];

      await store.dispatch(deletePost('abc123', 'docRef'));
      const actualActions = store.getActions().map((action) => action.type);
      expect(actualActions).toEqual(expected);
    });

    it('dispatches deletePostFailure if the server returns an error', async () => {
      const response = {
        data: {
          error: {
            code: 'auth/id-token-expired',
            message: 'Something went wrong!!!',
          },
        },
      };
      const store = makeMockStore();
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith(mockError(500, response.data));
      });

      const expected = [
        DELETE_POST_REQUEST,
        DELETE_POST_FAILURE,
        DELETE_POST_REQUEST,
      ];

      await store.dispatch(deletePost('abc123', 'docRef'));
      const actualActions = store.getActions().map((action) => action.type);
      expect(actualActions).toEqual(expected);
    });
  });
});
