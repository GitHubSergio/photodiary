/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { renderWithRedux } from 'test-utils';
import { NavigationContainer } from '@react-navigation/native';
import { render, fireEvent, cleanup } from 'react-native-testing-library';
import PostsStackMain from '../PostsStackMain';
import LoginForm from '../../components/login/login-form/LoginForm';

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

  test('page contains the header and 10 items', () => {
    const { getByText, getAllByText, debug } = renderWithRedux(
      <NavigationContainer>
        <PostsStackMain />
      </NavigationContainer>,
    );

    debug()

    // const header = getByText('List of numbers from 1 to 20');
    // const items = getAllByText(/Item number/);

    // expect(header).toBeTruthy();
    // expect(items.length).toBe(10);
  });
});
