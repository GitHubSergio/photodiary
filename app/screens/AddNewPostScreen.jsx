// Imports
import React from 'react';
import { View } from 'react-native';
import styles from '../components/shared/styles/styles';

// Components
import PostAdd from '../components/posts/post-add/PostAdd';

const AddNewPostScreen = () => {
  return (
    <View style={styles.view}>
      <PostAdd />
    </View>
  );
};

export default AddNewPostScreen;
