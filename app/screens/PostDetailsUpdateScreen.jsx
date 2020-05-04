// Imports
import React from 'react';
import { View } from 'react-native';
import styles from '../components/shared/styles/styles';

// Components
import PostUpdate from '../components/posts/post-update/PostUpdate';

const PostDetailsUpdateScreen = () => {
  return (
    <View style={styles.viewNoPadding}>
      <PostUpdate />
    </View>
  );
};

export default PostDetailsUpdateScreen;
