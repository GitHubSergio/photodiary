// Imports
import React, { useCallback, useEffect, useLayoutEffect } from 'react';
import { ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import buttonStyles from '../../shared/buttons/buttonStyles';

// Hooks
import { useInput, useImagePicker } from '../../../utils/customHooks';

// Actions
import { createPost } from '../../../redux/middlewares/postsMiddleWare';
import {
  clearPostsErrors,
  clearSelectImageFromDeviceSuccess,
} from '../../../redux/actions/postsActions';
import { alertFactory } from '../../shared/alert/alertFactory';

// Components
import PostForm from '../post-form/PostForm';
import PostImage from '../post-images/PostImage';
import Loader from '../../shared/loader/Loader';
import Button from '../../shared/buttons/Button';

const PostAdd = () => {
  const { isCreatingPost } = useSelector((state) => state.posts);
  const { createPostSuccess } = useSelector((state) => state.posts);
  const { error } = useSelector((state) => state.posts);
  const { isSelectingImageFromDevice } = useSelector((state) => state.posts);

  const title = useInput('');
  const description = useInput('');
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [
    imageUriDevice,
    handleChoosePhoto,
    handleDeletePhoto,
  ] = useImagePicker();

  console.log('imageUriDevice >>>', imageUriDevice);

  useEffect(() => {
    if (error !== '') {
      alertFactory('Alert', `${error}`, [
        {
          text: 'OK',
          onPress: () => dispatch(clearPostsErrors('')),
        },
      ]);
    }
  }, [dispatch, error]);

  useEffect(() => {
    if (createPostSuccess) {
      dispatch(clearSelectImageFromDeviceSuccess(''));
      navigation.goBack();
    }
  }, [createPostSuccess, dispatch, navigation]);

  const handleCreatePost = useCallback(() => {
    dispatch(createPost(title.value, description.value, imageUriDevice));
  }, [description.value, dispatch, imageUriDevice, title.value]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          label="Post"
          onPress={handleCreatePost}
          style={buttonStyles.headerButtonRT}
          textStyle={buttonStyles.headerButtonText}
        />
      ),
    });
  }, [handleCreatePost, navigation]);

  return isCreatingPost || isSelectingImageFromDevice ? (
    <Loader />
  ) : (
    <ScrollView
      keyboardDismissMode="on-drag"
      keyboardShouldPersistTaps="handled">
      <PostForm
        title={title}
        description={description}
        handleChoosePhoto={handleChoosePhoto}
      />
      {imageUriDevice && (
        <PostImage uri={imageUriDevice} handleDeletePhoto={handleDeletePhoto} />
      )}
    </ScrollView>
  );
};

export default PostAdd;
