// Imports
import {
  signingRequest,
  signingSuccess,
  signingFailure,
  clearSigningErrors,
  signingOut,
} from '../actions/signingActions';
import { FBSignUp, FBLogin, FBLogOut } from '../../firebase/user/auth';

export const signUp = (displayName, email, password, confirmPassword) => async (
  dispatch,
) => {
  dispatch(signingRequest(true));
  if (displayName.trim() === '') {
    dispatch(signingFailure('Display Name is required'));
  } else if (email.trim() === '') {
    dispatch(signingFailure('Email is required'));
  } else if (password.trim() === '') {
    dispatch(signingFailure('Password is required'));
  } else if (confirmPassword.trim() === '') {
    dispatch(signingFailure('Confirm Password is required'));
  } else if (password.trim() !== confirmPassword.trim()) {
    dispatch(signingFailure('Passwords do not match'));
  } else {
    const response = await FBSignUp(
      displayName,
      email,
      password,
      confirmPassword,
    );
    if (response.email) {
      dispatch(signingSuccess(response));
      dispatch(clearSigningErrors());
    } else {
      dispatch(signingFailure(response));
    }
  }
  dispatch(signingRequest(false));
};

export const signIn = (email, password) => async (dispatch) => {
  dispatch(signingRequest(true));
  if (email.trim() === '') {
    dispatch(signingFailure('Email is required'));
  } else if (password.trim() === '') {
    dispatch(signingFailure('Password is required'));
  } else {
    const response = await FBLogin(email, password);
    if (response.email) {
      dispatch(signingSuccess(response));
      dispatch(clearSigningErrors());
    } else {
      dispatch(signingFailure(response));
    }
  }
  dispatch(signingRequest(false));
};

export const logOut = () => async (dispatch) => {
  dispatch(signingRequest(true));
  const response = FBLogOut();
  if (response) {
    dispatch(signingOut());
  }
  dispatch(signingRequest(false));
};
