/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { renderWithRedux } from 'test-utils';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { fireEvent } from '@testing-library/react-native';
import '@testing-library/jest-dom/extend-expect';
import PostsStackMain from '../PostsStackMain';
import LoginScreen from '../../screens/LoginScreen';
import SettingsStackNavigator from '../SettingsStackNavigator';

jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');
jest.mock('@react-native-firebase/auth', () => ({}));
jest.mock('@react-native-firebase/storage', () => ({}));
jest.mock('@react-native-firebase/firestore', () => ({}));
jest.mock('react-native-image-picker', () => ({
  showImagePicker: jest.fn(),
}));

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const MockTabNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Posts" component={PostsStackMain} />
        <Tab.Screen name="Settings" component={SettingsStackNavigator} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
const MockedStackNavigator = ({
  routeOne,
  componentOne,
  optionsOne = { headerTitle: 'LOG IN' },
  routeTwo,
  componentTwo,
  optionsTwo = { headerTitle: 'SIGN UP' },
  params = {},
}) => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name={routeOne}
          component={componentOne}
          initialParams={params}
          options={{ ...optionsOne }}
        />
        <Stack.Screen
          name={routeTwo}
          component={componentTwo}
          initialParams={params}
          options={{ ...optionsTwo }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const MockNavigation = ({ user = {} }) => {
  return !user ? (
    <MockedStackNavigator
      routeOne="LoginScreen"
      componentOne={LoginScreen}
      routeTwo="SignUpScreen"
      componentTwo={LoginScreen}
    />
  ) : (
    <MockTabNavigator />
  );
};

describe('Navigation', () => {
  describe('Tab Navigator', () => {
    it('should render the Logging Stack if the user is not authenticated', async () => {
      const { getByText } = renderWithRedux(<MockNavigation user={false} />);
      const loginHeader = getByText('LOG IN');
      expect(loginHeader).toBeTruthy();
    });

    it('should render the Posts Stack if the user is authenticated', async () => {
      const { getByText } = renderWithRedux(<MockNavigation user />);
      const postsHeader = getByText('POSTS');
      expect(postsHeader).toBeTruthy();
    });

    it('should navigate from the posts tab to the settings tabs', () => {
      const { getByText } = renderWithRedux(<MockNavigation user />);
      fireEvent.press(getByText('Settings'));
      const postsHeader = getByText('SETTINGS');
      expect(postsHeader).toBeTruthy();
    });
  });

  describe('Login Stack', () => {
    it('should navigate to the Sign Up screen', async () => {
      const { getByText, getByLabelText } = renderWithRedux(
        <MockedStackNavigator
          routeOne="LoginScreen"
          componentOne={LoginScreen}
          routeTwo="SignUpScreen"
          componentTwo={LoginScreen}
        />,
      );
      const goToSignUpButton = getByLabelText('switch-btn');
      fireEvent.press(goToSignUpButton);
      const signUpHeader = getByText('SIGN UP');
      expect(signUpHeader).toBeTruthy();
      const usernameField = getByLabelText('username');
      expect(usernameField).toBeTruthy();
    });

    it('should navigate to the Sign In screen', async () => {
      const { getByText, getByLabelText } = renderWithRedux(
        <MockedStackNavigator
          routeOne="SignUpScreen"
          componentOne={LoginScreen}
          optionsOne={{ headerTitle: 'SIGN UP' }}
          routeTwo="LoginScreen"
          componentTwo={LoginScreen}
          optionsTwo={{ headerTitle: 'LOG IN' }}
        />,
      );
      const goToSignUpButton = getByLabelText('switch-btn');
      fireEvent.press(goToSignUpButton);
      const signUpHeader = getByText('LOG IN');
      expect(signUpHeader).toBeTruthy();
    });
  });
});
