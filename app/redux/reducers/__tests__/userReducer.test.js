import userReducer from '../userReducer';
import {
  SIGNING_REQUEST,
  SIGNING_SUCCESS,
  SIGNING_FAILURE,
  CLEAR_SIGNING_ERRORS,
} from '../../action-types';

const initialState = {
  isSigning: false,
  userDetails: {
    displayName: '',
    email: '',
    uid: '',
    refreshToken: '',
  },
  error: '',
};

describe('userReducer', () => {
  it('should return the initial state', () => {
    expect(userReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle SIGNING_REQUEST', () => {
    expect(
      userReducer(initialState, {
        type: SIGNING_REQUEST,
        isSigning: true,
      }),
    ).toEqual({ ...initialState, isSigning: true });
  });

  it('should handle SIGNING_SUCCESS', () => {
    expect(
      userReducer(initialState, {
        type: SIGNING_SUCCESS,
        userDetails: {
          displayName: 'Masa',
          email: 'masa@mail.com',
          uid: 'YVHTtPKcyzReNwHNv3oyV9ArK8n2',
          refreshToken: 'abc123',
        },
      }),
    ).toEqual({
      ...initialState,
      userDetails: {
        displayName: 'Masa',
        email: 'masa@mail.com',
        userId: 'YVHTtPKcyzReNwHNv3oyV9ArK8n2',
        refreshToken: 'abc123',
      },
    });
  });

  it('should handle SIGNING_FAILURE', () => {
    expect(
      userReducer(initialState, {
        type: SIGNING_FAILURE,
        error:
          'There is no user record corresponding to this identifier. The user may have been deleted.',
      }),
    ).toEqual({
      ...initialState,
      error:
        'There is no user record corresponding to this identifier. The user may have been deleted.',
    });
  });

  it('should handle CLEAR_SIGNING_ERRORS', () => {
    expect(
      userReducer(initialState, {
        type: CLEAR_SIGNING_ERRORS,
        error: '',
      }),
    ).toEqual({
      ...initialState,
      error: '',
    });
  });
});
