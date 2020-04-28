// Imports
import React from 'react';
import { View } from 'react-native';
import styles from '../components/shared/styles/styles';

// Components
import PostUpdate from '../components/posts/post-update/PostUpdate';

const UpdatePostDetailsScreen = () => {
  return (
    <View style={styles.view}>
      <PostUpdate />
    </View>
  );
};

export default UpdatePostDetailsScreen;
