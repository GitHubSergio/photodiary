import createReducer from './createReducer';
import {
  SIGNING_REQUEST,
  SIGNING_SUCCESS,
  SIGNING_FAILURE,
  CLEAR_SIGNING_ERRORS,
} from '../action-types';

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

export default createReducer(initialState, {
  [SIGNING_REQUEST]: (state, { isSigning }) => ({
    ...state,
    isSigning,
  }),
  [SIGNING_SUCCESS]: (state, { userDetails }) => ({
    ...state,
    userDetails: {
      displayName: userDetails.displayName,
      email: userDetails.email,
      userId: userDetails.uid,
      refreshToken: userDetails.refreshToken,
    },
  }),
  [SIGNING_FAILURE]: (state, { error }) => ({
    ...state,
    error,
  }),
  [CLEAR_SIGNING_ERRORS]: (state) => ({
    ...state,
    error: '',
  }),
});
