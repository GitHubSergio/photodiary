// Imports
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import navigationOptions from './navigationOptions';

// Screens
import SettingsScreen from '../screens/SettingsScreen';

const Stack = createStackNavigator();

export default function SettingsStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        ...navigationOptions.stack.global,
      }}>
      <Stack.Screen
        options={{
          ...navigationOptions.stack.settingsScreen,
        }}
        name="PostsScreen"
        component={SettingsScreen}
      />
    </Stack.Navigator>
  );
}
