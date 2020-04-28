// Imports
import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import navigationOptions from './navigationOptions';

// Stacks
import SettingsStackNavigator from './SettingsStackNavigator';
import PostsStackMain from './PostsStackMain';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" />
      <Tab.Navigator
        tabBarOptions={{
          ...navigationOptions.tabs,
        }}>
        <Tab.Screen name="Posts" component={PostsStackMain} />
        <Tab.Screen name="Settings" component={SettingsStackNavigator} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
