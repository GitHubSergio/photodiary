import {
  signingRequest,
  signingSuccess,
  signingFailure,
  signingOut,
  clearSigningErrors,
} from '../../actions/signingActions';
import {
  SIGNING_REQUEST,
  SIGNING_SUCCESS,
  SIGNING_FAILURE,
  SIGNING_OUT,
  CLEAR_SIGNING_ERRORS,
} from '../../action-types';

describe('signing actions', () => {
  it('should create an action on signing request', () => {
    const actionPayload = 'isSigning';
    const expectedAction = {
      type: SIGNING_REQUEST,
      isSigning: 'isSigning',
    };
    expect(signingRequest(actionPayload)).toEqual(expectedAction);
  });

  it('should create an action on signing success', () => {
    const actionPayload = 'userDetails';
    const expectedAction = {
      type: SIGNING_SUCCESS,
      userDetails: 'userDetails',
    };
    expect(signingSuccess(actionPayload)).toEqual(expectedAction);
  });

  it('should create an action on signing failure', () => {
    const actionPayload = 'error';
    const expectedAction = {
      type: SIGNING_FAILURE,
      error: 'error',
    };
    expect(signingFailure(actionPayload)).toEqual(expectedAction);
  });

  it('should create an action on sign out request', () => {
    const expectedAction = {
      type: SIGNING_OUT,
    };
    expect(signingOut()).toEqual(expectedAction);
  });

  it('should create an action to clear the signing errors', () => {
    const expectedAction = {
      type: CLEAR_SIGNING_ERRORS,
    };
    expect(clearSigningErrors()).toEqual(expectedAction);
  });
});
