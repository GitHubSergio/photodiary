// Imports
import React from 'react';
import { View } from 'react-native';
import styles from '../components/shared/styles/styles';

// Components
import PostDetails from '../components/posts/post-details/PostDetails';

const PostDetailsScreen = () => {
  return (
    <View style={styles.view}>
      <PostDetails />
    </View>
  );
};

export default PostDetailsScreen;
