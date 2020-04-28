/* eslint-disable import/no-extraneous-dependencies */
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { signIn } from '../signingMiddleware';
import {
  SIGNING_REQUEST,
  SIGNING_SUCCESS,
  SIGNING_FAILURE,
  CLEAR_SIGNING_ERRORS,
} from '../../action-types';
import moxios from 'moxios';

const startState = {
  isSigning: false,
  userDetails: {
    displayName: '',
    email: '',
    userId: '',
    status: 0,
    accessToken: '',
  },
  error: '',
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
  response: { ...data },
});
const mockError = (status, error) => ({ status: status, response: error });

describe('Sign In Middlewares', () => {
  describe('signIn', () => {
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());

    it('dispatches signingSuccess', async () => {
      const response = {
        displayName: 'Masa',
        email: 'masa@mail.com',
        userId: 'YVHTtPKcyzReNwHNv3oyV9ArK8n2',
        status: 200,
        accessToken: 'abc123',
      };
      const store = makeMockStore();
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith(mockSuccess(200, response));
      });

      const expected = [
        SIGNING_REQUEST,
        SIGNING_SUCCESS,
        CLEAR_SIGNING_ERRORS,
        SIGNING_REQUEST,
      ];

      await store.dispatch(signIn('masa@mail.com', '123456'));
      const actualActions = store.getActions().map((action) => action.type);
      expect(actualActions).toEqual(expected);
    });

    it('dispatches signingFailure if the email is missing', async () => {
      const store = makeMockStore();
      const expected = [SIGNING_REQUEST, SIGNING_FAILURE, SIGNING_REQUEST];

      await store.dispatch(signIn('', '123456'));
      const actualActions = store.getActions().map((action) => action.type);
      expect(actualActions).toEqual(expected);
    });

    it('dispatches signingFailure if the password is missing', async () => {
      const store = makeMockStore();
      const expected = [SIGNING_REQUEST, SIGNING_FAILURE, SIGNING_REQUEST];

      await store.dispatch(signIn('test@mail.com', ''));
      const actualActions = store.getActions().map((action) => action.type);
      expect(actualActions).toEqual(expected);
    });

    it('dispatches signingFailure if the user does not exist', async () => {
      const response = {
        data: {
          error: {
            code: 'auth/id-token-expired',
            message:
              'There is no user record corresponding to this identifier. The user may have been deleted.',
          },
        },
      };

      const store = makeMockStore();
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith(mockError(400, response.data.error));
      });

      const expected = [SIGNING_REQUEST, SIGNING_FAILURE, SIGNING_REQUEST];

      await store.dispatch(signIn('masa40@mail.com', '123456'));
      const actualActions = store.getActions().map((action) => action.type);
      expect(actualActions).toEqual(expected);
    });
  });
});
