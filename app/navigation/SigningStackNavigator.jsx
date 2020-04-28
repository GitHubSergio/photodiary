// Imports
import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import navigationOptions from './navigationOptions';

// Screens
import LoginScreen from '../screens/LoginScreen';

const Stack = createStackNavigator();

const SigningStackNavigator = () => {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" />
      <Stack.Navigator
        mode="modal"
        screenOptions={{ ...navigationOptions.stack.global }}>
        <Stack.Screen
          options={{ ...navigationOptions.stack.loginScreen }}
          name="LoginScreen"
          component={LoginScreen}
        />
        <Stack.Screen
          options={{ ...navigationOptions.stack.signUpScreen }}
          name="SignUpScreen"
          component={LoginScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default SigningStackNavigator;
