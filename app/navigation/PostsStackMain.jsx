// Imports
import React from 'react';
import navigationOptions from './navigationOptions';
import { createStackNavigator } from '@react-navigation/stack';

// Screens
import PostsScreen from '../screens/PostsScreen';
import PostDetailsScreen from '../screens/PostDetailsScreen';
import PostAddScreen from '../screens/PostAddScreen';
import PostDetailsUpdateScreen from '../screens/PostDetailsUpdateScreen';

const StackMain = createStackNavigator();
const StackPosts = createStackNavigator();
const StackPostDetails = createStackNavigator();

const UpdateDetailsStack = () => {
  return (
    <StackPostDetails.Navigator
      screenOptions={{
        ...navigationOptions.stack.global,
      }}>
      <StackPostDetails.Screen
        name="UpdatePostDetailsScreen"
        component={PostDetailsUpdateScreen}
        options={{ ...navigationOptions.stack.editPostScreen }}
      />
    </StackPostDetails.Navigator>
  );
};

const PostsStackNavigator = () => {
  return (
    <StackPosts.Navigator
      screenOptions={{
        ...navigationOptions.stack.global,
      }}>
      <StackPosts.Screen
        options={{
          ...navigationOptions.stack.postsScreen,
        }}
        name="PostsScreen"
        component={PostsScreen}
      />
      <StackPosts.Screen
        name="PostDetailsScreen"
        component={PostDetailsScreen}
        options={({ route }) => ({
          title: route.params.title,
        })}
      />
      <StackPosts.Screen
        name="AddNewPostScreen"
        component={PostAddScreen}
        options={{ ...navigationOptions.stack.addNewPostScreen }}
      />
    </StackPosts.Navigator>
  );
};

export default function PostsStackMain() {
  return (
    <StackMain.Navigator
      mode="modal"
      headerMode="none"
      screenOptions={{
        ...navigationOptions.stack.global,
      }}>
      <StackMain.Screen
        options={{
          ...navigationOptions.stack.postsScreen,
        }}
        name="Posts"
        component={PostsStackNavigator}
      />
      <StackMain.Screen
        name="UpdatePostDetailsScreen"
        component={UpdateDetailsStack}
        options={{ ...navigationOptions.stack.addNewPostScreen }}
      />
    </StackMain.Navigator>
  );
}
