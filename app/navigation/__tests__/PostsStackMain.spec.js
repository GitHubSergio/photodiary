/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { renderWithRedux } from 'test-utils';
import { NavigationContainer } from '@react-navigation/native';
import {
  render,
  fireEvent,
  cleanup,
  waitForElement,
} from 'react-native-testing-library';
import PostsStackMain from '../PostsStackMain';
import TabNavigator from '../TabNavigator';
import LoginForm from '../../components/login/login-form/LoginForm';
import SigningStackNavigator from '../SigningStackNavigator';

// Silence the warning https://github.com/facebook/react-native/issues/11094#issuecomment-263240420
jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');
jest.mock('@react-native-firebase/auth', () => ({}));
jest.mock('@react-native-firebase/storage', () => ({}));
jest.mock('@react-native-firebase/firestore', () => ({}));
jest.mock('react-native-image-picker', () => ({
  showImagePicker: jest.fn(),
}));

describe('Testing react navigation', () => {
  afterEach(cleanup);

  test('page contains the header and 10 items', async () => {
    const {
      getByText,
      getAllByText,
      getByTestId,
      debug,
      getByPlaceholder,
      toJSON,
    } = renderWithRedux(<SigningStackNavigator />);

    // debug()

    // const signInHeader = getAllByText('LOG IN');
    // expect(signInHeader).toBeTruthy();

    const goToSignUpButton = getByTestId('switch-btn');
    fireEvent.press(goToSignUpButton);
    const signUpHeader = getAllByText('SIGN UP');
    expect(signUpHeader).toBeTruthy();

    /*const userNameField = await waitForElement(() =>
      getByPlaceholder('Confirm Password'),
    );
    expect(userNameField).toBeTruthy();*/

    // debug();
    // const addPostButton = getByText('+');
    // fireEvent.press(addPostButton);
    // const headerAddNewPost = getAllByText('NEW POST');
    // expect(headerAddNewPost).toBeTruthy();
    // debug();
    // const itemsRight = getAllByText('Post');
    // expect(itemsRight).toBeTruthy();

    // expect(header).toBeTruthy();
    // expect(items.length).toBe(10);
  });
});
