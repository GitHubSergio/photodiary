// Imports
import React from 'react';
import { View, Text } from 'react-native';
import noPostsStyles from './noPostsStyles';

const NoPosts = () => (
  <View style={noPostsStyles.noPostsView}>
    <Text style={noPostsStyles.text}>NO POSTS YET</Text>
  </View>
);

export default NoPosts;
