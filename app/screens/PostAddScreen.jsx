// Imports
import React from 'react';
import { View } from 'react-native';
import styles from '../components/shared/styles/styles';

// Components
import PostAdd from '../components/posts/post-add/PostAdd';

const PostAddScreen = () => {
  return (
    <View style={styles.view}>
      <PostAdd />
    </View>
  );
};

export default PostAddScreen;
