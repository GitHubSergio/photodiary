/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { renderWithRedux } from 'test-utils';
import {
  NavigationContainer,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
/*import {
  render,
  fireEvent,
  cleanup,
  waitForElement,
  act,
} from 'react-native-testing-library';*/
import {
  fireEvent,
  wait,
  act,
  waitForElement,
} from '@testing-library/react-native';
import '@testing-library/jest-dom/extend-expect';
import PostsStackMain from '../PostsStackMain';
import TabNavigator from '../TabNavigator';
import LoginForm from '../../components/login/login-form/LoginForm';
import SigningStackNavigator from '../SigningStackNavigator';
import LoginScreen from '../../screens/LoginScreen';
import PostsScreen from '../../screens/PostsScreen';
import SettingsStackNavigator from '../SettingsStackNavigator';

// Silence the warning https://github.com/facebook/react-native/issues/11094#issuecomment-263240420
jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');
jest.mock('@react-native-firebase/auth', () => ({}));
jest.mock('@react-native-firebase/storage', () => ({}));
jest.mock('@react-native-firebase/firestore', () => ({}));
jest.mock('react-native-image-picker', () => ({
  showImagePicker: jest.fn(),
}));

/*jest.mock('@react-navigation/native', () => ({
  useRoute: jest.fn(() => ({
    name: 'SignInScreen',
  })),
  useNavigation: jest.fn(),
}));*/

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
const MockedNavigator = ({
  routeOne,
  routeTwo,
  routeThree,
  componentOne,
  componentTwo,
  componentThree,
  params = {},
}) => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name={routeOne}
          component={componentOne}
          initialParams={params}
          options={{ headerTitle: 'POSTS' }}
        />
        <Stack.Screen
          name={routeTwo}
          component={componentTwo}
          initialParams={params}
          options={{ headerTitle: 'LOG IN' }}
        />
        <Stack.Screen
          name={routeThree}
          component={componentThree}
          initialParams={params}
          options={{ headerTitle: 'SIGN UP' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const MockNavigation = ({ user = {} }) => {
  return !user ? <MockedNavigator /> : <MockTabNavigator />;
};

describe('Testing react navigation', () => {
  it('should navigate to the Sign Up screen', async () => {
    const { getByText, getByLabelText } = renderWithRedux(
      <MockedNavigator
        routeOne="LoginScreen"
        routeTwo="SignUpScreen"
        routeThree="PostsScreen"
        componentOne={LoginScreen}
        componentTwo={LoginScreen}
        componentThree={PostsScreen}
      />,
    );

    const goToSignUpButton = getByLabelText('switch-btn');
    console.log(goToSignUpButton.props);
    fireEvent.press(goToSignUpButton);

    const signUpHeader = getByText('SIGN UP');
    expect(signUpHeader).toBeTruthy();

    const usernameField = getByLabelText('username');
    expect(usernameField).toBeTruthy();
  });

  fit('should ', async () => {
    /*const { getByText, getByLabelText, debug, store } = renderWithRedux(
      <MockedNavigator
        routeOne="PostsScreen"
        componentOne={PostsScreen}
        routeTwo="LoginScreen"
        componentTwo={LoginScreen}
        routeThree="SignUpScreen"
        componentThree={LoginScreen}
      />,
    );*/

    const { getByText, getByLabelText, debug, store } = renderWithRedux(
      <MockTabNavigator />,
    );

    // console.log(store.getState());

    /*fireEvent.changeText(getByLabelText('email'), 'email@mail.com');
    console.log(getByLabelText('email').props);
    fireEvent.changeText(getByLabelText('password'), '123456');
    console.log(getByLabelText('password').props);
    fireEvent.press(getByLabelText('submit-button'));
    console.log(getByLabelText('submit-button').props);*/
    const signUpHeader = await waitForElement(() => getByText('POSTS'));
    debug();
  });
});
