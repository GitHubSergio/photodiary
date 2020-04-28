// Imports
import React from 'react';
import { View } from 'react-native';
import styles from '../components/shared/styles/styles';

// Components
import PostsList from '../components/posts/posts-list/PostsList';

const PostsScreen = () => {
  return (
    <View style={styles.view}>
      <PostsList />
    </View>
  );
};

export default PostsScreen;
