// Imports
import makeActionCreator from './makeActionCreator';
import {
  SIGNING_REQUEST,
  SIGNING_SUCCESS,
  SIGNING_FAILURE,
  CLEAR_SIGNING_ERRORS,
  SIGNING_OUT,
} from '../action-types';

export const signingRequest = makeActionCreator(SIGNING_REQUEST, 'isSigning');

export const signingSuccess = makeActionCreator(SIGNING_SUCCESS, 'userDetails');

export const signingFailure = makeActionCreator(SIGNING_FAILURE, 'error');

export const clearSigningErrors = makeActionCreator(CLEAR_SIGNING_ERRORS);

export const signingOut = makeActionCreator(SIGNING_OUT);
